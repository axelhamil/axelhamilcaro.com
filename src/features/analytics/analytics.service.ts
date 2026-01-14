import { formatRelativeDate } from "@/src/lib/utils/date.utils";
import {
  type TrafficCategory,
  getTrafficSource,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/src/lib/utils/traffic.utils";
import { analyticsRepository } from "./analytics.repository";
import { type TrackEventInput, trackEventSchema } from "./analytics.schema";

function parseUserAgent(ua: string | null) {
  if (!ua) return { device: "unknown", browser: "unknown", os: "unknown" };

  let device = "desktop";
  if (/mobile/i.test(ua)) device = "mobile";
  else if (/tablet|ipad/i.test(ua)) device = "tablet";

  let browser = "unknown";
  if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";

  let os = "unknown";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/mac/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/android/i.test(ua)) os = "Android";
  else if (/iphone|ipad/i.test(ua)) os = "iOS";

  return { device, browser, os };
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

interface TrafficSourceAggregated {
  name: string;
  category: TrafficCategory;
  categoryLabel: string;
  color: string;
  count: number;
}

interface TrafficByCategory {
  category: TrafficCategory;
  label: string;
  color: string;
  count: number;
  percentage: number;
}

function aggregateTrafficSources(
  rawData: {
    referrer: string | null;
    utmSource: string | null;
    utmMedium: string | null;
    utmCampaign: string | null;
    count: number;
  }[],
): {
  bySource: TrafficSourceAggregated[];
  byCategory: TrafficByCategory[];
  total: number;
} {
  const sourceMap = new Map<string, TrafficSourceAggregated>();
  const categoryMap = new Map<TrafficCategory, number>();
  let total = 0;

  for (const row of rawData) {
    const source = getTrafficSource(row.referrer, row.utmSource, row.utmMedium);
    const key = `${source.category}:${source.name}`;
    total += row.count;

    const existing = sourceMap.get(key);
    if (existing) {
      existing.count += row.count;
    } else {
      sourceMap.set(key, {
        name: source.name,
        category: source.category,
        categoryLabel: CATEGORY_LABELS[source.category],
        color: CATEGORY_COLORS[source.category],
        count: row.count,
      });
    }

    categoryMap.set(
      source.category,
      (categoryMap.get(source.category) || 0) + row.count,
    );
  }

  const bySource = Array.from(sourceMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const byCategory = Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      label: CATEGORY_LABELS[category],
      color: CATEGORY_COLORS[category],
      count,
      percentage: total > 0 ? Math.round((count / total) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return { bySource, byCategory, total };
}

export const analyticsService = {
  async trackEvent(input: unknown, userAgent: string | null) {
    const data = trackEventSchema.parse(input) as TrackEventInput;
    const { device, browser, os } = parseUserAgent(userAgent);

    if (data.type === "pageview") {
      await analyticsRepository.trackPageView({
        path: data.path,
        referrer: data.referrer,
        userAgent,
        device,
        browser,
        os,
        sessionId: data.sessionId,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
      });
    } else if (data.type === "click") {
      await analyticsRepository.trackClick({
        linkId: data.linkId || null,
        path: data.path,
        targetUrl: data.targetUrl || "",
        referrer: data.referrer,
        userAgent,
        sessionId: data.sessionId,
      });
    }
  },

  async getDashboardStats() {
    const now = new Date();

    const last7Days = new Date(now);
    last7Days.setDate(last7Days.getDate() - 7);

    const last14Days = new Date(now);
    last14Days.setDate(last14Days.getDate() - 14);

    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const [
      formCounts,
      currentLeads,
      previousLeads,
      currentViewStats,
      previousViews,
      currentClicks,
      previousClicks,
      todayViews,
      todayLeads,
      loginAttempts,
      recentLeads,
      recentLogins,
      topLinks,
      viewsByDay,
      leadsByDay,
    ] = await Promise.all([
      analyticsRepository.getFormCounts(),
      analyticsRepository.getLeadCount(last7Days),
      analyticsRepository.getLeadCount(last14Days, last7Days),
      analyticsRepository.getViewStats(last7Days),
      analyticsRepository.getViewStats(last14Days, last7Days),
      analyticsRepository.getClickCount(last7Days),
      analyticsRepository.getClickCount(last14Days, last7Days),
      analyticsRepository.getViewStats(today),
      analyticsRepository.getLeadCount(today),
      analyticsRepository.getLoginAttemptCount(last7Days),
      analyticsRepository.getRecentLeads(5),
      analyticsRepository.getRecentLogins(5),
      analyticsRepository.getTopLinks(last7Days, 5),
      analyticsRepository.getViewsByDay(last7Days),
      analyticsRepository.getLeadsByDay(last7Days),
    ]);

    const conversionRate =
      currentViewStats.count > 0
        ? Math.round((currentLeads / currentViewStats.count) * 10000) / 100
        : 0;

    const clickRate =
      currentViewStats.count > 0
        ? Math.round((currentClicks / currentViewStats.count) * 10000) / 100
        : 0;

    return {
      period: "7 derniers jours",

      overview: {
        totalForms: formCounts.total,
        activeForms: formCounts.active,
        inactiveForms: formCounts.total - formCounts.active,
        totalLeads: currentLeads,
        totalViews: currentViewStats.count,
        totalClicks: currentClicks,
        uniqueSessions: currentViewStats.uniqueSessions,
        conversionRate,
        clickRate,
        loginAttempts,
      },

      today: {
        views: todayViews.count,
        leads: todayLeads,
      },

      comparison: {
        leadsChange: calculateChange(currentLeads, previousLeads),
        viewsChange: calculateChange(
          currentViewStats.count,
          previousViews.count,
        ),
        clicksChange: calculateChange(currentClicks, previousClicks),
        previousLeads,
        previousViews: previousViews.count,
        previousClicks,
      },

      charts: {
        viewsLast7Days: viewsByDay,
        leadsLast7Days: leadsByDay,
      },

      topLinks: topLinks.map((link) => ({
        id: link.id,
        title: link.title,
        clicks: link.clicks,
      })),

      recentActivity: {
        leads: recentLeads.map((lead) => ({
          ...lead,
          relativeTime: lead.createdAt
            ? formatRelativeDate(lead.createdAt)
            : "-",
        })),
        logins: recentLogins.map((login) => ({
          ...login,
          relativeTime: login.createdAt
            ? formatRelativeDate(login.createdAt)
            : "-",
        })),
      },
    };
  },

  async getDetailedStats(params: {
    from?: string;
    to?: string;
    days?: number;
  }) {
    const { from, to, days: daysParam } = params;

    let startDate: Date;
    let endDate: Date;
    let days: number;

    if (from && to) {
      startDate = new Date(from);
      endDate = new Date(to);
      days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
    } else {
      days = daysParam || 30;
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
    }

    const previousPeriodEnd = new Date(startDate);
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setDate(previousPeriodStart.getDate() - days);

    const [
      overviewStats,
      previousViews,
      previousLeadsCount,
      previousClicksCount,
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
      totalClicks,
      totalLeads,
      activeForms,
      totalLoginAttempts,
      rawTrafficSources,
    ] = await Promise.all([
      analyticsRepository.getViewStats(startDate, endDate),
      analyticsRepository.getViewStats(previousPeriodStart, previousPeriodEnd),
      analyticsRepository.getLeadCount(previousPeriodStart, previousPeriodEnd),
      analyticsRepository.getClickCount(previousPeriodStart, previousPeriodEnd),
      analyticsRepository.getViewsByPage(startDate, endDate),
      analyticsRepository.getViewsByDevice(startDate, endDate),
      analyticsRepository.getViewsByBrowser(startDate, endDate),
      analyticsRepository.getViewsByCountry(startDate, endDate),
      analyticsRepository.getViewsByReferrer(startDate, endDate),
      analyticsRepository.getViewsByHour(startDate, endDate),
      analyticsRepository.getViewsByDayOfWeek(startDate, endDate),
      analyticsRepository.getTopLinksWithUrl(startDate, endDate),
      analyticsRepository.getViewsOverTime(startDate, endDate),
      analyticsRepository.getLeadsOverTime(startDate, endDate),
      analyticsRepository.getRecentLeadsInRange(startDate, endDate),
      analyticsRepository.getRecentLoginsInRange(startDate, endDate),
      analyticsRepository.getUtmStats(startDate, endDate),
      analyticsRepository.getClickCount(startDate, endDate),
      analyticsRepository.getLeadCount(startDate, endDate),
      analyticsRepository.getActiveFormCount(),
      analyticsRepository.getLoginAttemptCountInRange(startDate, endDate),
      analyticsRepository.getRawTrafficSources(startDate, endDate),
    ]);

    const currentViewsCount = overviewStats.count;
    const currentLeadsCount = totalLeads;
    const currentClicksCount = totalClicks;

    const viewsChange =
      previousViews.count > 0
        ? Math.round(
            ((currentViewsCount - previousViews.count) / previousViews.count) *
              100,
          )
        : 0;
    const leadsChange =
      previousLeadsCount > 0
        ? Math.round(
            ((currentLeadsCount - previousLeadsCount) / previousLeadsCount) *
              100,
          )
        : 0;
    const clicksChange =
      previousClicksCount > 0
        ? Math.round(
            ((currentClicksCount - previousClicksCount) / previousClicksCount) *
              100,
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
      overviewStats.uniqueSessions > 0
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

    return {
      period: {
        from: startDate.toISOString(),
        to: endDate.toISOString(),
        days,
      },
      overview: {
        totalViews: currentViewsCount,
        totalClicks: currentClicksCount,
        totalLeads: currentLeadsCount,
        activeForms,
        totalLoginAttempts,
        uniqueSessions: overviewStats.uniqueSessions,
        conversionRate,
        clickRate,
        avgViewsPerSession,
      },
      comparison: {
        viewsChange,
        leadsChange,
        clicksChange,
        previousViews: previousViews.count,
        previousLeads: previousLeadsCount,
        previousClicks: previousClicksCount,
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
      viewsByUtmSource: utmStats.sources,
      viewsByUtmMedium: utmStats.mediums,
      viewsByUtmCampaign: utmStats.campaigns,
      topLinks,
      viewsOverTime,
      leadsOverTime,
      recentLeads,
      recentLoginAttempts,
      trafficSources: aggregateTrafficSources(rawTrafficSources),
    };
  },
};
