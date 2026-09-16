import { runWithMcpRequest } from "@/src/backend/mcp/mcp.context";
import { mcpHandler } from "@/src/backend/mcp/mcp.handler";
import { rateLimited } from "@/src/lib/http";
import {
  getClientIdentifier,
  RATE_LIMITS,
  rateLimit,
} from "@/src/lib/rate-limit";

export const runtime = "nodejs";

export function GET(request: Request) {
  return runWithMcpRequest(request, () => mcpHandler(request));
}

export function POST(request: Request) {
  const limited = rateLimit(
    `mcp:${getClientIdentifier(request)}`,
    RATE_LIMITS.mcp,
  );
  if (!limited.success) return rateLimited(limited.retryAfter);

  return runWithMcpRequest(request, () => mcpHandler(request));
}

export function DELETE(request: Request) {
  return runWithMcpRequest(request, () => mcpHandler(request));
}
