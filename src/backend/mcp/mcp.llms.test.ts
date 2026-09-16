import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";
import { CONTACT, MCP } from "../../../app/_config/site.constants";

function readPublic(name: "llms.txt" | "llms-full.txt") {
  return readFileSync(join(process.cwd(), "public", name), "utf8");
}

describe("llms MCP discovery", () => {
  for (const name of ["llms.txt", "llms-full.txt"] as const) {
    test(`${name} points agents to the public MCP endpoint`, () => {
      const text = readPublic(name);

      assert.match(text, new RegExp(MCP.url.replace(/\./g, "\\.")));
      assert.match(text, new RegExp(MCP.aiCatalogUrl.replace(/\./g, "\\.")));
      assert.match(text, new RegExp(MCP.manifestUrl.replace(/\./g, "\\.")));
      assert.match(text, /about#mcp/);
      assert.match(text, new RegExp(CONTACT.email.replace(/\./g, "\\.")));
      assert.match(text, /initialize/);
      assert.match(text, /2025-03-26/);
      assert.match(text, /MCP-Protocol-Version/);
      assert.match(text, /n[ée]gocie/);
      assert.doesNotMatch(text, /initialize \+ ce header = 400/);
      assert.doesNotMatch(text, / = 400/);
      assert.doesNotMatch(text, /submit_inquiry/);
      assert.equal(text.includes("\u2014"), false);
      assert.match(text, /Dernière mise à jour: 2026-09-16/);
    });
  }
});
