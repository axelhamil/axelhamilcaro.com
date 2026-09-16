import useSWR from "swr";
import { fetcher } from "@/src/shared/api/swr-config";

export type McpStats = {
  days: number;
  calls: number;
  distinctClients: number;
  topTools: Array<{ name: string | null; count: number }>;
  topResources: Array<{ name: string | null; count: number }>;
  recent: Array<{
    id: string;
    method: string;
    name: string | null;
    clientName: string | null;
    ok: boolean;
    durationMs: number | null;
    createdAt: string | null;
  }>;
  leads: {
    mcp: number;
    webForms: number;
    contactModalExcluded: string;
  };
};

export function useMcpStats(days = 7) {
  const { data, error, isLoading, mutate, isValidating } = useSWR<McpStats>(
    `/api/admin/mcp-stats?days=${days}`,
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
