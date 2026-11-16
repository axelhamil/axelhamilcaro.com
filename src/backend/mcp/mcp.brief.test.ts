import assert from "node:assert/strict";
import { describe, mock, test } from "node:test";
import "./mcp.test-env";
import type { CreateLeadData } from "@/src/backend/leads/lead.repository";
import {
  BRIEF_RETENTION_MONTHS,
  type BriefDeps,
  createProjectBriefService,
} from "./mcp.brief";
import { MCP_INQUIRY_SLUG } from "./mcp.constants";
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

function fakeDeps(existing: { id: string } | null = null) {
  const created: CreateLeadData[] = [];
  const deps = {
    ensureForm: mock.fn(async () => form),
    findLead: mock.fn(async (_formId: string, _email: string) => existing),
    createLead: mock.fn(async (data: CreateLeadData) => {
      created.push(data);
      return { id: "lead-1" };
    }),
    updateLead: mock.fn(async (_id: string, _notes: string) => ({})),
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
    assert.equal(deps.findLead.mock.calls[0]?.arguments[1], "jean@example.com");
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

  test("the same email sent twice updates the notes instead of creating a duplicate", async () => {
    const { deps, created } = fakeDeps({ id: "lead-9" });
    const result = await send(deps, { ...valid, need: "Refined need" });

    assert.deepEqual(result, {
      status: "recorded",
      created: false,
      notified: true,
    });
    assert.equal(created.length, 0);
    assert.equal(deps.updateLead.mock.calls[0]?.arguments[0], "lead-9");
    assert.match(
      deps.updateLead.mock.calls[0]?.arguments[1] ?? "",
      /Refined need/,
    );
    assert.equal(deps.notify.mock.callCount(), 1);
  });

  test("Resend failure keeps the lead and reports notified false", async () => {
    const { deps, created } = fakeDeps();
    deps.notify.mock.mockImplementation(async () => ({ success: false }));
    const result = await send(deps, valid);

    assert.equal(created.length, 1);
    assert.deepEqual(result, {
      status: "recorded",
      created: true,
      notified: false,
    });
  });

  test("a notify exception keeps the lead and reports notified false", async () => {
    const { deps, created } = fakeDeps();
    deps.notify.mock.mockImplementation(async () => {
      throw new Error("network down");
    });
    const result = await send(deps, valid);

    assert.equal(created.length, 1);
    assert.equal(result.notified, false);
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
