import { headers } from "next/headers";
import * as mcpStatsController from "@/src/backend/mcp/mcp.stats.controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return mcpStatsController.getStats(await headers(), searchParams);
}
