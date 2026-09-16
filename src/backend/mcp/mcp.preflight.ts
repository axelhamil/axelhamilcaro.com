import { noContent } from "@/src/lib/http";
import { getMcpCorsHeaders } from "./mcp.discovery";

export function OPTIONS(_request?: Request) {
  return noContent(getMcpCorsHeaders());
}
