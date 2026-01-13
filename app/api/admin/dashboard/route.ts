import { db } from "@/app/_lib/db";
import {
  forms,
  leads,
  linkClicks,
  loginAttempts,
  pageViews,
  treeLinks,
} from "@/app/_lib/db/schema";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import {
  and,
  count,
  countDistinct,
  desc,
  eq,
  gte,
  lt,
  sql,
} from "drizzle-orm";
import { NextResponse } from "next/server";

function formatRelativeTime(date: Date | null): string {
  if (!date) return "-";
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export async function GET() {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const now = new Date();
    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);
    const last14Days = new Date(now);
    last14Days.setDate(last14Days.getDate() - 14);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const [
      [formStats],
      [activeFormCount],
      [leadStats],
      [previousLeadStats],
      [viewStats],
      [previousViewStats],
      [clickStats],
      [previousClickStats],
      [todayViews],
      [todayLeads],
      [loginStats],
      recentLeads,
      recentLogins,
      topLinks,
      viewsLast7Days,
      leadsLast7Days,
    ] = await Promise.all([
      db.select({ count: count() }).from(forms),

      db
        .select({ count: count() })
        .from(forms)
        .where(eq(forms.isActive, true)),

      db
        .select({
          count: count(),
        })
        .from(leads)
        .where(gte(leads.createdAt, last7Days)),

      db
        .select({
          count: count(),
        })
        .from(leads)
        .where(and(gte(leads.createdAt, last14Days), lt(leads.createdAt, last7Days))),

      db
        .select({
          count: count(),
          uniqueSessions: countDistinct(pageViews.sessionId),
        })
        .from(pageViews)
        .where(gte(pageViews.createdAt, last7Days)),

      db
        .select({
          count: count(),
        })
        .from(pageViews)
        .where(and(gte(pageViews.createdAt, last14Days), lt(pageViews.createdAt, last7Days))),

      db
        .select({ count: count() })
        .from(linkClicks)
        .where(gte(linkClicks.createdAt, last7Days)),

      db
        .select({ count: count() })
        .from(linkClicks)
        .where(and(gte(linkClicks.createdAt, last14Days), lt(linkClicks.createdAt, last7Days))),

      db
        .select({ count: count() })
        .from(pageViews)
        .where(gte(pageViews.createdAt, today)),

      db
        .select({ count: count() })
        .from(leads)
        .where(gte(leads.createdAt, today)),

      db
        .select({ count: count() })
        .from(loginAttempts)
        .where(gte(loginAttempts.createdAt, last7Days)),

      db
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
        .limit(5),

      db
        .select({
          id: loginAttempts.id,
          githubUsername: loginAttempts.githubUsername,
          githubAvatar: loginAttempts.githubAvatar,
          ipAddress: loginAttempts.ipAddress,
          createdAt: loginAttempts.createdAt,
        })
        .from(loginAttempts)
        .orderBy(desc(loginAttempts.createdAt))
        .limit(5),

      db
        .select({
          id: treeLinks.id,
          title: treeLinks.title,
          clicks: count(linkClicks.id),
        })
        .from(treeLinks)
        .leftJoin(
          linkClicks,
          and(eq(linkClicks.linkId, treeLinks.id), gte(linkClicks.createdAt, last7Days))
        )
        .groupBy(treeLinks.id, treeLinks.title)
        .orderBy(desc(count(linkClicks.id)))
        .limit(5),

      db
        .select({
          date: sql<string>`DATE(${pageViews.createdAt})`,
          count: count(),
        })
        .from(pageViews)
        .where(gte(pageViews.createdAt, last7Days))
        .groupBy(sql`DATE(${pageViews.createdAt})`)
        .orderBy(sql`DATE(${pageViews.createdAt})`),

      db
        .select({
          date: sql<string>`DATE(${leads.createdAt})`,
          count: count(),
        })
        .from(leads)
        .where(gte(leads.createdAt, last7Days))
        .groupBy(sql`DATE(${leads.createdAt})`)
        .orderBy(sql`DATE(${leads.createdAt})`),
    ]);

    const totalForms = formStats?.count || 0;
    const activeForms = activeFormCount?.count || 0;
    const currentLeads = leadStats?.count || 0;
    const previousLeads = previousLeadStats?.count || 0;
    const currentViews = viewStats?.count || 0;
    const previousViews = previousViewStats?.count || 0;
    const currentClicks = clickStats?.count || 0;
    const previousClicks = previousClickStats?.count || 0;
    const uniqueSessions = viewStats?.uniqueSessions || 0;

    const conversionRate =
      currentViews > 0
        ? Math.round((currentLeads / currentViews) * 10000) / 100
        : 0;

    const clickRate =
      currentViews > 0
        ? Math.round((currentClicks / currentViews) * 10000) / 100
        : 0;

    const formattedLeads = recentLeads.map((lead) => ({
      ...lead,
      relativeTime: formatRelativeTime(lead.createdAt),
    }));

    const formattedLogins = recentLogins.map((login) => ({
      ...login,
      relativeTime: formatRelativeTime(login.createdAt),
    }));

    return NextResponse.json({
      period: "7 derniers jours",

      overview: {
        totalForms,
        activeForms,
        inactiveForms: totalForms - activeForms,
        totalLeads: currentLeads,
        totalViews: currentViews,
        totalClicks: currentClicks,
        uniqueSessions,
        conversionRate,
        clickRate,
        loginAttempts: loginStats?.count || 0,
      },

      today: {
        views: todayViews?.count || 0,
        leads: todayLeads?.count || 0,
      },

      comparison: {
        leadsChange: calculateChange(currentLeads, previousLeads),
        viewsChange: calculateChange(currentViews, previousViews),
        clicksChange: calculateChange(currentClicks, previousClicks),
        previousLeads,
        previousViews,
        previousClicks,
      },

      charts: {
        viewsLast7Days,
        leadsLast7Days,
      },

      topLinks: topLinks.map((link) => ({
        id: link.id,
        title: link.title,
        clicks: link.clicks,
      })),

      recentActivity: {
        leads: formattedLeads,
        logins: formattedLogins,
      },
    });
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
