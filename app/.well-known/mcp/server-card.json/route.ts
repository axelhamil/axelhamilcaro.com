import { MCP_SERVER_CARD_TYPE } from "@/src/backend/mcp/mcp.constants";
import {
  getDiscoveryHeaders,
  getServerCard,
} from "@/src/backend/mcp/mcp.discovery";
import { jsonCached } from "@/src/lib/http";

export const runtime = "nodejs";
export { OPTIONS } from "@/src/backend/mcp/mcp.preflight";

export function GET(request: Request) {
  return jsonCached(
    getServerCard(),
    request,
    getDiscoveryHeaders(MCP_SERVER_CARD_TYPE),
  );
}
