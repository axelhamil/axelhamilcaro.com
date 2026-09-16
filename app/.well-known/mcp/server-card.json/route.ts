import { MCP_SERVER_CARD_TYPE } from "@/src/backend/mcp/mcp.constants";
import {
  getDiscoveryHeaders,
  getServerCard,
} from "@/src/backend/mcp/mcp.discovery";
import { jsonCached } from "@/src/lib/http";

export function GET(request: Request) {
  return jsonCached(
    getServerCard(),
    request,
    getDiscoveryHeaders(MCP_SERVER_CARD_TYPE),
  );
}
