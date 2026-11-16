import assert from "node:assert/strict";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { NOT_BINDING_QUOTE } from "./mcp.constants";
import { runWithMcpRequest } from "./mcp.context";
import { estimateInputSchema } from "./mcp.estimation.schema";
import { estimateToolResult, sendProjectBriefToolResult } from "./mcp.tools";
import { sendProjectBriefSchema } from "./mcp.tools.schema";

const call = (raw: unknown) =>
  estimateToolResult(estimateInputSchema.parse(raw));

const text = (result: ReturnType<typeof estimateToolResult>) =>
  result.content.map((item) => item.text).join("\n");

const core = { name: "Core", features: [{ id: "auth", size: "standard" }] };

describe("estimate_project tool", () => {
  test("an application with no lot and no unlisted item is an error, not a zero estimate", () => {
    const result = call({});

    assert.equal(result.isError, true);
    assert.match(text(result), /at least one feature/);
    assert.doesNotMatch(text(result), /€/);
  });

  test("only unlisted items is an error too", () => {
    const result = call({ unlisted: ["Custom ERP connector"] });

    assert.equal(result.isError, true);
    assert.match(text(result), /at least one feature/);
    assert.doesNotMatch(text(result), /€/);
  });

  test("a valid brief returns markdown with the disclaimer and a euro total", () => {
    const result = call({ lots: [core] });

    assert.notEqual(result.isError, true);
    assert.ok(text(result).includes(NOT_BINDING_QUOTE));
    assert.match(text(result), /## Total[\s\S]*\d+€/);
  });

  test("format json returns parseable JSON with status 'estimated'", () => {
    const result = call({ lots: [core], format: "json" });
    const parsed: unknown = JSON.parse(text(result));

    assert.ok(parsed && typeof parsed === "object");
    assert.equal(Reflect.get(parsed, "status"), "estimated");
  });

  test("showcase_site returns the out-of-scope message, no euro sign", () => {
    const result = call({ projectKind: "showcase_site" });

    assert.notEqual(result.isError, true);
    assert.match(text(result), /does not take showcase website projects/);
    assert.doesNotMatch(text(result), /€/);
  });
});

describe("send_project_brief tool", () => {
  const brief = sendProjectBriefSchema.parse({
    consent: true,
    email: "jean@example.com",
    need: "A booking platform",
    lots: [core],
  });

  const recorded = {
    send: async () => ({
      status: "recorded" as const,
      created: true,
      notified: true,
    }),
  };

  test("a recorded brief confirms the sending and keeps the non-binding reminder", async () => {
    const result = await sendProjectBriefToolResult(brief, recorded);

    assert.notEqual(result.isError, true);
    assert.match(text(result), /Brief sent to Axel\. He replies by email\./);
    assert.ok(text(result).includes(NOT_BINDING_QUOTE));
  });

  test("a persistence failure is an error without the email or the recap", async () => {
    const result = await sendProjectBriefToolResult(brief, {
      send: async () => {
        throw new Error("db down jean@example.com");
      },
    });

    assert.equal(result.isError, true);
    assert.equal(text(result), "Could not record the brief. Retry later.");
  });

  test("the 9th send_project_brief call from the same client within a minute is rate limited", async () => {
    const request = new Request("https://axelhamilcaro.com/mcp", {
      headers: { "x-vercel-forwarded-for": "198.51.100.9" },
    });
    const callAsClient = () =>
      runWithMcpRequest(request, () =>
        sendProjectBriefToolResult(brief, recorded),
      );

    for (let call = 0; call < 8; call += 1) {
      const result = await callAsClient();
      assert.notEqual(result.isError, true);
    }

    const limited = await callAsClient();

    assert.equal(limited.isError, true);
    assert.match(text(limited), /Rate limited\./);
  });

  test("the 21st brief of the day from the same client is rejected even across minutes", async (t) => {
    t.mock.timers.enable({
      apis: ["Date"],
      now: Date.parse("2026-11-16T08:00:00Z"),
    });
    const request = new Request("https://axelhamilcaro.com/mcp", {
      headers: { "x-vercel-forwarded-for": "198.51.100.21" },
    });
    const callAsClient = () =>
      runWithMcpRequest(request, () =>
        sendProjectBriefToolResult(brief, recorded),
      );

    for (let call = 0; call < 20; call += 1) {
      if (call % 8 === 0) t.mock.timers.tick(61_000);
      const result = await callAsClient();
      assert.notEqual(result.isError, true);
    }

    t.mock.timers.tick(61_000);
    const capped = await callAsClient();

    assert.equal(capped.isError, true);
    assert.match(text(capped), /Daily limit/);
  });

  test("a persistence failure is logged without the email", async (t) => {
    const logged = t.mock.method(console, "error", () => undefined);
    await sendProjectBriefToolResult(brief, {
      send: async () => {
        throw Object.assign(new Error("Key (email)=(jean@example.com)"), {
          code: "23505",
        });
      },
    });
    const line = String(logged.mock.calls[0]?.arguments[0]);

    assert.match(line, /23505/);
    assert.doesNotMatch(line, /jean@example\.com/);
  });
});
