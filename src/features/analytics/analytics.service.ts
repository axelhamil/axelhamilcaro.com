import { formatRelativeDate } from "@/src/lib/utils/date.utils";
import { analyticsRepository } from "./analytics.repository";

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export const analyticsService = {
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
};
