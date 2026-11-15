import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { GLOBAL_JSON_LD } from "../json-ld";
import { orphanIds } from "./orphan-ids";
import { buildProfessionalServiceSchema } from "./professional-service";

describe("ProfessionalService JSON-LD", () => {
  test("every @id referenced next to the global graph is defined on the page", () => {
    assert.deepEqual(
      orphanIds(GLOBAL_JSON_LD, buildProfessionalServiceSchema()),
      [],
    );
  });

  test("no node rates or reviews Axel's own business", () => {
    const served = JSON.stringify([
      GLOBAL_JSON_LD,
      buildProfessionalServiceSchema(),
    ]);

    assert.doesNotMatch(served, /aggregateRating|reviewRating|"review"|Review/);
  });
});
