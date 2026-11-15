import { createMcpHandler } from "mcp-handler";
import { after } from "next/server";

import { z } from "zod";
import { json } from "@/src/lib/http";
import { getClientIdentifier } from "@/src/lib/rate-limit";
import { clip, MCP_CLIP, MCP_SERVER_VERSION } from "./mcp.constants";
import {
  getMcpStore,
  type McpStore,
  setMcpError,
  setMcpPending,
} from "./mcp.context";
import { mcpRepository } from "./mcp.repository";
import { registerMcpCapabilities } from "./mcp.server";
import {
  knownCallName,
  readRequestTelemetry,
  shortErrorMessage,
  summarizeToolArguments,
  visitorFingerprint,
} from "./mcp.telemetry";

const clientInfoSchema = z.object({
  name: z.string().optional().catch(undefined),
  version: z.string().optional().catch(undefined),
});

const rpcBodySchema = z.object({
  params: z
    .object({
      name: z.string().optional().catch(undefined),
      uri: z.string().optional().catch(undefined),
      arguments: z.unknown().optional(),
      clientInfo: clientInfoSchema.optional().catch(undefined),
      _meta: z
        .object({
          "io.modelcontextprotocol/clientInfo": clientInfoSchema
            .optional()
            .catch(undefined),
        })
        .optional()
        .catch(undefined),
    })
    .optional()
    .catch(undefined),
});

type RpcParams = z.infer<typeof rpcBodySchema>["params"];

function rpcParams(body: unknown): RpcParams {
  const parsed = rpcBodySchema.safeParse(body);
  return parsed.success ? parsed.data.params : undefined;
}

function rpcName(method: string, params: RpcParams) {
  if (method === "tools/call" || method === "prompts/get")
    return knownCallName(method, params?.name);
  if (method === "resources/read") return params?.uri ?? null;
  return null;
}

function rpcArguments(method: string, params: RpcParams) {
  if (method !== "tools/call" && method !== "prompts/get") return null;
  return summarizeToolArguments(method, params?.name, params?.arguments);
}

function rpcClient(params: RpcParams) {
  const info =
    params?._meta?.["io.modelcontextprotocol/clientInfo"] ?? params?.clientInfo;

  return {
    name: info?.name ?? null,
    version: info?.version ?? null,
  };
}

function describeError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function logPersistFailure(error: unknown) {
  console.error(
    JSON.stringify({
      level: "error",
      scope: "mcp.telemetry",
      message: "failed to persist MCP event",
      error: describeError(error),
    }),
  );
}

type McpOutcome = {
  status: number;
  durationMs: number;
  thrown?: unknown;
};

async function persistEvent(store: McpStore | undefined, outcome: McpOutcome) {
  try {
    const pending = store?.pending;
    if (!store || !pending) return;

    const { request } = store;
    const ok =
      outcome.status < 400 && !store.toolFailed && outcome.thrown === undefined;
    const thrownMessage =
      outcome.thrown === undefined ? null : describeError(outcome.thrown);
    const errorMessage = ok
      ? null
      : shortErrorMessage(
          store.errorMessage ?? thrownMessage ?? `HTTP ${outcome.status}`,
        );

    await mcpRepository.insertEvent({
      method: clip(pending.method, MCP_CLIP.method) ?? "unknown",
      name: clip(pending.name, MCP_CLIP.name),
      clientName: clip(pending.clientName, MCP_CLIP.client),
      clientVersion: clip(pending.clientVersion, MCP_CLIP.client),
      userAgent: clip(request.headers.get("user-agent"), MCP_CLIP.userAgent),
      ok,
      durationMs: outcome.durationMs,
      toolArguments: pending.toolArguments,
      errorMessage,
      visitorHash: visitorFingerprint(
        getClientIdentifier(request),
        new Date(),
        process.env.BETTER_AUTH_SECRET,
      ),
      ...readRequestTelemetry(request.headers),
    });
  } catch (error) {
    logPersistFailure(error);
  }
}

function deferUntilResponseClosed(task: () => Promise<void>) {
  try {
    after(task);
    return true;
  } catch {
    return false;
  }
}

function markWhenSent(response: Response, onSent: () => void) {
  if (!response.body) {
    onSent();
    return response;
  }

  const body = response.body.pipeThrough(
    new TransformStream({
      flush() {
        onSent();
      },
    }),
  );

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

function persistWhenSent(
  response: Response,
  persist: (sentAt: number) => Promise<void>,
) {
  let sentAt: number | undefined;
  const deferred = deferUntilResponseClosed(() =>
    persist(sentAt ?? Date.now()),
  );

  return markWhenSent(response, () => {
    sentAt = Date.now();
    if (!deferred) void persist(sentAt);
  });
}

function persistAfterFailure(persist: () => Promise<void>) {
  if (!deferUntilResponseClosed(persist)) void persist();
}

export const mcpHandler = createMcpHandler(registerMcpCapabilities, {
  serverInfo: {
    name: "axelhamilcaro.com",
    version: MCP_SERVER_VERSION,
  },
  instructions:
    "Cursor and Claude: call initialize with protocolVersion 2025-03-26. A 2026 protocol header on initialize is ignored and the session negotiates 2025-03-26. Native 2026 clients: server/discover plus MCP-Protocol-Version 2026-07-28. Read identity resources first (site://whoami), then site://projects or list_projects, then case studies. For a client project, call audit_architecture_brief, then generate_custom_proposal. To contact Axel, email contact@axelhamilcaro.com.",
  onEvent: (event) => {
    if (event.type === "ERROR") {
      if (process.env.NODE_ENV === "development")
        console.error("[mcp]", event.error);
      setMcpError(describeError(event.error));
    }

    if (event.type === "REQUEST_RECEIVED") {
      const params = rpcParams(event.parameters);
      const client = rpcClient(params);
      setMcpPending({
        method: clip(event.method, MCP_CLIP.method) ?? event.method,
        name: clip(rpcName(event.method, params), MCP_CLIP.name),
        clientName: clip(client.name, MCP_CLIP.client),
        clientVersion: clip(client.version, MCP_CLIP.client),
        toolArguments: rpcArguments(event.method, params),
      });
    }
  },
});

export async function handleMcpHttp(request: Request) {
  const prepared = await prepareMcpRequest(request);
  if (prepared instanceof Response) return prepared;

  const store = getMcpStore();
  const startedAt = Date.now();

  try {
    const response = await mcpHandler(prepared);
    return persistWhenSent(response, (sentAt) =>
      persistEvent(store, {
        status: response.status,
        durationMs: sentAt - startedAt,
      }),
    );
  } catch (error) {
    const failedAt = Date.now();
    persistAfterFailure(() =>
      persistEvent(store, {
        status: 500,
        durationMs: failedAt - startedAt,
        thrown: error,
      }),
    );
    throw error;
  }
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
