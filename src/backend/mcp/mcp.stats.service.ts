import { MCP_STATS_TIME_ZONE } from "./mcp.constants";
import {
  detectMcpOrigin,
  MCP_TRAFFIC_CATEGORIES,
  type McpTrafficScope,
  mcpOriginById,
} from "./mcp.origin";
import { type McpEventFilter, mcpRepository } from "./mcp.repository";
import type { McpEventsQuery } from "./mcp.stats.schema";

const DAY_MS = 24 * 60 * 60 * 1000;

function periodStart(days: number) {
  return new Date(Date.now() - days * DAY_MS);
}

function daysBetween(from: Date, to: Date) {
  const format = new Intl.DateTimeFormat("en-CA", {
    timeZone: MCP_STATS_TIME_ZONE,
  });
  const days = new Set<string>();
  for (let time = from.getTime(); time < to.getTime(); time += DAY_MS / 2)
    days.add(format.format(new Date(time)));
  days.add(format.format(to));

  return [...days];
}

function hiddenTraffic(
  traffic: McpTrafficScope,
  categories: { category: string; count: number }[],
) {
  const visible = new Set<string>(MCP_TRAFFIC_CATEGORIES[traffic]);
  const hidden = categories.filter(
    (row) => !visible.has(row.category) && row.count > 0,
  );

  return {
    total: hidden.reduce((sum, row) => sum + row.count, 0),
    byCategory: hidden.sort((x, y) => y.count - x.count),
  };
}

function parseCursor(cursor: string | undefined) {
  if (!cursor) return undefined;
  const [createdAt, id] = cursor.split("|");
  if (!createdAt || !id) return undefined;

  return { createdAt, id };
}

export const mcpStatsService = {
  async overview(days: number, traffic: McpTrafficScope) {
    const from = periodStart(days);
    const scope = { from, traffic };

    const [
      totals,
      byDay,
      tools,
      resources,
      origins,
      categories,
      methods,
      leads,
    ] = await Promise.all([
      mcpRepository.totals(scope),
      mcpRepository.callsByDay(scope),
      mcpRepository.topNames(scope, "tools/call"),
      mcpRepository.topNames(scope, "resources/read"),
      mcpRepository.origins(scope),
      mcpRepository.categories(from),
      mcpRepository.methods(scope),
      mcpRepository.leadCounts(from),
    ]);

    const calls = totals?.calls ?? 0;
    const errors = totals?.errors ?? 0;
    const counts = new Map(byDay.map((row) => [row.day, row]));

    return {
      days,
      traffic,
      hidden: hiddenTraffic(traffic, categories),
      timeZone: MCP_STATS_TIME_ZONE,
      calls,
      errors,
      errorRate: calls === 0 ? 0 : errors / calls,
      medianMs: totals?.medianMs ?? null,
      p95Ms: totals?.p95Ms ?? null,
      lastAt: totals?.lastAt ?? null,
      distinctVisitors: totals?.visitors ?? 0,
      distinctOrigins: origins.length,
      callsByDay: daysBetween(from, new Date()).map((day) => ({
        day,
        calls: counts.get(day)?.calls ?? 0,
        errors: counts.get(day)?.errors ?? 0,
      })),
      origins: origins.map(({ id, count, lastAt }) => ({
        ...mcpOriginById(id),
        count,
        lastAt,
      })),
      methods,
      topTools: tools,
      topResources: resources,
      leads: {
        ...leads,
        contactModalExcluded:
          "The site contact modal is email-only and is not counted here.",
      },
    };
  },

  async events(query: McpEventsQuery) {
    const from = periodStart(query.days);
    const filter: McpEventFilter = {
      from,
      traffic: query.traffic,
      method: query.method,
      ok: query.status === undefined ? undefined : query.status === "ok",
      origin: query.origin,
      visit: query.visit,
    };

    const rows = await mcpRepository.listEvents(
      filter,
      query.limit + 1,
      parseCursor(query.cursor),
    );
    const page = rows.slice(0, query.limit);
    const last = page.at(-1);
    const nextCursor =
      rows.length > query.limit && last
        ? `${last.cursor}|${last.event.id}`
        : null;

    const visitsWithoutClient = page
      .filter((row) => !row.event.clientName && row.visit)
      .map((row) => row.visit)
      .filter((visit): visit is string => visit !== null);
    const clients = new Map(
      (
        await mcpRepository.clientsByVisit([...new Set(visitsWithoutClient)])
      ).map((client) => [client.visit, client]),
    );

    return {
      nextCursor,
      events: page.map(({ event, visit }) => {
        const inferred = visit ? clients.get(visit) : undefined;

        return {
          id: event.id,
          createdAt: event.createdAt,
          method: event.method,
          name: event.name,
          clientName: event.clientName ?? inferred?.clientName ?? null,
          clientVersion: event.clientName
            ? event.clientVersion
            : (inferred?.clientVersion ?? null),
          clientInferred: !event.clientName && Boolean(inferred?.clientName),
          origin: detectMcpOrigin(event),
          userAgent: event.userAgent,
          ok: event.ok,
          durationMs: event.durationMs,
          errorMessage: event.errorMessage,
          country: event.country,
          city: event.city,
          visit,
          sessionId: event.sessionId,
          toolArguments: event.toolArguments,
          referer: event.referer,
        };
      }),
    };
  },
};
