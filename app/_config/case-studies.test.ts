import assert from "node:assert/strict";
import { test } from "node:test";
import { HOME_CLIENT_CASES } from "./case-studies";

test("the home keeps only the two strong client cases", () => {
  assert.deepEqual(
    HOME_CLIENT_CASES.map((study) => study.slug),
    ["scormpilot", "billetterie"],
  );
});
