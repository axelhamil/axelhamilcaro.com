import { MCP_AI_CATALOG_TYPE } from "@/src/backend/mcp/mcp.constants";
import {
  getAiCatalog,
  getDiscoveryHeaders,
} from "@/src/backend/mcp/mcp.discovery";
import { jsonCached } from "@/src/lib/http";

export function GET(request: Request) {
  return jsonCached(
    getAiCatalog(),
    request,
    getDiscoveryHeaders(MCP_AI_CATALOG_TYPE),
  );
}
