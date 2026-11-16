import assert from "node:assert/strict";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { CLIENT_CAPABILITIES_META_KEY } from "@modelcontextprotocol/server";
import {
  applyContextAnswers,
  buildContextElicitation,
  clientDeclaresElicitation,
  type ElicitationContext,
  missingContextFields,
} from "./mcp.elicitation";
import {
  type EstimateToolInput,
  estimateToolInputSchema,
} from "./mcp.estimation.schema";
import { estimateProjectToolResult } from "./mcp.tools";

const core = { name: "Core", features: [{ id: "auth", size: "standard" }] };

const input = (raw: unknown): EstimateToolInput =>
  estimateToolInputSchema.parse({ lots: [core], ...Object(raw) });

const withCapabilities = (capabilities: unknown): ElicitationContext => ({
  mcpReq: { envelope: { [CLIENT_CAPABILITIES_META_KEY]: capabilities } },
});

const answering = (
  response: unknown,
  capabilities: unknown = { elicitation: {} },
): ElicitationContext => ({
  mcpReq: {
    envelope: { [CLIENT_CAPABILITIES_META_KEY]: capabilities },
    inputResponses: { context: response },
  },
});

const noEnvelope: ElicitationContext = { mcpReq: {} };

describe("context elicitation", () => {
  test("no capability envelope means no elicitation", () => {
    assert.equal(clientDeclaresElicitation(noEnvelope), false);
  });

  test("an envelope declaring elicitation is detected, one without it is not", () => {
    assert.equal(
      clientDeclaresElicitation(withCapabilities({ elicitation: {} })),
      true,
    );
    assert.equal(clientDeclaresElicitation(withCapabilities({})), false);
    assert.equal(
      clientDeclaresElicitation(withCapabilities({ sampling: {} })),
      false,
    );
  });

  test("all three fields given means nothing is missing", () => {
    const full = input({
      budgetEur: 20000,
      existing: "none",
      platforms: ["web"],
    });

    assert.deepEqual(missingContextFields(full), []);
    assert.deepEqual(missingContextFields(input({})), [
      "budgetEur",
      "existing",
      "platforms",
    ]);
  });

  test("missing fields produce a form request with at most 3 properties", () => {
    const all = buildContextElicitation(["budgetEur", "existing", "platforms"]);
    const request = all.inputRequests?.context;

    assert.equal(request?.method, "elicitation/create");
    assert.match(JSON.stringify(request), /Optional, 3 quick questions/);
    assert.deepEqual(
      Object.keys(Object(request?.params).requestedSchema.properties),
      ["budgetEur", "existing", "platforms"],
    );

    const one = buildContextElicitation(["existing"]).inputRequests?.context;
    assert.deepEqual(
      Object.keys(Object(one?.params).requestedSchema.properties),
      ["existing"],
    );
  });

  test("accepted answers fill only the missing fields and never override the input", () => {
    const given = input({ budgetEur: 15000 });
    const result = applyContextAnswers(
      given,
      answering({
        action: "accept",
        content: {
          budgetEur: 90000,
          existing: true,
          platforms: "web_and_mobile",
        },
      }),
    );

    assert.equal(result.budgetEur, 15000);
    assert.equal(result.existing, "codebase_to_resume");
    assert.deepEqual(result.platforms, ["web", "mobile"]);

    const explicit = applyContextAnswers(
      input({ existing: "none", platforms: ["web"] }),
      answering({
        action: "accept",
        content: { existing: true, platforms: "web_and_mobile" },
      }),
    );

    assert.equal(explicit.existing, "none");
    assert.deepEqual(explicit.platforms, ["web"]);
  });

  test("a declined or malformed answer leaves the input unchanged", () => {
    const given = input({});
    const unchanged = applyContextAnswers(given, noEnvelope);

    for (const response of [
      { action: "decline" },
      { action: "cancel" },
      { action: "accept", content: { budgetEur: -5, platforms: "desktop" } },
      { action: "accept", content: { existing: "maybe" } },
      "garbage",
    ]) {
      assert.deepEqual(
        applyContextAnswers(given, answering(response)),
        unchanged,
      );
    }

    assert.equal(unchanged.budgetEur, undefined);
    assert.equal(unchanged.existing, "none");
    assert.deepEqual(unchanged.platforms, ["web"]);
  });

  test("estimate_project answers immediately when the client does not declare elicitation", () => {
    const immediate = estimateProjectToolResult(input({}), noEnvelope);

    assert.ok("content" in immediate);
    assert.match(JSON.stringify(immediate), /€/);

    const asked = estimateProjectToolResult(
      input({}),
      withCapabilities({ elicitation: {} }),
    );
    assert.ok("inputRequests" in asked);

    const afterDecline = estimateProjectToolResult(
      input({}),
      answering({ action: "decline" }),
    );
    assert.ok("content" in afterDecline);
  });
});
