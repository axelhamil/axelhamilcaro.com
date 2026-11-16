import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { ALL_HOME_TEXTS, HOME_DESCRIPTION } from "./home-copy";

describe("home copy guards", () => {
  test("no home text names Eskimoz and Weathertop together", () => {
    for (const text of ALL_HOME_TEXTS) {
      assert.ok(!(/eskimoz/i.test(text) && /weathertop/i.test(text)), text);
    }
  });

  test("no home text uses an em or en dash", () => {
    for (const text of ALL_HOME_TEXTS) {
      assert.doesNotMatch(text, /[–—]/);
    }
  });

  test("no home text pairs Weathertop with search vocabulary", () => {
    for (const text of ALL_HOME_TEXTS) {
      if (!/weathertop/i.test(text)) continue;

      assert.doesNotMatch(text, /\b(seo|geo|ranking|classement|marque)\b/i);
    }
  });

  test("home meta description is 140 to 160 characters", () => {
    assert.ok(HOME_DESCRIPTION.length >= 140, `${HOME_DESCRIPTION.length}`);
    assert.ok(HOME_DESCRIPTION.length <= 160, `${HOME_DESCRIPTION.length}`);
  });
});
