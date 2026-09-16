import { and, desc, eq, gte, like, lte, sql } from "drizzle-orm";
import { db } from "@/drizzle";
import { leads, mcpBriefs, mcpEvents } from "@/drizzle/schema";

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
    ]);
  } catch {
    lastPurge = 0;
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
};

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

  async findBriefById(id: string) {
    const [row] = await db
      .select()
      .from(mcpBriefs)
      .where(eq(mcpBriefs.id, id))
      .limit(1);

    if (!row) return null;
    if (row.expiresAt.getTime() < Date.now()) return null;

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
    });
  },

  async stats(from: Date) {
    const [totals] = await db
      .select({
        calls: sql<number>`cast(count(*) as int)`,
        clients: sql<number>`cast(count(distinct ${mcpEvents.clientName}) as int)`,
      })
      .from(mcpEvents)
      .where(gte(mcpEvents.createdAt, from));

    const topTools = await db
      .select({
        name: mcpEvents.name,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(mcpEvents)
      .where(
        and(gte(mcpEvents.createdAt, from), eq(mcpEvents.method, "tools/call")),
      )
      .groupBy(mcpEvents.name)
      .orderBy(desc(sql`count(*)`))
      .limit(8);

    const topResources = await db
      .select({
        name: mcpEvents.name,
        count: sql<number>`cast(count(*) as int)`,
      })
      .from(mcpEvents)
      .where(
        and(
          gte(mcpEvents.createdAt, from),
          eq(mcpEvents.method, "resources/read"),
        ),
      )
      .groupBy(mcpEvents.name)
      .orderBy(desc(sql`count(*)`))
      .limit(8);

    const recent = await db
      .select()
      .from(mcpEvents)
      .where(gte(mcpEvents.createdAt, from))
      .orderBy(desc(mcpEvents.createdAt))
      .limit(50);

    const [[mcpLeads], [webLeads]] = await Promise.all([
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(leads)
        .where(and(gte(leads.createdAt, from), like(leads.source, "mcp:%"))),
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(leads)
        .where(
          and(
            gte(leads.createdAt, from),
            sql`(${leads.source} is null or ${leads.source} not like 'mcp:%')`,
          ),
        ),
    ]);

    return {
      calls: totals?.calls ?? 0,
      distinctClients: totals?.clients ?? 0,
      topTools,
      topResources,
      recent,
      leads: {
        mcp: mcpLeads?.count ?? 0,
        webForms: webLeads?.count ?? 0,
        contactModalExcluded:
          "The site contact modal is email-only and is not counted here.",
      },
    };
  },
};
