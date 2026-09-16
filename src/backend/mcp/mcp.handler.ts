import { createMcpHandler } from "mcp-handler";

import { json } from "@/src/lib/http";
import { clip, MCP_CLIP, MCP_SERVER_VERSION } from "./mcp.constants";
import { getMcpPending, getMcpRequest, setMcpPending } from "./mcp.context";
import { mcpRepository } from "./mcp.repository";
import { registerMcpCapabilities } from "./mcp.server";

type RpcBody = {
  method?: string;
  params?: {
    name?: string;
    uri?: string;
    _meta?: Record<string, { name?: string; version?: string } | undefined>;
  };
};

function rpcName(method: string | undefined, body: unknown) {
  if (!body || typeof body !== "object") return null;
  const params = (body as RpcBody).params;
  if (method === "tools/call" || method === "prompts/get")
    return params?.name ?? null;
  if (method === "resources/read") return params?.uri ?? null;
  return null;
}

function rpcClient(body: unknown) {
  if (!body || typeof body !== "object") return { name: null, version: null };
  const info = (body as RpcBody).params?._meta?.[
    "io.modelcontextprotocol/clientInfo"
  ];
  return {
    name: info?.name ?? null,
    version: info?.version ?? null,
  };
}

async function persistEvent(ok: boolean, durationMs: number) {
  const pending = getMcpPending();
  if (!pending) return;

  try {
    await mcpRepository.insertEvent({
      method: clip(pending.method, MCP_CLIP.method) ?? "unknown",
      name: clip(pending.name, MCP_CLIP.name),
      clientName: clip(pending.clientName, MCP_CLIP.client),
      clientVersion: clip(pending.clientVersion, MCP_CLIP.client),
      userAgent: clip(
        getMcpRequest()?.headers.get("user-agent"),
        MCP_CLIP.userAgent,
      ),
      ok,
      durationMs,
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.error("[mcp] failed to persist event", error);
  }
}

export const mcpHandler = createMcpHandler(registerMcpCapabilities, {
  serverInfo: {
    name: "axelhamilcaro.com",
    version: MCP_SERVER_VERSION,
  },
  instructions:
    "Cursor and Claude: call initialize with protocolVersion 2025-03-26. A 2026 protocol header on initialize is ignored and the session negotiates 2025-03-26. Native 2026 clients: server/discover plus MCP-Protocol-Version 2026-07-28. Read identity resources first, then case studies. Then call audit_architecture_brief, then generate_custom_proposal. To contact Axel, email contact@axelhamilcaro.com.",
  onEvent: (event) => {
    if (event.type === "ERROR" && process.env.NODE_ENV === "development")
      console.error("[mcp]", event.error);

    if (event.type === "REQUEST_RECEIVED") {
      const client = rpcClient(event.parameters);
      setMcpPending({
        method: clip(event.method, MCP_CLIP.method) ?? event.method,
        name: clip(rpcName(event.method, event.parameters), MCP_CLIP.name),
        clientName: clip(client.name, MCP_CLIP.client),
        clientVersion: clip(client.version, MCP_CLIP.client),
      });
    }

    if (event.type === "REQUEST_COMPLETED")
      void persistEvent(event.status === "success", event.duration ?? 0);
  },
});

export async function handleMcpHttp(request: Request) {
  const prepared = await prepareMcpRequest(request);
  if (prepared instanceof Response) return prepared;
  return mcpHandler(prepared);
}

async function prepareMcpRequest(request: Request) {
  if (request.method !== "POST") return request;
  if (!request.headers.get("mcp-protocol-version")) return request;

  let body: unknown;
  try {
    body = await request.clone().json();
  } catch {
    return request;
  }

  if (!body || typeof body !== "object" || !("method" in body)) return request;

  if (body.method === "ping")
    return json({
      jsonrpc: "2.0",
      id: "id" in body ? body.id : null,
      result: {},
    });

  if (body.method !== "initialize") return request;

  const headers = new Headers(request.headers);
  headers.delete("mcp-protocol-version");

  return new Request(request.url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}
