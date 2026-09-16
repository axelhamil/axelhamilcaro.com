import assert from "node:assert/strict";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { DELETE, GET, OPTIONS, POST } from "../../../app/mcp/route";

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
      getResponse.headers.get("Access-Control-Allow-Methods") ?? "",
      /POST/,
    );
    assert.equal(getResponse.headers.get("Access-Control-Allow-Origin"), "*");
    assert.match(
      getResponse.headers.get("Link") ?? "",
      /well-known\/ai-catalog\.json/,
    );
    assert.match(
      getResponse.headers.get("Link") ?? "",
      /well-known\/mcp\.json/,
    );
    assert.equal(getResponse.headers.get("X-Robots-Tag"), "noindex, nofollow");

    const body = (await getResponse.json()) as { message?: string };
    assert.match(body.message ?? "", /POST Streamable HTTP/);
    assert.match(body.message ?? "", /pas une page/);
    assert.match(body.message ?? "", /2025-03-26/);
    assert.doesNotMatch(body.message ?? "", /sans header/);
    assert.doesNotMatch(body.message ?? "", / = 400/);
  });
});

describe("MCP browser CORS", () => {
  test("POST initialize from claude.ai exposes Access-Control-Allow-Origin", async () => {
    const response = await POST(
      jsonRpcPost(
        {
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2025-03-26",
            capabilities: {},
            clientInfo: { name: "claude.ai", version: "1" },
          },
        },
        { Origin: "https://claude.ai" },
      ),
    );

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
    assert.match(
      response.headers.get("Access-Control-Allow-Methods") ?? "",
      /POST/,
    );
  });

  test("OPTIONS preflight allows POST from a browser origin", async () => {
    const response = await OPTIONS(
      new Request(MCP_URL, {
        method: "OPTIONS",
        headers: {
          Origin: "https://claude.ai",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "content-type,mcp-protocol-version",
        },
      }),
    );

    assert.equal(response.status, 204);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
    assert.match(
      response.headers.get("Access-Control-Allow-Methods") ?? "",
      /POST/,
    );
    assert.match(
      response.headers.get("Access-Control-Allow-Headers") ?? "",
      /MCP-Protocol-Version/i,
    );
    assert.match(
      response.headers.get("Access-Control-Allow-Headers") ?? "",
      /Mcp-Name/i,
    );
  });
});

describe("2026 header on initialize", () => {
  test("does not 400 when Cursor sends initialize plus MCP-Protocol-Version 2026", async () => {
    const response = await POST(
      jsonRpcPost(
        {
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: {
            protocolVersion: "2026-07-28",
            capabilities: {},
            clientInfo: { name: "cursor", version: "1" },
          },
        },
        { "MCP-Protocol-Version": "2026-07-28" },
      ),
    );

    assert.equal(response.status, 200);
    const text = await response.text();
    assert.match(text, /2025-03-26/);
    assert.doesNotMatch(text, /headers and body disagree/);
  });
});

describe("2026 ping", () => {
  test("answers ping with an empty result instead of Method not found", async () => {
    const response = await POST(
      jsonRpcPost(
        {
          jsonrpc: "2.0",
          id: "ping-1",
          method: "ping",
          params: {
            _meta: {
              "io.modelcontextprotocol/protocolVersion": "2026-07-28",
              "io.modelcontextprotocol/clientInfo": {
                name: "task-ping-test",
                version: "1.0.0",
              },
              "io.modelcontextprotocol/clientCapabilities": {},
            },
          },
        },
        {
          "MCP-Protocol-Version": "2026-07-28",
          "Mcp-Method": "ping",
        },
      ),
    );

    assert.equal(response.status, 200);
    const payload = (await response.json()) as {
      result?: unknown;
      error?: { message?: string };
    };
    assert.equal(payload.error, undefined);
    assert.deepEqual(payload.result, {});
    assert.doesNotMatch(JSON.stringify(payload), /Method not found/);
  });
});
