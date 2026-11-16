import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { estimateProject } from "./mcp.estimation";
import { REFERENCE_PROJECTS } from "./mcp.references";

const briefStage = (input: (typeof REFERENCE_PROJECTS)[number]["input"]) => {
  const result = estimateProject({ ...input, openQuestions: 5 });

  if (result.status !== "estimated") {
    throw new Error(`expected an estimate, got ${result.status}`);
  }

  return result;
};

describe("calibration on delivered projects", () => {
  for (const reference of REFERENCE_PROJECTS) {
    test(`${reference.name}: the brief-stage range crosses 20 to 65 working days`, () => {
      const { total } = briefStage(reference.input);

      assert.ok(total.days.low <= 65 && total.days.high >= 20);
    });

    test(`${reference.name}: the probable figure itself sits inside its real duration`, () => {
      const { total } = briefStage(reference.input);
      const [min, max] = reference.slug === "billetterie" ? [18, 26] : [20, 65];

      assert.ok(
        total.days.probable >= min && total.days.probable <= max,
        `${reference.name}: ${total.days.probable} days`,
      );
    });
  }

  test("the estimate says the calibration is a loose check", () => {
    const [first] = REFERENCE_PROJECTS;

    assert.ok(first);

    const { hypotheses } = briefStage(first.input);

    assert.ok(hypotheses.some((line) => line.includes("loose")));
    assert.ok(
      hypotheses.some((line) =>
        line.includes("each delivered project tightens the grid"),
      ),
    );
  });
});
