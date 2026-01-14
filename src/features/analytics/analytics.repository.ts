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

  async trackPageView(data: {
    path: string;
    referrer?: string | null;
    userAgent?: string | null;
    device?: string;
    browser?: string;
    os?: string;
    sessionId?: string | null;
    utmSource?: string | null;
    utmMedium?: string | null;
    utmCampaign?: string | null;
  }) {
    await db.insert(pageViews).values(data);
  },

  async trackClick(data: {
    linkId?: string | null;
    path: string;
    targetUrl: string;
    referrer?: string | null;
    userAgent?: string | null;
    sessionId?: string | null;
  }) {
    await db.insert(linkClicks).values(data);
  },

  async getViewsByPage(from: Date, to: Date, limit = 10) {
    return db
      .select({ path: pageViews.path, count: count() })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(pageViews.path)
      .orderBy(desc(count()))
      .limit(limit);
  },

  async getViewsByDevice(from: Date, to: Date) {
    return db
      .select({ device: pageViews.device, count: count() })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(pageViews.device);
  },

  async getViewsByBrowser(from: Date, to: Date) {
    return db
      .select({ browser: pageViews.browser, count: count() })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(pageViews.browser);
  },

  async getViewsByCountry(from: Date, to: Date, limit = 10) {
    const { isNotNull } = await import("drizzle-orm");
    return db
      .select({ country: pageViews.country, count: count() })
      .from(pageViews)
      .where(
        and(
          gte(pageViews.createdAt, from),
          lt(pageViews.createdAt, to),
          isNotNull(pageViews.country),
        ),
      )
      .groupBy(pageViews.country)
      .orderBy(desc(count()))
      .limit(limit);
  },

  async getViewsByReferrer(from: Date, to: Date, limit = 10) {
    const { isNotNull } = await import("drizzle-orm");
    return db
      .select({ referrer: pageViews.referrer, count: count() })
      .from(pageViews)
      .where(
        and(
          gte(pageViews.createdAt, from),
          lt(pageViews.createdAt, to),
          isNotNull(pageViews.referrer),
        ),
      )
      .groupBy(pageViews.referrer)
      .orderBy(desc(count()))
      .limit(limit);
  },

  async getViewsByHour(from: Date, to: Date) {
    return db
      .select({
        hour: sql<number>`EXTRACT(HOUR FROM ${pageViews.createdAt})::int`,
        count: count(),
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(sql`EXTRACT(HOUR FROM ${pageViews.createdAt})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${pageViews.createdAt})`);
  },

  async getViewsByDayOfWeek(from: Date, to: Date) {
    return db
      .select({
        day: sql<number>`EXTRACT(DOW FROM ${pageViews.createdAt})::int`,
        count: count(),
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(sql`EXTRACT(DOW FROM ${pageViews.createdAt})`)
      .orderBy(sql`EXTRACT(DOW FROM ${pageViews.createdAt})`);
  },

  async getViewsOverTime(from: Date, to: Date) {
    return db
      .select({
        date: sql<string>`DATE(${pageViews.createdAt})`,
        count: count(),
      })
      .from(pageViews)
      .where(and(gte(pageViews.createdAt, from), lt(pageViews.createdAt, to)))
      .groupBy(sql`DATE(${pageViews.createdAt})`)
      .orderBy(sql`DATE(${pageViews.createdAt})`);
  },

  async getLeadsOverTime(from: Date, to: Date) {
    return db
      .select({
        date: sql<string>`DATE(${leads.createdAt})`,
        count: count(),
      })
      .from(leads)
      .where(and(gte(leads.createdAt, from), lt(leads.createdAt, to)))
      .groupBy(sql`DATE(${leads.createdAt})`)
      .orderBy(sql`DATE(${leads.createdAt})`);
  },

  async getTopLinksWithUrl(from: Date, to: Date, limit = 10) {
    return db
      .select({
        id: treeLinks.id,
        title: treeLinks.title,
        url: treeLinks.url,
        clicks: count(linkClicks.id),
      })
      .from(treeLinks)
      .leftJoin(
        linkClicks,
        and(
          eq(linkClicks.linkId, treeLinks.id),
          gte(linkClicks.createdAt, from),
          lt(linkClicks.createdAt, to),
        ),
      )
      .groupBy(treeLinks.id, treeLinks.title, treeLinks.url)
      .orderBy(desc(count(linkClicks.id)))
      .limit(limit);
  },

  async getRecentLeadsInRange(from: Date, to: Date, limit = 5) {
    return db
      .select({
        id: leads.id,
        firstName: leads.firstName,
        email: leads.email,
        formTitle: forms.title,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .innerJoin(forms, eq(leads.formId, forms.id))
      .where(and(gte(leads.createdAt, from), lt(leads.createdAt, to)))
      .orderBy(desc(leads.createdAt))
      .limit(limit);
  },

  async getRecentLoginsInRange(from: Date, to: Date, limit = 10) {
    return db
      .select({
        id: loginAttempts.id,
        githubUsername: loginAttempts.githubUsername,
        githubEmail: loginAttempts.githubEmail,
        githubAvatar: loginAttempts.githubAvatar,
        ipAddress: loginAttempts.ipAddress,
        createdAt: loginAttempts.createdAt,
      })
      .from(loginAttempts)
      .where(
        and(
          gte(loginAttempts.createdAt, from),
          lt(loginAttempts.createdAt, to),
        ),
      )
      .orderBy(desc(loginAttempts.createdAt))
      .limit(limit);
  },

  async getLoginAttemptCountInRange(from: Date, to: Date) {
    const [result] = await db
      .select({ count: count() })
      .from(loginAttempts)
      .where(
        and(
          gte(loginAttempts.createdAt, from),
          lt(loginAttempts.createdAt, to),
        ),
      );
    return result?.count || 0;
  },

  async getUtmStats(from: Date, to: Date, limit = 10) {
    const { isNotNull } = await import("drizzle-orm");
    const dateFilter = and(
      gte(pageViews.createdAt, from),
      lt(pageViews.createdAt, to),
    );

    const [sources, mediums, campaigns] = await Promise.all([
      db
        .select({ source: pageViews.utmSource, count: count() })
        .from(pageViews)
        .where(and(dateFilter, isNotNull(pageViews.utmSource)))
        .groupBy(pageViews.utmSource)
        .orderBy(desc(count()))
        .limit(limit),
      db
        .select({ medium: pageViews.utmMedium, count: count() })
        .from(pageViews)
        .where(and(dateFilter, isNotNull(pageViews.utmMedium)))
        .groupBy(pageViews.utmMedium)
        .orderBy(desc(count()))
        .limit(limit),
      db
        .select({ campaign: pageViews.utmCampaign, count: count() })
        .from(pageViews)
        .where(and(dateFilter, isNotNull(pageViews.utmCampaign)))
        .groupBy(pageViews.utmCampaign)
        .orderBy(desc(count()))
        .limit(limit),
    ]);

    return { sources, mediums, campaigns };
  },

  async getActiveFormCount() {
    const [result] = await db
      .select({ count: count() })
      .from(forms)
      .where(eq(forms.isActive, true));
    return result?.count || 0;
  },
};
