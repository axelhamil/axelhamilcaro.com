import { authService } from "@/src/backend/auth/auth.service";
import { error, json } from "@/src/lib/http";
import {
  MCP_EVENTS_FILTER_MAX,
  mcpEventsQuerySchema,
  mcpOverviewQuerySchema,
} from "./mcp.stats.schema";
import { mcpStatsService } from "./mcp.stats.service";

const TELEMETRY_UNAVAILABLE =
  "MCP telemetry is unavailable. Check that the mcp_events migrations ran.";

const INVALID_EVENTS_QUERY = "MCP_EVENTS_QUERY_INVALID";

function invalidEventsQuery(field: PropertyKey | undefined) {
  const filter = typeof field === "string" ? field : "filter";

  return json(
    {
      error: `The "${filter}" filter accepts at most ${MCP_EVENTS_FILTER_MAX} characters.`,
      code: INVALID_EVENTS_QUERY,
    },
    400,
  );
}

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

  const parsed = mcpEventsQuerySchema.safeParse(
    Object.fromEntries(searchParams),
  );
  if (!parsed.success)
    return invalidEventsQuery(parsed.error.issues[0]?.path[0]);

  try {
    return json(await mcpStatsService.events(parsed.data));
  } catch (cause) {
    logStatsFailure("mcp.stats.events", cause);
    return error(TELEMETRY_UNAVAILABLE, 503);
  }
}
