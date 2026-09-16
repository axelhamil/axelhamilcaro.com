import { NextResponse } from "next/server";
import { MCP } from "@/app/_config/site.constants";

export function GET() {
  return NextResponse.redirect(MCP.serverCardUrl, 301);
}
