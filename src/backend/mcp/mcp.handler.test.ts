import assert from "node:assert/strict";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { DELETE, GET, POST } from "../../../app/mcp/route";

const MCP_URL = "http://localhost:3000/mcp";

function jsonRpcPost(body: unknown, extraHeaders: HeadersInit = {}) {
  return new Request(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /mcp", () => {
  test("answers server/discover with a 2xx Response", async () => {
    const request = jsonRpcPost(
      {
        jsonrpc: "2.0",
        id: "discover-1",
        method: "server/discover",
        params: {
          _meta: {
            "io.modelcontextprotocol/protocolVersion": "2026-07-28",
            "io.modelcontextprotocol/clientInfo": {
              name: "task-1-test",
              version: "1.0.0",
            },
            "io.modelcontextprotocol/clientCapabilities": {},
          },
        },
      },
      {
        "MCP-Protocol-Version": "2026-07-28",
        "Mcp-Method": "server/discover",
      },
    );

    const response = await POST(request);

    assert.ok(response instanceof Response);
    assert.equal(response.status, 200);

    const payload = (await response.json()) as {
      result?: {
        instructions?: string;
        _meta?: {
          "io.modelcontextprotocol/serverInfo"?: {
            name?: string;
            version?: string;
          };
        };
      };
    };

    assert.equal(
      payload.result?._meta?.["io.modelcontextprotocol/serverInfo"]?.name,
      "axelhamilcaro.com",
    );
    assert.equal(
      payload.result?._meta?.["io.modelcontextprotocol/serverInfo"]?.version,
      "1.0.0",
    );
    assert.match(
      payload.result?.instructions ?? "",
      /audit_architecture_brief/,
    );
    assert.doesNotMatch(payload.result?.instructions ?? "", /submit_inquiry/);
  });

  test("answers 2025 initialize with a Response", async () => {
    const request = jsonRpcPost({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "task-1-test", version: "1.0.0" },
      },
    });

    const response = await POST(request);

    assert.ok(response instanceof Response);
    assert.equal(response.status, 200);
  });
});

describe("GET and DELETE /mcp", () => {
  test("return 405 in stateless mode", async () => {
    const getResponse = await GET();
    const deleteResponse = await DELETE(
      new Request(MCP_URL, { method: "DELETE" }),
    );

    assert.equal(getResponse.status, 405);
    assert.equal(deleteResponse.status, 405);
    assert.equal(getResponse.headers.get("Allow"), "POST");
    assert.match(
      getResponse.headers.get("Link") ?? "",
      /well-known\/mcp\.json/,
    );
    assert.equal(getResponse.headers.get("X-Robots-Tag"), "noindex, nofollow");

    const body = (await getResponse.json()) as { message?: string };
    assert.match(body.message ?? "", /POST Streamable HTTP/);
    assert.match(body.message ?? "", /pas une page/);
  });
});
