import {
  and,
  desc,
  eq,
  gte,
  inArray,
  isNotNull,
  lt,
  lte,
  sql,
} from "drizzle-orm";
import { db } from "@/drizzle";
import { forms, leads, mcpBriefs, mcpEvents } from "@/drizzle/schema";
import {
  briefRetentionCutoff,
  MCP_INQUIRY_SLUG,
  MCP_STATS_TIME_ZONE,
} from "./mcp.constants";
import { logMcpFailure } from "./mcp.log";
import {
  MCP_ORIGIN_RULES,
  MCP_TRAFFIC_CATEGORIES,
  type McpOriginRule,
  type McpTrafficScope,
  OTHER_ORIGIN,
  UNKNOWN_ORIGIN,
} from "./mcp.origin";

const BRIEF_TTL_MS = 24 * 60 * 60 * 1000;
const EVENT_RETENTION_MS = 30 * 24 * 60 * 60 * 1000;
const PURGE_INTERVAL_MS = 60 * 60 * 1000;

let lastPurge = 0;

async function purgeStale() {
  const now = Date.now();
  if (now - lastPurge < PURGE_INTERVAL_MS) return;
  lastPurge = now;

  try {
    const eventCutoff = new Date(now - EVENT_RETENTION_MS);
    await Promise.all([
      db.delete(mcpBriefs).where(lte(mcpBriefs.expiresAt, new Date())),
      db.delete(mcpEvents).where(lte(mcpEvents.createdAt, eventCutoff)),
      db
        .delete(leads)
        .where(
          and(
            inArray(
              leads.formId,
              db
                .select({ id: forms.id })
                .from(forms)
                .where(eq(forms.slug, MCP_INQUIRY_SLUG)),
            ),
            lt(leads.createdAt, briefRetentionCutoff(new Date(now))),
          ),
        ),
    ]);
  } catch (error) {
    lastPurge = 0;
    logMcpFailure("mcp.repository", "MCP retention purge failed", error);
  }
}

export type McpBriefPayload = {
  need: string;
  stack?: string;
  constraints?: string;
  analysis: unknown;
};

export type NewMcpEvent = {
  method: string;
  name?: string | null;
  clientName?: string | null;
  clientVersion?: string | null;
  userAgent?: string | null;
  ok: boolean;
  durationMs?: number | null;
  sessionId?: string | null;
  visitorHash?: string | null;
  country?: string | null;
  city?: string | null;
  toolArguments?: Record<string, string | null> | null;
  errorMessage?: string | null;
  referer?: string | null;
};

export type McpStatsScope = {
  from: Date;
  traffic: McpTrafficScope;
};

export type McpEventFilter = McpStatsScope & {
  method?: string;
  ok?: boolean;
  origin?: string;
  visit?: string;
};

export type McpEventCursor = {
  createdAt: string;
  id: string;
};

const visitorOfDay = sql<
  string | null
>`(${mcpEvents.visitorHash} || '@' || to_char(${mcpEvents.createdAt}, 'YYYYMMDD'))`;

const visitKey = sql<
  string | null
>`coalesce(${mcpEvents.sessionId}, ${visitorOfDay})`;

function sqlLiteral(value: string) {
  return `'${value.replaceAll("'", "''")}'`;
}

function ruleBranches(column: string, pick: (rule: McpOriginRule) => string) {
  return MCP_ORIGIN_RULES.map(
    (rule) =>
      `when ${column} ~* ${sqlLiteral(rule.pattern)} then ${sqlLiteral(pick(rule))}`,
  ).join(" ");
}

function originCase(
  pick: (rule: McpOriginRule) => string,
  unknown: string,
  other: string,
) {
  const clientName = `"mcp_events"."client_name"`;
  const userAgent = `"mcp_events"."user_agent"`;

  return `(case ${ruleBranches(clientName, pick)} when coalesce(btrim(${userAgent}), '') = '' then ${sqlLiteral(unknown)} ${ruleBranches(userAgent, pick)} else ${sqlLiteral(other)} end)`;
}

const originIdSql = sql.raw(
  originCase((rule) => rule.id, UNKNOWN_ORIGIN.id, OTHER_ORIGIN.id),
);

const originCategorySql = sql.raw(
  originCase(
    (rule) => rule.category,
    UNKNOWN_ORIGIN.category,
    OTHER_ORIGIN.category,
  ),
);

function trafficCondition(traffic: McpTrafficScope) {
  if (traffic === "tout") return undefined;

  const categories = MCP_TRAFFIC_CATEGORIES[traffic].map(sqlLiteral).join(", ");
  return sql`${originCategorySql} in (${sql.raw(categories)})`;
}

function scopeConditions(scope: McpStatsScope) {
  return and(
    gte(mcpEvents.createdAt, scope.from),
    trafficCondition(scope.traffic),
  );
}

function eventConditions(filter: McpEventFilter, cursor?: McpEventCursor) {
  return and(
    scopeConditions(filter),
    filter.method ? eq(mcpEvents.method, filter.method) : undefined,
    filter.ok === undefined ? undefined : eq(mcpEvents.ok, filter.ok),
    filter.origin ? sql`${originIdSql} = ${filter.origin}` : undefined,
    filter.visit ? eq(visitKey, filter.visit) : undefined,
    cursor
      ? sql`(${mcpEvents.createdAt}, ${mcpEvents.id}) < (cast(${cursor.createdAt} as timestamp), cast(${cursor.id} as uuid))`
      : undefined,
  );
}

