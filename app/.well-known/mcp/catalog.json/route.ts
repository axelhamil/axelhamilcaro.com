import {
  getDiscoveryHeaders,
  getMcpCatalog,
} from "@/src/backend/mcp/mcp.discovery";
import { jsonCached } from "@/src/lib/http";

export function GET(request: Request) {
  return jsonCached(getMcpCatalog(), request, getDiscoveryHeaders());
}
