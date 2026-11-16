import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  CODEBASE_AUDIT,
  type DayTriple,
  FEATURE_GRID,
  FEATURE_IDS,
  FOUNDATION,
  SIZES,
} from "./mcp.estimation.grid";
import { estimateInputSchema } from "./mcp.estimation.schema";

const allTriples = (): DayTriple[] => [
  ...FEATURE_IDS.flatMap((id) =>
    SIZES.map((size) => FEATURE_GRID[id].sizes[size]),
  ),
  ...FOUNDATION.map((item) => item.days),
  CODEBASE_AUDIT,
];

describe("estimation grid", () => {
  test("the grid has 12 to 18 features, 3 sizes each", () => {
    assert.ok(FEATURE_IDS.length >= 12 && FEATURE_IDS.length <= 18);

    for (const id of FEATURE_IDS) {
      assert.deepEqual(
        Object.keys(FEATURE_GRID[id].sizes).sort(),
        [...SIZES].sort(),
      );
    }
  });

  test("every triple is ordered low <= likely <= high", () => {
    for (const triple of allTriples()) {
      assert.ok(triple.low <= triple.likely, JSON.stringify(triple));
      assert.ok(triple.likely <= triple.high, JSON.stringify(triple));
    }
  });

  test("sizes grow: simple.likely <= standard.likely <= complex.likely", () => {
    for (const id of FEATURE_IDS) {
      const { simple, standard, complex } = FEATURE_GRID[id].sizes;

      assert.ok(simple.likely <= standard.likely, id);
      assert.ok(standard.likely <= complex.likely, id);
    }
  });

  test("no half-day floor: at least one value is under 0.5", () => {
    assert.ok(allTriples().some((triple) => triple.low < 0.5));
  });
});

describe("estimateInputSchema", () => {
  test("input schema defaults and bounds", () => {
    const parsed = estimateInputSchema.parse({
      lots: [{ name: "Core", features: [{ id: "auth", size: "simple" }] }],
    });

    assert.equal(parsed.projectKind, "application");
    assert.deepEqual(parsed.platforms, ["web"]);
    assert.equal(parsed.existing, "none");
    assert.equal(parsed.openQuestions, 5);
    assert.equal(parsed.format, "markdown");

    const feature = { id: "auth", size: "simple" };
    const lot = { name: "Core", features: [feature] };
    const rejected = [
      {
        lots: [
          { name: "Core", features: [{ id: "teleport", size: "simple" }] },
        ],
      },
      { lots: [{ name: "Core", features: [{ id: "auth", size: "huge" }] }] },
      { lots: Array.from({ length: 7 }, () => lot) },
      {
        lots: [
          { name: "Core", features: Array.from({ length: 21 }, () => feature) },
        ],
      },
      { openQuestions: 11 },
      { budgetEur: -1 },
    ];

    for (const input of rejected) {
      assert.equal(
        estimateInputSchema.safeParse(input).success,
        false,
        JSON.stringify(input).slice(0, 80),
      );
    }
  });
});
