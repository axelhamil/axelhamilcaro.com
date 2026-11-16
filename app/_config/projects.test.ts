import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { getProjectBySlug } from "./projects";

describe("project posters", () => {
  test("the clean-stack poster no longer leans on the star count", () => {
    const project = getProjectBySlug("clean-stack");

    assert.ok(project);

    for (const text of [...project.highlights, ...project.ribbon]) {
      assert.doesNotMatch(text, /étoiles/);
    }
  });
});
