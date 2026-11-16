import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { RATES } from "../../../app/_config/site.constants";
import { estimateProject } from "./mcp.estimation";
import { FEATURE_GRID } from "./mcp.estimation.grid";
import { estimateInputSchema } from "./mcp.estimation.schema";

const estimate = (raw: unknown) =>
  estimateProject(estimateInputSchema.parse(raw));

const estimated = (raw: unknown) => {
  const result = estimate(raw);

  if (result.status !== "estimated") {
    throw new Error(`expected an estimate, got ${result.status}`);
  }

  return result;
};

const core = { name: "Core", features: [{ id: "auth", size: "standard" }] };
const v2 = { name: "V2", features: [{ id: "payments", size: "standard" }] };
const v3 = { name: "V3", features: [{ id: "back_office", size: "complex" }] };

describe("estimateProject", () => {
  test("one standard auth, brief stage: total low is half the probable, high is double", () => {
    const result = estimated({ lots: [core], openQuestions: 5 });

    assert.equal(result.lots[0]?.days.probable, 2);
    assert.equal(result.foundation.days.probable, 4.3);
    assert.equal(result.total.days.probable, 6);
    assert.equal(result.total.days.low, Math.floor(6.25 * 0.5));
    assert.equal(result.total.days.high, Math.ceil(6.25 * 2));
    assert.equal(result.total.stage, "brief");
  });

  test("answered questions tighten the band: openQuestions 0 gives low and high inside the raw PERT band", () => {
    const result = estimated({ lots: [core], openQuestions: 0 });

    assert.equal(result.total.days.low, 5);
    assert.equal(result.total.days.probable, 6);
    assert.equal(result.total.days.high, 8);
    assert.equal(result.total.stage, "refined");
  });

  test("the foundation is counted once whatever the number of lots", () => {
    const one = estimated({ lots: [core], openQuestions: 0 });
    const two = estimated({
      lots: [core, { ...core, name: "Core again" }],
      openQuestions: 0,
    });

    assert.equal(one.total.days.probable, Math.round(2 + 4.25));
    assert.equal(two.total.days.probable, Math.round(2 * 2 + 4.25));
  });

  test("eur is days times RATES.dailyHtEur with no per-line margin", () => {
    const result = estimated({ lots: [core], openQuestions: 5 });

    assert.equal(RATES.dailyHtEur, 500);
    assert.equal(result.rateHtEur, RATES.dailyHtEur);
    assert.equal(result.lots[0]?.eur.probable, 1000);
    assert.deepEqual(result.total.days, { low: 3, probable: 6, high: 13 });
    assert.deepEqual(result.total.eur, {
      low: 1500,
      probable: 3000,
      high: 6500,
    });
  });

  test("a repeated feature is counted at each occurrence", () => {
    const result = estimated({
      lots: [
        {
          name: "Core",
          features: [
            { id: "auth", size: "standard" },
            { id: "auth", size: "standard" },
          ],
        },
      ],
    });

    assert.equal(result.lots[0]?.features.length, 2);
    assert.equal(result.lots[0]?.days.probable, 4);
  });

  test("a feature outside the catalog goes to toQuote and adds no days", () => {
    const without = estimated({ lots: [core] });
    const withUnlisted = estimated({
      lots: [core],
      unlisted: ["Sync with the client's ERP"],
    });

    assert.ok(withUnlisted.toQuote.includes("Sync with the client's ERP"));
    assert.deepEqual(withUnlisted.total, without.total);
  });

  test("showcase_site and staffing return out_of_scope without any number and name /services", () => {
    for (const projectKind of ["showcase_site", "staffing"]) {
      const result = estimate({ projectKind, lots: [core], budgetEur: 5000 });

      assert.equal(result.status, "out_of_scope");
      assert.ok(JSON.stringify(result).includes("/services"));
      assert.doesNotMatch(JSON.stringify(result), /\d/);
    }
  });

  test("codebase_to_resume adds the audit to the foundation", () => {
    const fresh = estimated({ lots: [core] });
    const resumed = estimated({ lots: [core], existing: "codebase_to_resume" });

    assert.equal(fresh.foundation.items.length, 3);
    assert.equal(resumed.foundation.items.length, 4);
    assert.equal(resumed.foundation.days.probable, 6.9);
  });

  test("mobile platform without mobile_app: excluded from the total and flagged in toQuote", () => {
    const web = estimated({ lots: [core] });
    const mobile = estimated({ lots: [core], platforms: ["web", "mobile"] });
    const sized = estimated({
      lots: [
        {
          name: "Core",
          features: [
            { id: "auth", size: "standard" },
            { id: "mobile_app", size: "simple" },
          ],
        },
      ],
      platforms: ["web", "mobile"],
    });

    assert.ok(mobile.toQuote.includes("Mobile app requested but not sized"));
    assert.ok(mobile.hypotheses.some((line) => /mobile/i.test(line)));
    assert.deepEqual(mobile.total, web.total);
    assert.ok(!sized.toQuote.includes("Mobile app requested but not sized"));
  });

  test("budget: covers_probable when equal to the probable, below_range under low, numbers unchanged", () => {
    const reference = estimated({ lots: [core] });
    const equal = estimated({
      lots: [core],
      budgetEur: reference.total.eur.probable,
    });
    const under = estimated({
      lots: [core],
      budgetEur: reference.total.eur.low - 10,
    });

    assert.equal(equal.budget?.status, "covers_probable");
    assert.equal(under.budget?.status, "below_range");
    assert.deepEqual(equal.total, reference.total);
    assert.deepEqual(under.total, reference.total);
  });

  test("budget below probable proposes the longest prefix of lots that fits and never lowers the total", () => {
    const reference = estimated({ lots: [core, v2, v3] });
    const result = estimated({ lots: [core, v2, v3], budgetEur: 9000 });

    assert.deepEqual(result.budget?.split, {
      lots: ["Core", "V2"],
      probableEur: 5000,
    });
    assert.deepEqual(result.total, reference.total);
    assert.equal(result.total.eur.probable, 9500);
  });

  test("budget so low that the first lot plus foundation does not fit gives no split", () => {
    const result = estimated({ lots: [core, v2, v3], budgetEur: 2500 });

    assert.equal(result.budget?.status, "below_range");
    assert.equal(result.budget?.split, undefined);
  });

  test("topQuestions are the 3 widest features, without duplicates", () => {
    const result = estimated({
      lots: [
        {
          name: "Core",
          features: [
            { id: "auth", size: "simple" },
            { id: "back_office", size: "complex" },
            { id: "payments", size: "complex" },
          ],
        },
        {
          name: "V2",
          features: [
            { id: "back_office", size: "complex" },
            { id: "mobile_app", size: "complex" },
          ],
        },
      ],
    });

    assert.deepEqual(result.topQuestions, [
      FEATURE_GRID.mobile_app.question,
      FEATURE_GRID.back_office.question,
      FEATURE_GRID.payments.question,
    ]);
  });

  test("same input twice gives the same output", () => {
    const input = { lots: [core, v2, v3], budgetEur: 9000, unlisted: ["SSO"] };

    assert.deepEqual(estimate(input), estimate(input));
  });
});
