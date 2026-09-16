import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { AVAILABILITY, RATES } from "../../../app/_config/site.constants";
import {
  buildCompareStackPrompt,
  buildDraftOutreachPrompt,
  buildFormalizeNeedPrompt,
} from "./mcp.prompts";

function userText(prompt: ReturnType<typeof buildFormalizeNeedPrompt>): string {
  const [message] = prompt.messages;
  assert.ok(message);
  assert.equal(message.role, "user");
  assert.equal(message.content.type, "text");
  return message.content.text;
}

describe("mcp prompt builders", () => {
  test("formalize_need mentions audit_architecture_brief", () => {
    const text = userText(buildFormalizeNeedPrompt());

    assert.match(text, /audit_architecture_brief/);
  });

  test("compare_stack reads site://stack-matrix against the need", () => {
    const need = "multi-tenant SaaS with a mobile app";
    const text = userText(buildCompareStackPrompt({ need }));

    assert.match(text, /site:\/\/stack-matrix/);
    assert.ok(text.includes(need));
  });

  test("draft_outreach uses catalog TJM and availability then email", () => {
    const text = userText(buildDraftOutreachPrompt());

    assert.match(text, /contact@axelhamilcaro\.com/);
    assert.doesNotMatch(text, /submit_inquiry/);
    assert.ok(text.includes(String(RATES.dailyHtEur)));
    assert.ok(text.includes(AVAILABILITY.status));
    assert.ok(text.includes(AVAILABILITY.startWindow));
  });
});
