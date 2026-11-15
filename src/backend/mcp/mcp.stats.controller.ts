import { authService } from "@/src/backend/auth/auth.service";
import { error, json } from "@/src/lib/http";
import {
  mcpEventsQuerySchema,
  mcpOverviewQuerySchema,
} from "./mcp.stats.schema";
import { mcpStatsService } from "./mcp.stats.service";

const TELEMETRY_UNAVAILABLE =
  "MCP telemetry is unavailable. Check that the mcp_events migrations ran.";

function logStatsFailure(scope: string, cause: unknown) {
  console.error(
    JSON.stringify({
      level: "error",
      scope,
      message: "MCP stats query failed",
      error: cause instanceof Error ? cause.message : String(cause),
    }),
  );
}

export async function getStats(
  headers: Headers,
  searchParams: URLSearchParams,
) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  const query = mcpOverviewQuerySchema.parse(Object.fromEntries(searchParams));

  try {
    return json(await mcpStatsService.overview(query.days, query.traffic));
  } catch (cause) {
    logStatsFailure("mcp.stats.overview", cause);
    return error(TELEMETRY_UNAVAILABLE, 503);
  }
}

export async function listEvents(
  headers: Headers,
  searchParams: URLSearchParams,
) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  const query = mcpEventsQuerySchema.parse(Object.fromEntries(searchParams));

  try {
    return json(await mcpStatsService.events(query));
  } catch (cause) {
    logStatsFailure("mcp.stats.events", cause);
    return error(TELEMETRY_UNAVAILABLE, 503);
  }
}
