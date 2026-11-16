import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { PERSON_DESCRIPTION } from "./json-ld";

describe("person description", () => {
  test("never names Eskimoz and Weathertop together", () => {
    assert.ok(
      !(
        /eskimoz/i.test(PERSON_DESCRIPTION) &&
        /weathertop/i.test(PERSON_DESCRIPTION)
      ),
      PERSON_DESCRIPTION,
    );
  });
});
