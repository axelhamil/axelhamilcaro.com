import { headers } from "next/headers";
import * as mcpStatsController from "@/src/backend/mcp/mcp.stats.controller";

export async function GET(request: Request) {
  const days = Number(new URL(request.url).searchParams.get("days") ?? "7");
  return mcpStatsController.getStats(await headers(), days);
}
