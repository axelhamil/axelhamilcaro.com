import useSWR from "swr";
import { fetcher } from "@/src/shared/api/swr-config";

export interface McpRankedRow {
  name: string | null;
  count: number;
  lastAt: string | null;
}

export type McpTraffic = "agents" | "sans-scanners" | "tout";

export type McpOriginCategory =
  | "agent"
  | "scanner"
  | "outil"
  | "navigateur"
  | "inconnu";

export interface McpOriginRow {
  id: string;
  label: string;
  category: McpOriginCategory;
  count: number;
  lastAt: string | null;
}

export interface McpStats {
  days: number;
  traffic: McpTraffic;
  hidden: {
    total: number;
    byCategory: Array<{ category: McpOriginCategory; count: number }>;
  };
  timeZone: string;
  calls: number;
  errors: number;
  errorRate: number;
  medianMs: number | null;
  p95Ms: number | null;
  lastAt: string | null;
  distinctVisitors: number;
  distinctOrigins: number;
  callsByDay: Array<{ day: string; calls: number; errors: number }>;
  origins: McpOriginRow[];
  methods: Array<{ method: string; count: number }>;
  topTools: McpRankedRow[];
  topResources: McpRankedRow[];
  leads: {
    mcp: number;
    webForms: number;
    contactModalExcluded: string;
  };
}

export function useMcpStats(days: number, traffic: McpTraffic) {
  const { data, error, isLoading, mutate, isValidating } = useSWR<McpStats>(
    `/api/admin/mcp-stats?days=${days}&traffic=${traffic}`,
    fetcher,
    { revalidateOnFocus: false },
  );

  return {
    stats: data,
    isLoading,
    isRefreshing: isValidating && !isLoading,
    error,
    refresh: () => mutate(),
  };
}
