import { NextResponse } from "next/server";
import { getMcpCatalog } from "@/src/backend/mcp/mcp.discovery";

export function GET() {
  return NextResponse.json(getMcpCatalog(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
