import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { logMcpFailure } from "./mcp.log";

function captureLine(t: test.TestContext, error: unknown) {
  const logged = t.mock.method(console, "error", () => undefined);
  logMcpFailure("mcp.repository", "insert failed", error);

  return String(logged.mock.calls[0]?.arguments[0]);
}

describe("logMcpFailure", () => {
  test("a pg error wrapped by drizzle logs the code of its cause, never its message, detail or query params", (t) => {
    const pgError = Object.assign(new Error("duplicate key jean@example.com"), {
      code: "23505",
      detail: "Key (email)=(jean@example.com) already exists.",
    });
    const wrapped = new DrizzleQueryError(
      "insert into leads values ($1)",
      ["jean@example.com"],
      pgError,
    );
    const line = captureLine(t, wrapped);

    assert.equal(JSON.parse(line).code, "23505");
    assert.doesNotMatch(line, /jean|duplicate|Key|insert into/);
  });
});
