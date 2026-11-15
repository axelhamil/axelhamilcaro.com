import assert from "node:assert/strict";
import { afterEach, describe, mock, test } from "node:test";
import "./mcp.test-env";
import { authService } from "@/src/backend/auth/auth.service";
import { listEvents } from "./mcp.stats.controller";

afterEach(() => mock.restoreAll());

function givenAdmin() {
  mock.method(authService, "requireAdmin", async () => ({
    success: true,
    userId: "admin",
  }));
}

describe("listEvents query validation", () => {
  for (const field of ["method", "origin", "visit"]) {
    test(`answers 400 when ${field} is longer than 256 characters`, async () => {
      givenAdmin();

      const response = await listEvents(
        new Headers(),
        new URLSearchParams({ [field]: "a".repeat(257) }),
      );
      const body = await response.json();

      assert.equal(response.status, 400);
      assert.deepEqual(body, {
        error: `The "${field}" filter accepts at most 256 characters.`,
        code: "MCP_EVENTS_QUERY_INVALID",
      });
    });
  }
});
