import { createMcpHandler } from "mcp-handler";
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
    "Read identity resources first, then case studies. Then call audit_architecture_brief, then generate_custom_proposal. To contact Axel, email contact@axelhamilcaro.com.",
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
