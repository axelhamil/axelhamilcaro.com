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

  test("constraint pas de mobile v1 drops the Capacitor adapter", () => {
    const brief = analyzeArchitectureNeed({
      need: "SaaS e-learning multi-tenant, app iOS plus tard",
      constraints: "pas de mobile v1",
    });

    assert.equal(brief.flags.mobile, false);
    assert.equal(brief.flags.noMobile, true);
    assert.ok(
      !brief.adapters.some((item) => /capacitor|mobile client/i.test(item)),
    );
    assert.ok(
      brief.avoidOnShortMvp.some((item) =>
        /mobile|Capacitor|native/i.test(item),
      ),
    );
  });

  test("does not stamp Billing and Admin on every SaaS brief", () => {
    const learning = analyzeArchitectureNeed({
      need: "SaaS e-learning multi-tenant, catalogue SCORM",
      constraints: "pas de mobile v1",
    });
    const ticketing = analyzeArchitectureNeed({
      need: "dashboard billetterie temps réel WebSocket, plan de salle",
    });

    assert.ok(learning.contexts.some((item) => /learn/i.test(item)));
    assert.ok(!learning.contexts.some((item) => /billing/i.test(item)));
    assert.ok(!learning.contexts.some((item) => /admin/i.test(item)));
    assert.ok(
      ticketing.contexts.some((item) => /event|seat|ticket/i.test(item)),
    );
    assert.notDeepEqual(learning.contexts, ticketing.contexts);
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
