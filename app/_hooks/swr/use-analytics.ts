import useSWR from "swr";
import { fetcher } from "@/app/_lib/swr-config";

export type TrafficCategory =
  | "direct"
  | "organic_search"
  | "social"
  | "email"
  | "paid"
  | "referral";

export interface TrafficSourceAggregated {
  name: string;
  category: TrafficCategory;
  categoryLabel: string;
  color: string;
  count: number;
}

export interface TrafficByCategory {
  category: TrafficCategory;
  label: string;
  color: string;
  count: number;
  percentage: number;
}

export interface AnalyticsData {
  period: {
    from: string;
    to: string;
    days: number;
  };
  overview: {
    totalViews: number;
    totalClicks: number;
    totalLeads: number;
    activeForms: number;
    totalLoginAttempts: number;
    uniqueSessions: number;
    conversionRate: number;
    clickRate: number;
    avgViewsPerSession: number;
  };
  comparison: {
    viewsChange: number;
    leadsChange: number;
    clicksChange: number;
    previousViews: number;
    previousLeads: number;
    previousClicks: number;
  };
  peakTimes: {
    hour: number;
    hourLabel: string;
    day: number;
    dayLabel: string;
  };
  viewsByPage: Array<{ path: string; count: number }>;
  viewsByDevice: Array<{ device: string; count: number }>;
  viewsByBrowser: Array<{ browser: string; count: number }>;
  viewsByCountry: Array<{ country: string; count: number }>;
  viewsByReferrer: Array<{ referrer: string; count: number }>;
  viewsByHour: Array<{ hour: number; count: number }>;
  viewsByDayOfWeek: Array<{ day: number; dayLabel: string; count: number }>;
  viewsByUtmSource: Array<{ source: string; count: number }>;
  viewsByUtmMedium: Array<{ medium: string; count: number }>;
  viewsByUtmCampaign: Array<{ campaign: string; count: number }>;
  topLinks: Array<{ id: string; title: string; url: string; clicks: number }>;
  viewsOverTime: Array<{ date: string; count: number }>;
  leadsOverTime: Array<{ date: string; count: number }>;
  recentLeads: Array<{
    id: string;
    firstName: string;
    email: string;
    formTitle: string;
    createdAt: string;
  }>;
  recentLoginAttempts: Array<{
    id: string;
    githubUsername: string | null;
    githubEmail: string | null;
    githubAvatar: string | null;
    ipAddress: string | null;
    createdAt: string | null;
  }>;
  trafficSources: {
    bySource: TrafficSourceAggregated[];
    byCategory: TrafficByCategory[];
    total: number;
  };
}

export type DateRange = {
  from: Date;
  to: Date;
} | null;

export type RefreshInterval = 0 | 5000 | 10000 | 15000 | 30000;

export function useAnalytics(
  options: {
    days?: number;
    dateRange?: DateRange;
    refreshInterval?: RefreshInterval;
  } = {},
) {
  const { days = 30, dateRange, refreshInterval = 0 } = options;

  let url = "/api/analytics/stats";
  if (dateRange) {
    url += `?from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`;
  } else {
    url += `?days=${days}`;
  }

  const { data, error, isLoading, mutate, isValidating } =
    useSWR<AnalyticsData>(url, fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      refreshInterval: refreshInterval,
    });

  return {
    analytics: data,
    isLoading,
    isRefreshing: isValidating && !isLoading,
    error,
    refresh: () => mutate(),
  };
}
