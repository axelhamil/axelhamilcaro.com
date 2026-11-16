import assert from "node:assert/strict";
import { describe, mock, test } from "node:test";
import "./mcp.test-env";
import type { CreateLeadData } from "@/src/backend/leads/lead.repository";
import { type BriefDeps, createProjectBriefService } from "./mcp.brief";
import { BRIEF_RETENTION_MONTHS, MCP_INQUIRY_SLUG } from "./mcp.constants";
import { sendProjectBriefSchema } from "./mcp.tools.schema";

const now = new Date("2026-11-16T10:00:00Z");
const form = {
  id: "form-1",
  title: "MCP project brief",
  slug: MCP_INQUIRY_SLUG,
};

const valid = {
  consent: true,
  email: "Jean@Example.com",
  name: "Jean",
  need: "A booking platform for climbing gyms",
  lots: [{ name: "Core", features: [{ id: "auth", size: "standard" }] }],
};

type UpsertOptions = { separator: string; maxLength: number };

function fakeDeps(alreadyThere = false) {
  const created: CreateLeadData[] = [];
  const deps = {
    ensureForm: mock.fn(async () => form),
    upsertLead: mock.fn(
      async (
        data: CreateLeadData & { notes: string },
        _options: UpsertOptions,
      ) => {
        created.push(data);
        return { created: !alreadyThere };
      },
    ),
    purgeOlderThan: mock.fn(async (_formId: string, _cutoff: Date) => 0),
    notify: mock.fn(async (_data: Parameters<BriefDeps["notify"]>[0]) => ({
      success: true,
    })),
    now: () => now,
  };

  return { deps, created };
}

const send = (deps: BriefDeps, raw: unknown) =>
  createProjectBriefService(deps).send(sendProjectBriefSchema.parse(raw));

