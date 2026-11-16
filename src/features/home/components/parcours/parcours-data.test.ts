import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { CHAPITRES } from "./parcours-data";

describe("parcours data guards", () => {
  test("no chapter names Eskimoz and Weathertop together", () => {
    for (const chapitre of CHAPITRES) {
      const text = JSON.stringify(chapitre);

      assert.ok(
        !(/eskimoz/i.test(text) && /weathertop/i.test(text)),
        chapitre.id,
      );
    }
  });
});
