import useSWRInfinite from "swr/infinite";
import type {
  McpOriginCategory,
  McpTraffic,
} from "@/src/features/admin-agents/hooks/use-mcp-stats";
import { fetcher } from "@/src/shared/api/swr-config";

export interface McpEventRow {
  id: string;
  createdAt: string | null;
  method: string;
  name: string | null;
  clientName: string | null;
  clientVersion: string | null;
  clientInferred: boolean;
  origin: { id: string; label: string; category: McpOriginCategory };
  userAgent: string | null;
  ok: boolean;
  durationMs: number | null;
  errorMessage: string | null;
  country: string | null;
  city: string | null;
  visit: string | null;
  sessionId: string | null;
  toolArguments: Record<string, string | null> | null;
  referer: string | null;
}

interface McpEventsPage {
  events: McpEventRow[];
  nextCursor: string | null;
}

export type McpEventStatus = "ok" | "error";

export interface McpEventFilters {
  method?: string;
  status?: McpEventStatus;
  origin?: string;
  visit?: string;
}

function pageKey(days: number, traffic: McpTraffic, filters: McpEventFilters) {
  return (index: number, previous: McpEventsPage | null) => {
    if (previous && !previous.nextCursor) return null;

    const params = new URLSearchParams({ days: String(days), traffic });
    for (const [key, value] of Object.entries(filters))
      if (value) params.set(key, value);
    if (index > 0 && previous?.nextCursor)
      params.set("cursor", previous.nextCursor);

    return `/api/admin/mcp-stats/events?${params}`;
  };
}

export function useMcpEvents(
  days: number,
  traffic: McpTraffic,
  filters: McpEventFilters,
) {
  const { data, error, isLoading, isValidating, size, setSize, mutate } =
    useSWRInfinite<McpEventsPage>(pageKey(days, traffic, filters), fetcher, {
      revalidateOnFocus: false,
      revalidateFirstPage: false,
    });

  const events = data?.flatMap((page) => page.events) ?? [];
  const hasMore = Boolean(data?.at(-1)?.nextCursor);

  return {
    events,
    error,
    isLoading,
    isLoadingMore: isValidating && size > (data?.length ?? 0),
    hasMore,
    loadMore: () => {
      void setSize(size + 1);
    },
    refresh: () => mutate(),
  };
}
