import assert from "node:assert/strict";
import { afterEach, describe, mock, test } from "node:test";
import "./mcp.test-env";
import { POST } from "../../../app/mcp/route";
import { mcpRepository, type NewMcpEvent } from "./mcp.repository";

const MCP_URL = "http://localhost:3000/mcp";

function jsonRpcPost(body: unknown, extraHeaders: HeadersInit = {}) {
  return new Request(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "User-Agent": "Claude-User (claude-code/2.1.3)",
      "x-forwarded-for": "203.0.113.7",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

function captureInsertedEvent() {
  const { promise, resolve } = Promise.withResolvers<NewMcpEvent>();
  mock.method(mcpRepository, "insertEvent", async (event: NewMcpEvent) => {
    resolve(event);
  });
  return promise;
}

afterEach(() => mock.restoreAll());

describe("MCP event telemetry", () => {
  test("serves the MCP response when the event insert fails", async () => {
    const { promise: attempted, resolve } = Promise.withResolvers<void>();
    mock.method(mcpRepository, "insertEvent", async () => {
      resolve();
      throw new Error('column "visitor_hash" does not exist');
    });
    const logged = mock.method(console, "error", () => {});

    const response = await POST(
      jsonRpcPost({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    );
    const body = await response.text();
    await attempted;
    await new Promise((done) => setImmediate(done));

    assert.equal(response.status, 200);
    assert.match(body, /list_projects/);
    assert.match(
      String(logged.mock.calls.at(-1)?.arguments[0]),
      /failed to persist MCP event/,
    );
  });

  test("records the client given at initialize in 2025 clients", async () => {
    const inserted = captureInsertedEvent();

    const response = await POST(
      jsonRpcPost({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-03-26",
          capabilities: {},
          clientInfo: { name: "claude-ai", version: "0.1.0" },
        },
      }),
    );
    await response.text();
    const event = await inserted;

    assert.equal(event.clientName, "claude-ai");
    assert.equal(event.clientVersion, "0.1.0");
  });

  test("keeps public argument values and never the IP", async () => {
    const inserted = captureInsertedEvent();

    const response = await POST(
      jsonRpcPost(
        {
          jsonrpc: "2.0",
          id: 2,
          method: "tools/call",
          params: {
            name: "list_projects",
            arguments: { category: "brique", format: "json" },
          },
        },
        { "x-vercel-ip-country": "FR", "mcp-session-id": "session-42" },
      ),
    );
    await response.text();
    const event = await inserted;

    assert.equal(event.name, "list_projects");
    assert.deepEqual(event.toolArguments, {
      category: "brique",
      format: "json",
    });
    assert.equal(event.country, "FR");
    assert.equal(event.sessionId, "session-42");
    assert.equal(event.ok, true);
    assert.doesNotMatch(JSON.stringify(event), /203\.0\.113\.7/);
  });
});

describe("MCP argument telemetry", () => {
  const leakingArguments = {
    "jean.dupont@acme.fr 06 12 34 56 78": "x",
    sk_live_51Hx: true,
  };

  test("stores only a count of undeclared argument names", async () => {
    const inserted = captureInsertedEvent();

    const response = await POST(
      jsonRpcPost({
        jsonrpc: "2.0",
        id: 4,
        method: "tools/call",
        params: {
          name: "list_projects",
          arguments: { ...leakingArguments, format: "json" },
        },
      }),
    );
    await response.text();
    const event = await inserted;

    assert.equal(event.name, "list_projects");
    assert.deepEqual(event.toolArguments, {
      format: "json",
      _undeclared: "2",
    });
    assert.doesNotMatch(JSON.stringify(event), /jean|acme|06 12|sk_live/);
  });

  test("records a tool outside the catalog as unknown", async () => {
    const inserted = captureInsertedEvent();

    const response = await POST(
      jsonRpcPost({
        jsonrpc: "2.0",
        id: 5,
        method: "tools/call",
        params: {
          name: "jean.dupont@acme.fr sk_live_51Hx",
          arguments: leakingArguments,
        },
      }),
    );
    await response.text();
    const event = await inserted;

    assert.equal(event.name, "unknown");
    assert.deepEqual(event.toolArguments, { _undeclared: "2" });
    assert.doesNotMatch(JSON.stringify(event), /jean|acme|06 12|sk_live/);
  });
});

describe("MCP tool failure telemetry", () => {
  test("records a tool error result as a failed call with its message", async () => {
    const inserted = captureInsertedEvent();

    const response = await POST(
      jsonRpcPost({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: {
          name: "estimate_project",
          arguments: {
            unlisted: ["Custom ERP connector for jean@example.com"],
          },
        },
      }),
    );
    await response.text();
    const event = await inserted;

    assert.equal(event.ok, false);
    assert.match(event.errorMessage ?? "", /at least one feature/);
    assert.deepEqual(event.toolArguments, { unlisted: null });
    assert.doesNotMatch(JSON.stringify(event), /jean@example/);
  });
});
