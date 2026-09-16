import { runWithMcpRequest } from "@/src/backend/mcp/mcp.context";
import {
  getMcpCorsHeaders,
  getMcpGetDiscoveryBody,
  getMcpGetDiscoveryHeaders,
} from "@/src/backend/mcp/mcp.discovery";
import { handleMcpHttp } from "@/src/backend/mcp/mcp.handler";
import {
  jsonWithHeaders,
  noContent,
  rateLimited,
  withCors,
} from "@/src/lib/http";
import {
  getClientIdentifier,
  RATE_LIMITS,
  rateLimit,
} from "@/src/lib/rate-limit";

export const runtime = "nodejs";

function cors(response: Response) {
  return withCors(response, getMcpCorsHeaders());
}

export function GET() {
  return jsonWithHeaders(
    getMcpGetDiscoveryBody(),
    getMcpGetDiscoveryHeaders(),
    405,
  );
}

export function OPTIONS(_request?: Request) {
  return noContent(getMcpCorsHeaders());
}

export function POST(request: Request) {
  const limited = rateLimit(
    `mcp:${getClientIdentifier(request)}`,
    RATE_LIMITS.mcp,
  );
  if (!limited.success) return cors(rateLimited(limited.retryAfter));

  return runWithMcpRequest(request, async () =>
    cors(await handleMcpHttp(request)),
  );
}

export function DELETE(request: Request) {
  return runWithMcpRequest(request, async () =>
    cors(await handleMcpHttp(request)),
  );
}
