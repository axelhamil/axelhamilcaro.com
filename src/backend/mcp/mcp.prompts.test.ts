import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  buildCompareStackPrompt,
  buildDiscussProjectPrompt,
} from "./mcp.prompts";

function userText(
  prompt: ReturnType<typeof buildDiscussProjectPrompt>,
): string {
  const [message] = prompt.messages;
  assert.ok(message);
  assert.equal(message.role, "user");
  assert.equal(message.content.type, "text");
  return message.content.text;
}

describe("mcp prompt builders", () => {
  test("discuss_project names the tools, the resources and the consent rule", () => {
    const text = userText(buildDiscussProjectPrompt());

    assert.match(text, /estimate_project/);
    assert.match(text, /send_project_brief/);
    assert.match(text, /site:\/\/estimation-grid/);
    assert.match(text, /one question at a time/i);
    assert.match(text, /explicit/i);
  });

  test("discuss_project never names Eskimoz or Weathertop", () => {
    const text = userText(buildDiscussProjectPrompt());

    assert.doesNotMatch(text, /eskimoz|weathertop/i);
  });

  test("compare_stack reads site://stack-matrix against the need", () => {
    const need = "multi-tenant SaaS with a mobile app";
    const text = userText(buildCompareStackPrompt({ need }));

    assert.match(text, /site:\/\/stack-matrix/);
    assert.ok(text.includes(need));
  });
});
