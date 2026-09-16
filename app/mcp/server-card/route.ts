import { NextResponse } from "next/server";
import { getServerCard } from "@/src/backend/mcp/mcp.discovery";

export function GET() {
  return NextResponse.json(getServerCard(), {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
