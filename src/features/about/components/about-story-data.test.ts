import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { ABOUT_STEPS } from "./about-story-data";

describe("about story data guards", () => {
  test("the about steps never name Eskimoz and Weathertop together", () => {
    const text = JSON.stringify(ABOUT_STEPS);

    assert.ok(!(/eskimoz/i.test(text) && /weathertop/i.test(text)));
  });
});