const mcpLeadSource = sql`(${leads.source} = 'mcp' or ${leads.source} like 'mcp:%')`;

const countAll = sql<number>`cast(count(*) as int)`;
const lastAt = sql<Date | null>`max(${mcpEvents.createdAt})`.mapWith(
  mcpEvents.createdAt,
);

export const mcpRepository = {
  async createBrief(payload: McpBriefPayload) {
    await purgeStale();

    const expiresAt = new Date(Date.now() + BRIEF_TTL_MS);
    const [row] = await db
      .insert(mcpBriefs)
      .values({ payload, expiresAt })
      .returning();

    return row;
  },

  async deleteExpiredBriefs() {
    await db.delete(mcpBriefs).where(lte(mcpBriefs.expiresAt, new Date()));
  },

  async insertEvent(event: NewMcpEvent) {
    await purgeStale();

    await db.insert(mcpEvents).values({
      method: event.method,
      name: event.name ?? null,
      clientName: event.clientName ?? null,
      clientVersion: event.clientVersion ?? null,
      userAgent: event.userAgent ?? null,
      ok: event.ok,
      durationMs: event.durationMs ?? null,
      sessionId: event.sessionId ?? null,
      visitorHash: event.visitorHash ?? null,
      country: event.country ?? null,
      city: event.city ?? null,
      toolArguments: event.toolArguments ?? null,
      errorMessage: event.errorMessage ?? null,
      referer: event.referer ?? null,
    });
  },

  async totals(scope: McpStatsScope) {
    const [row] = await db
      .select({
        calls: countAll,
        errors: sql<number>`cast(count(*) filter (where not ${mcpEvents.ok}) as int)`,
        medianMs: sql<
          number | null
        >`percentile_cont(0.5) within group (order by ${mcpEvents.durationMs})`.mapWith(
          Number,
        ),
        p95Ms: sql<
          number | null
        >`percentile_cont(0.95) within group (order by ${mcpEvents.durationMs})`.mapWith(
          Number,
        ),
        lastAt,
        visitors: sql<number>`cast(count(distinct ${visitorOfDay}) as int)`,
      })
      .from(mcpEvents)
      .where(scopeConditions(scope));

    return row;
  },

  async callsByDay(scope: McpStatsScope) {
    const day = sql<string>`to_char((${mcpEvents.createdAt} at time zone 'UTC') at time zone ${sql.raw(`'${MCP_STATS_TIME_ZONE}'`)}, 'YYYY-MM-DD')`;

    return db
      .select({
        day,
        calls: countAll,
        errors: sql<number>`cast(count(*) filter (where not ${mcpEvents.ok}) as int)`,
      })
      .from(mcpEvents)
      .where(scopeConditions(scope))
      .groupBy(day)
      .orderBy(day);
  },

  async topNames(scope: McpStatsScope, method: string) {
    return db
      .select({ name: mcpEvents.name, count: countAll, lastAt })
      .from(mcpEvents)
      .where(and(scopeConditions(scope), eq(mcpEvents.method, method)))
      .groupBy(mcpEvents.name)
      .orderBy(desc(sql`count(*)`))
      .limit(8);
  },

  async origins(scope: McpStatsScope) {
    const origin = sql<string>`${originIdSql}`;

    return db
      .select({ id: origin, count: countAll, lastAt })
      .from(mcpEvents)
      .where(scopeConditions(scope))
      .groupBy(origin)
      .orderBy(desc(sql`count(*)`));
  },

  async categories(from: Date) {
    const category = sql<string>`${originCategorySql}`;

    return db
      .select({ category, count: countAll })
      .from(mcpEvents)
      .where(gte(mcpEvents.createdAt, from))
      .groupBy(category);
  },

  async methods(scope: McpStatsScope) {
    return db
      .select({ method: mcpEvents.method, count: countAll })
      .from(mcpEvents)
      .where(scopeConditions(scope))
      .groupBy(mcpEvents.method)
      .orderBy(desc(sql`count(*)`));
  },

  async leadCounts(from: Date) {
    const [[mcpLeads], [webLeads]] = await Promise.all([
      db
        .select({ count: countAll })
        .from(leads)
        .where(and(gte(leads.createdAt, from), mcpLeadSource)),
      db
        .select({ count: countAll })
        .from(leads)
        .where(
          and(
            gte(leads.createdAt, from),
            sql`(${leads.source} is null or not ${mcpLeadSource})`,
          ),
        ),
    ]);

    return { mcp: mcpLeads?.count ?? 0, webForms: webLeads?.count ?? 0 };
  },

  async listEvents(
    filter: McpEventFilter,
    limit: number,
    cursor?: McpEventCursor,
  ) {
    return db
      .select({
        event: mcpEvents,
        cursor: sql<string>`to_char(${mcpEvents.createdAt}, 'YYYY-MM-DD"T"HH24:MI:SS.US')`,
        visit: visitKey,
      })
      .from(mcpEvents)
      .where(eventConditions(filter, cursor))
      .orderBy(desc(mcpEvents.createdAt), desc(mcpEvents.id))
      .limit(limit);
  },

  async clientsByVisit(visits: string[]) {
    if (visits.length === 0) return [];

    return db
      .selectDistinctOn([visitKey], {
        visit: visitKey,
        clientName: mcpEvents.clientName,
        clientVersion: mcpEvents.clientVersion,
      })
      .from(mcpEvents)
      .where(and(isNotNull(mcpEvents.clientName), inArray(visitKey, visits)))
      .orderBy(visitKey, desc(mcpEvents.createdAt));
  },
};
