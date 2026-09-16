import { NextResponse } from "next/server";
import { MCP } from "@/app/_config/site.constants";

export const runtime = "nodejs";
export { OPTIONS } from "@/src/backend/mcp/mcp.preflight";

export function GET() {
  return NextResponse.redirect(MCP.serverCardUrl, 301);
}
