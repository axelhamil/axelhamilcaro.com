import useSWR from "swr";
import { fetcher } from "@/app/_lib/swr-config";

export interface DashboardData {
  period: string;

  overview: {
    totalForms: number;
    activeForms: number;
    inactiveForms: number;
    totalLeads: number;
    totalViews: number;
    totalClicks: number;
    uniqueSessions: number;
    conversionRate: number;
    clickRate: number;
    loginAttempts: number;
  };

  today: {
    views: number;
    leads: number;
  };

  comparison: {
    leadsChange: number;
    viewsChange: number;
    clicksChange: number;
    previousLeads: number;
    previousViews: number;
    previousClicks: number;
  };

  charts: {
    viewsLast7Days: Array<{ date: string; count: number }>;
    leadsLast7Days: Array<{ date: string; count: number }>;
  };

  topLinks: Array<{
    id: string;
    title: string;
    clicks: number;
  }>;

  recentActivity: {
    leads: Array<{
      id: string;
      firstName: string | null;
      email: string;
      formTitle: string;
      relativeTime: string;
    }>;
    logins: Array<{
      id: string;
      githubUsername: string | null;
      githubAvatar: string | null;
      ipAddress: string | null;
      relativeTime: string;
    }>;
  };
}

export function useDashboard() {
  const { data, error, isLoading, mutate, isValidating } =
    useSWR<DashboardData>("/api/admin/dashboard", fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    });

  return {
    dashboard: data,
    isLoading,
    isRefreshing: isValidating && !isLoading,
    error,
    refresh: () => mutate(),
  };
}
