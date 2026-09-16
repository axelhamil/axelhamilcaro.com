import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { analyzeArchitectureNeed } from "./mcp.audit";
import { NOT_BINDING_QUOTE } from "./mcp.constants";
import { renderProposalMarkdown } from "./mcp.proposal";

describe("analyzeArchitectureNeed", () => {
  test("multi-tenant saas recommends bounded contexts and skips a two-week Clean Arch circus", () => {
    const brief = analyzeArchitectureNeed({
      need: "multi-tenant saas MVP in two weeks",
    });

    assert.equal(brief.flags.saas, true);
    assert.equal(brief.flags.mvp, true);
    assert.ok(brief.contexts.some((item) => /tenancy/i.test(item)));
    assert.ok(
      brief.avoidOnShortMvp.some((item) =>
        /Clean Architecture circus on a two-week MVP/i.test(item),
      ),
    );
  });
});

describe("renderProposalMarkdown", () => {
  test("contains the non-binding disclaimer and the daily rate", () => {
    const analysis = analyzeArchitectureNeed({ need: "internal dashboard" });
    const markdown = renderProposalMarkdown({
      need: "internal dashboard",
      analysis,
    });

    assert.ok(markdown.includes(NOT_BINDING_QUOTE));
    assert.ok(markdown.includes("500"));
  });
});
