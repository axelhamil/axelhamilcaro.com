import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { GLOBAL_JSON_LD } from "../json-ld";
import { buildProfessionalServiceSchema } from "./professional-service";

function collectIds(
  node: unknown,
  defined: Set<string>,
  referenced: Set<string>,
) {
  if (Array.isArray(node)) {
    for (const item of node) collectIds(item, defined, referenced);
    return;
  }

  if (typeof node !== "object" || node === null) return;

  const id = "@id" in node ? node["@id"] : undefined;

  if (typeof id === "string") {
    const target = Object.keys(node).length === 1 ? referenced : defined;
    target.add(id);
  }

  for (const value of Object.values(node)) {
    collectIds(value, defined, referenced);
  }
}

function orphanIds(...blocks: unknown[]) {
  const defined = new Set<string>();
  const referenced = new Set<string>();
  collectIds(blocks, defined, referenced);

  return [...referenced].filter((id) => !defined.has(id));
}

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
