import { NextResponse } from "next/server";
import { getServerManifest } from "@/src/backend/mcp/mcp.discovery";

export function GET() {
  return NextResponse.json(getServerManifest(), {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