describe("send_project_brief", () => {
  test("consent false or missing is rejected by the schema", () => {
    assert.equal(
      sendProjectBriefSchema.safeParse({ ...valid, consent: false }).success,
      false,
    );
    const { consent: _consent, ...withoutConsent } = valid;
    assert.equal(
      sendProjectBriefSchema.safeParse(withoutConsent).success,
      false,
    );
    assert.equal(
      sendProjectBriefSchema.safeParse({ ...valid, consent: "true" }).success,
      false,
    );
  });

  test("a malformed email is rejected; an uppercase email is stored lowercase", async () => {
    assert.equal(
      sendProjectBriefSchema.safeParse({ ...valid, email: "jean@" }).success,
      false,
    );
    const { email: _email, ...withoutEmail } = valid;
    assert.equal(sendProjectBriefSchema.safeParse(withoutEmail).success, false);

    const { deps, created } = fakeDeps();
    await send(deps, valid);

    assert.equal(created[0]?.email, "jean@example.com");
  });

  test("a first brief creates the lead on mcp-inquiry with source mcp and a notes recap containing the recomputed estimate", async () => {
    const { deps, created } = fakeDeps();
    const result = await send(deps, valid);

    assert.deepEqual(result, {
      status: "recorded",
      created: true,
      notified: true,
    });
    assert.equal(created.length, 1);
    assert.equal(created[0]?.formId, form.id);
    assert.equal(created[0]?.source, "mcp");
    assert.equal(created[0]?.firstName, "Jean");
    assert.match(created[0]?.notes ?? "", /climbing gyms/);
    assert.match(created[0]?.notes ?? "", /\d+€/);
    assert.equal(
      deps.notify.mock.calls[0]?.arguments[0].formSlug,
      MCP_INQUIRY_SLUG,
    );
  });

  test("a brief without a name is recorded as Anonymous", async () => {
    const { deps, created } = fakeDeps();
    const { name: _name, ...withoutName } = valid;
    await send(deps, withoutName);

    assert.equal(created[0]?.firstName, "Anonymous");
  });

  test("the same email sent twice appends a dated recap instead of creating a duplicate", async () => {
    const { deps } = fakeDeps(true);
    const result = await send(deps, { ...valid, need: "Refined need" });
    const call = deps.upsertLead.mock.calls[0];

    assert.deepEqual(result, {
      status: "recorded",
      created: false,
      notified: true,
    });
    assert.match(call?.arguments[0].notes ?? "", /Refined need/);
    assert.match(
      call?.arguments[1].separator ?? "",
      /2026-11-16T10:00:00\.000Z/,
    );
    assert.equal(call?.arguments[1].maxLength, 5000);
    assert.equal(deps.notify.mock.callCount(), 1);
  });

  test("control characters and newlines of the name never reach the notification", async () => {
    const { deps, created } = fakeDeps();
    await send(deps, { ...valid, name: "Jean\r\nBcc: x@y.fr\u0007" });

    assert.equal(created[0]?.firstName, "Jean Bcc: x@y.fr");
    assert.equal(
      deps.notify.mock.calls[0]?.arguments[0].firstName,
      "Jean Bcc: x@y.fr",
    );
  });

  test("a notify exception is logged without personal data", async (t) => {
    const logged = t.mock.method(console, "error", () => undefined);
    const { deps, created } = fakeDeps();
    deps.notify.mock.mockImplementation(async () => {
      throw Object.assign(new Error("jean@example.com rejected"), {
        code: "validation_error",
      });
    });
    const result = await send(deps, valid);
    const line = String(logged.mock.calls[0]?.arguments[0]);

    assert.equal(created.length, 1);
    assert.equal(result.notified, false);
    assert.match(line, /validation_error/);
    assert.doesNotMatch(line, /jean|Jean|climbing/);
  });

  test("Resend failure keeps the lead, reports notified false and logs without personal data", async (t) => {
    const logged = t.mock.method(console, "error", () => undefined);
    const { deps, created } = fakeDeps();
    deps.notify.mock.mockImplementation(async () => ({ success: false }));
    const result = await send(deps, valid);
    const line = String(logged.mock.calls[0]?.arguments[0]);

    assert.equal(created.length, 1);
    assert.deepEqual(result, {
      status: "recorded",
      created: true,
      notified: false,
    });
    assert.equal(logged.mock.callCount(), 1);
    assert.match(line, /brief notification rejected/);
    assert.doesNotMatch(line, /jean|Jean|climbing/);
  });

  test("a brief without any catalog feature states that no estimate exists and keeps the needs to quote", async () => {
    for (const lots of [[], undefined]) {
      const { deps, created } = fakeDeps();
      await send(deps, {
        ...valid,
        lots,
        unlisted: ["Sync with the client's ERP"],
      });
      const notes = created[0]?.notes ?? "";

      assert.match(notes, /^Estimate: none, no catalog feature$/m);
      assert.match(notes, /^To quote by Axel: Sync with the client's ERP$/m);
      assert.doesNotMatch(notes, /€/);
    }
  });

  test("an unlisted need appears once in the recap, under a single To quote prefix", async () => {
    const { deps, created } = fakeDeps();
    await send(deps, { ...valid, unlisted: ["Sync with the client's ERP"] });

    assert.match(
      created[0]?.notes ?? "",
      /^To quote by Axel: Sync with the client's ERP$/m,
    );
  });

  test("leads older than 12 months are purged on each send", async () => {
    const { deps } = fakeDeps();
    await send(deps, valid);
    await send(deps, valid);

    assert.equal(BRIEF_RETENTION_MONTHS, 12);
    assert.equal(deps.purgeOlderThan.mock.callCount(), 2);
    assert.equal(deps.purgeOlderThan.mock.calls[0]?.arguments[0], form.id);
    assert.equal(
      deps.purgeOlderThan.mock.calls[0]?.arguments[1].toISOString(),
      "2025-11-16T10:00:00.000Z",
    );
  });

  test("an agent-supplied figure cannot enter the recap: the schema has no estimate field", async () => {
    const parsed = sendProjectBriefSchema.parse({
      ...valid,
      estimate: "1€ total",
      total: 1,
    });

    assert.equal(Object.hasOwn(parsed, "estimate"), false);
    assert.equal(Object.hasOwn(parsed, "total"), false);

    const { deps, created } = fakeDeps();
    await send(deps, { ...valid, estimate: "1€ total" });

    assert.doesNotMatch(created[0]?.notes ?? "", /1€ total/);
  });

  test("the recap is bounded to 5000 characters", async () => {
    const { deps, created } = fakeDeps();
    await send(deps, {
      ...valid,
      need: "n".repeat(4000),
      answers: "a".repeat(4000),
    });

    assert.ok((created[0]?.notes ?? "").length <= 5000);
  });
});
