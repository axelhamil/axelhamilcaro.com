import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { isWebMcpAvailable } from "./is-webmcp-available";

describe("isWebMcpAvailable", () => {
  test("is false without registerTool", () => {
    assert.equal(isWebMcpAvailable(undefined), false);
    assert.equal(isWebMcpAvailable({}), false);
  });

  test("is true when registerTool is a function", () => {
    assert.equal(isWebMcpAvailable({ registerTool: async () => {} }), true);
  });
});
