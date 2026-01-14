import {
  and,
  count,
  countDistinct,
  desc,
  eq,
  gte,
  isNotNull,
  lt,
  sql,
} from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/app/_lib/api-auth";
import { db } from "@/drizzle";
import {
  forms,
  leads,
  linkClicks,
  loginAttempts,
  pageViews,
  treeLinks,
} from "@/drizzle/schema";

function parseDateRange(searchParams: URLSearchParams) {
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (from && to) {
    return {
      startDate: new Date(from),
      endDate: new Date(to),
      days: Math.ceil(
        (new Date(to).getTime() - new Date(from).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    };
  }

  const days = Number.parseInt(searchParams.get("days") || "30", 10);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return { startDate, endDate, days };
}

export async function GET(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const { searchParams } = new URL(request.url);
    const { startDate, endDate, days } = parseDateRange(searchParams);

    const dateFilter = and(
      gte(pageViews.createdAt, startDate),
      lt(pageViews.createdAt, endDate),
    );

    const previousPeriodEnd = new Date(startDate);
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - days);

    const [
      overviewStats,
      previousStats,
      viewsByPage,
      viewsByDevice,
      viewsByBrowser,
      viewsByCountry,
      viewsByReferrer,
      viewsByHour,
      viewsByDayOfWeek,
      topLinks,
      viewsOverTime,
      leadsOverTime,
      recentLeads,
      recentLoginAttempts,
      utmStats,
    ] = await Promise.all([
      db
        .select({
          totalViews: count(),
          uniqueSessions: countDistinct(pageViews.sessionId),
        })
        .from(pageViews)
        .where(dateFilter)
        .then(([r]) => r),

      Promise.all([
        db
          .select({ count: count() })
          .from(pageViews)
          .where(
            and(
              gte(pageViews.createdAt, previousPeriodStart),
              lt(pageViews.createdAt, previousPeriodEnd),
            ),
          )
          .then(([r]) => r?.count || 0),
        db
          .select({ count: count() })
          .from(leads)
          .where(
            and(
              gte(leads.createdAt, previousPeriodStart),
              lt(leads.createdAt, previousPeriodEnd),
            ),
          )
          .then(([r]) => r?.count || 0),
        db
          .select({ count: count() })
          .from(linkClicks)
          .where(
            and(
              gte(linkClicks.createdAt, previousPeriodStart),
              lt(linkClicks.createdAt, previousPeriodEnd),
            ),
          )
          .then(([r]) => r?.count || 0),
      ]),

      db
        .select({ path: pageViews.path, count: count() })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(pageViews.path)
        .orderBy(desc(count()))
        .limit(10),

      db
        .select({ device: pageViews.device, count: count() })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(pageViews.device),

      db
        .select({ browser: pageViews.browser, count: count() })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(pageViews.browser),

      db
        .select({ country: pageViews.country, count: count() })
        .from(pageViews)
        .where(and(dateFilter, isNotNull(pageViews.country)))
        .groupBy(pageViews.country)
        .orderBy(desc(count()))
        .limit(10),

      db
        .select({ referrer: pageViews.referrer, count: count() })
        .from(pageViews)
        .where(and(dateFilter, isNotNull(pageViews.referrer)))
        .groupBy(pageViews.referrer)
        .orderBy(desc(count()))
        .limit(10),

      db
        .select({
          hour: sql<number>`EXTRACT(HOUR FROM ${pageViews.createdAt})::int`,
          count: count(),
        })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(sql`EXTRACT(HOUR FROM ${pageViews.createdAt})`)
        .orderBy(sql`EXTRACT(HOUR FROM ${pageViews.createdAt})`),

      db
        .select({
          day: sql<number>`EXTRACT(DOW FROM ${pageViews.createdAt})::int`,
          count: count(),
        })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(sql`EXTRACT(DOW FROM ${pageViews.createdAt})`)
        .orderBy(sql`EXTRACT(DOW FROM ${pageViews.createdAt})`),

      db
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
            gte(linkClicks.createdAt, startDate),
            lt(linkClicks.createdAt, endDate),
          ),
        )
        .groupBy(treeLinks.id, treeLinks.title, treeLinks.url)
        .orderBy(desc(count(linkClicks.id)))
        .limit(10),

      db
        .select({
          date: sql<string>`DATE(${pageViews.createdAt})`,
          count: count(),
        })
        .from(pageViews)
        .where(dateFilter)
        .groupBy(sql`DATE(${pageViews.createdAt})`)
        .orderBy(sql`DATE(${pageViews.createdAt})`),

      db
        .select({
          date: sql<string>`DATE(${leads.createdAt})`,
          count: count(),
        })
        .from(leads)
        .where(
          and(gte(leads.createdAt, startDate), lt(leads.createdAt, endDate)),
        )
        .groupBy(sql`DATE(${leads.createdAt})`)
        .orderBy(sql`DATE(${leads.createdAt})`),

      db
        .select({
          id: leads.id,
          firstName: leads.firstName,
          email: leads.email,
          formTitle: forms.title,
          createdAt: leads.createdAt,
        })
        .from(leads)
        .innerJoin(forms, eq(leads.formId, forms.id))
        .where(
          and(gte(leads.createdAt, startDate), lt(leads.createdAt, endDate)),
        )
        .orderBy(desc(leads.createdAt))
        .limit(5),

      db
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
            gte(loginAttempts.createdAt, startDate),
            lt(loginAttempts.createdAt, endDate),
          ),
        )
        .orderBy(desc(loginAttempts.createdAt))
        .limit(10),

      Promise.all([
        db
          .select({ source: pageViews.utmSource, count: count() })
          .from(pageViews)
          .where(and(dateFilter, isNotNull(pageViews.utmSource)))
          .groupBy(pageViews.utmSource)
          .orderBy(desc(count()))
          .limit(10),
        db
          .select({ medium: pageViews.utmMedium, count: count() })
          .from(pageViews)
          .where(and(dateFilter, isNotNull(pageViews.utmMedium)))
          .groupBy(pageViews.utmMedium)
          .orderBy(desc(count()))
          .limit(10),
        db
          .select({ campaign: pageViews.utmCampaign, count: count() })
          .from(pageViews)
          .where(and(dateFilter, isNotNull(pageViews.utmCampaign)))
          .groupBy(pageViews.utmCampaign)
          .orderBy(desc(count()))
          .limit(10),
      ]),
    ]);

    const [[totalClicks], [totalLeads], [activeForms], [totalLoginAttempts]] =
      await Promise.all([
        db
          .select({ count: count() })
          .from(linkClicks)
          .where(
            and(
              gte(linkClicks.createdAt, startDate),
              lt(linkClicks.createdAt, endDate),
            ),
          ),
        db
          .select({ count: count() })
          .from(leads)
          .where(
            and(gte(leads.createdAt, startDate), lt(leads.createdAt, endDate)),
          ),
        db
          .select({ count: count() })
          .from(forms)
          .where(eq(forms.isActive, true)),
        db
          .select({ count: count() })
          .from(loginAttempts)
          .where(
            and(
              gte(loginAttempts.createdAt, startDate),
              lt(loginAttempts.createdAt, endDate),
            ),
          ),
      ]);

    const [previousViews, previousLeads, previousClicks] = previousStats;

    const currentViewsCount = overviewStats?.totalViews || 0;
    const currentLeadsCount = totalLeads?.count || 0;
    const currentClicksCount = totalClicks?.count || 0;

    const viewsChange =
      previousViews > 0
        ? Math.round(
            ((currentViewsCount - previousViews) / previousViews) * 100,
          )
        : 0;
    const leadsChange =
      previousLeads > 0
        ? Math.round(
            ((currentLeadsCount - previousLeads) / previousLeads) * 100,
          )
        : 0;
    const clicksChange =
      previousClicks > 0
        ? Math.round(
            ((currentClicksCount - previousClicks) / previousClicks) * 100,
          )
        : 0;

    const conversionRate =
      currentViewsCount > 0
        ? Math.round((currentLeadsCount / currentViewsCount) * 10000) / 100
        : 0;
    const clickRate =
      currentViewsCount > 0
        ? Math.round((currentClicksCount / currentViewsCount) * 10000) / 100
        : 0;
    const avgViewsPerSession =
      overviewStats?.uniqueSessions > 0
        ? Math.round((currentViewsCount / overviewStats.uniqueSessions) * 100) /
          100
        : 0;

    const peakHour = viewsByHour.reduce(
      (max, h) => (h.count > max.count ? h : max),
      { hour: 0, count: 0 },
    );
    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    const peakDay = viewsByDayOfWeek.reduce(
      (max, d) => (d.count > max.count ? d : max),
      { day: 0, count: 0 },
    );

    return NextResponse.json({
      period: {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        days,
      },
      overview: {
        totalViews: currentViewsCount,
        totalClicks: currentClicksCount,
        totalLeads: currentLeadsCount,
        activeForms: activeForms?.count || 0,
        totalLoginAttempts: totalLoginAttempts?.count || 0,
        uniqueSessions: overviewStats?.uniqueSessions || 0,
        conversionRate,
        clickRate,
        avgViewsPerSession,
      },
      comparison: {
        viewsChange,
        leadsChange,
        clicksChange,
        previousViews,
        previousLeads,
        previousClicks,
      },
      peakTimes: {
        hour: peakHour.hour,
        hourLabel: `${peakHour.hour}h - ${peakHour.hour + 1}h`,
        day: peakDay.day,
        dayLabel: dayNames[peakDay.day] || "N/A",
      },
      viewsByPage,
      viewsByDevice,
      viewsByBrowser,
      viewsByCountry,
      viewsByReferrer,
      viewsByHour,
      viewsByDayOfWeek: viewsByDayOfWeek.map((d) => ({
        ...d,
        dayLabel: dayNames[d.day],
      })),
      viewsByUtmSource: utmStats[0],
      viewsByUtmMedium: utmStats[1],
      viewsByUtmCampaign: utmStats[2],
      topLinks,
      viewsOverTime,
      leadsOverTime,
      recentLeads,
      recentLoginAttempts,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
