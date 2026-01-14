import { and, count, countDistinct, desc, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "@/drizzle";
import {
  forms,
  leads,
  linkClicks,
  loginAttempts,
  pageViews,
  treeLinks,
} from "@/drizzle/schema";

export const analyticsRepository = {
  async getFormCounts() {
    const [[total], [active]] = await Promise.all([
      db.select({ count: count() }).from(forms),
      db.select({ count: count() }).from(forms).where(eq(forms.isActive, true)),
    ]);
    return { total: total?.count || 0, active: active?.count || 0 };
  },

  async getLeadCount(from: Date, to?: Date) {
    const conditions = to
      ? and(gte(leads.createdAt, from), lt(leads.createdAt, to))
      : gte(leads.createdAt, from);

    const [result] = await db
      .select({ count: count() })
      .from(leads)
      .where(conditions);
    return result?.count || 0;
  },

  async getViewStats(from: Date, to?: Date) {
    const conditions = to
      ? and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to))
      : gte(pageViews.createdAt, from);

    const [result] = await db
      .select({
        count: count(),
        uniqueSessions: countDistinct(pageViews.sessionId),
      })
      .from(pageViews)
      .where(conditions);

    return {
      count: result?.count || 0,
      uniqueSessions: result?.uniqueSessions || 0,
    };
  },

  async getClickCount(from: Date, to?: Date) {
    const conditions = to
      ? and(gte(linkClicks.createdAt, from), lt(linkClicks.createdAt, to))
      : gte(linkClicks.createdAt, from);

    const [result] = await db
      .select({ count: count() })
      .from(linkClicks)
      .where(conditions);
    return result?.count || 0;
  },

  async getLoginAttemptCount(from: Date) {
    const [result] = await db
      .select({ count: count() })
      .from(loginAttempts)
      .where(gte(loginAttempts.createdAt, from));
    return result?.count || 0;
  },

  async getRecentLeads(limit: number) {
    return db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        email: leads.email,
        createdAt: leads.createdAt,
        formTitle: forms.title,
      })
      .from(leads)
      .innerJoin(forms, eq(leads.formId, forms.id))
      .orderBy(desc(leads.createdAt))
      .limit(limit);
  },

  async getRecentLogins(limit: number) {
    return db
      .select({
        id: loginAttempts.id,
        githubUsername: loginAttempts.githubUsername,
        githubAvatar: loginAttempts.githubAvatar,
        ipAddress: loginAttempts.ipAddress,
        createdAt: loginAttempts.createdAt,
      })
      .from(loginAttempts)
      .orderBy(desc(loginAttempts.createdAt))
      .limit(limit);
  },

  async getTopLinks(from: Date, limit: number) {
    return db
      .select({
        id: treeLinks.id,
        title: treeLinks.title,
        clicks: count(linkClicks.id),
      })
      .from(treeLinks)
      .leftJoin(
        linkClicks,
        and(
          eq(linkClicks.linkId, treeLinks.id),
          gte(linkClicks.createdAt, from),
        ),
      )
      .groupBy(treeLinks.id, treeLinks.title)
      .orderBy(desc(count(linkClicks.id)))
      .limit(limit);
  },

  async getViewsByDay(from: Date) {
    return db
      .select({
        date: sql<string>`DATE(${pageViews.createdAt})`,
        count: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.createdAt, from))
      .groupBy(sql`DATE(${pageViews.createdAt})`)
      .orderBy(sql`DATE(${pageViews.createdAt})`);
  },

  async getLeadsByDay(from: Date) {
    return db
      .select({
        date: sql<string>`DATE(${leads.createdAt})`,
        count: count(),
      })
      .from(leads)
      .where(gte(leads.createdAt, from))
      .groupBy(sql`DATE(${leads.createdAt})`)
      .orderBy(sql`DATE(${leads.createdAt})`);
  },
};
