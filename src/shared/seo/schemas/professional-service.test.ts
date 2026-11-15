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

  test("the service node carries its rating and reviews", () => {
    const schema = buildProfessionalServiceSchema();

    assert.equal(schema.aggregateRating["@type"], "AggregateRating");
    assert.ok(schema.review.length >= schema.aggregateRating.reviewCount);
  });
});
