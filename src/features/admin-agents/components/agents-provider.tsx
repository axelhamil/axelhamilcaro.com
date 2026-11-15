"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import {
  type McpEventFilters,
  type McpEventRow,
  useMcpEvents,
} from "@/src/features/admin-agents/hooks/use-mcp-events";
import {
  type McpStats,
  type McpTraffic,
  useMcpStats,
} from "@/src/features/admin-agents/hooks/use-mcp-stats";

interface AgentsContextValue {
  days: number;
  setDays: (days: number) => void;
  traffic: McpTraffic;
  setTraffic: (traffic: McpTraffic) => void;
  stats: McpStats | undefined;
  isLoading: boolean;
  isEmpty: boolean;
  isRefreshing: boolean;
  refresh: () => void;
  filters: McpEventFilters;
  setFilter: <K extends keyof McpEventFilters>(
    key: K,
    value: McpEventFilters[K],
  ) => void;
  clearFilters: () => void;
  events: McpEventRow[];
  eventsLoading: boolean;
  eventsLoadingMore: boolean;
  hasMoreEvents: boolean;
  loadMoreEvents: () => void;
}

const AgentsContext = createContext<AgentsContextValue | null>(null);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState(7);
  const [traffic, setTraffic] = useState<McpTraffic>("agents");
  const [filters, setFilters] = useState<McpEventFilters>({});
  const overview = useMcpStats(days, traffic);
  const timeline = useMcpEvents(days, traffic, filters);

  const setFilter: AgentsContextValue["setFilter"] = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const refresh = () => {
    overview.refresh();
    timeline.refresh();
  };

  return (
    <AgentsContext.Provider
      value={{
        days,
        setDays,
        traffic,
        setTraffic,
        stats: overview.stats,
        isLoading: overview.isLoading,
        isEmpty: overview.stats?.calls === 0,
        isRefreshing: overview.isRefreshing,
        refresh,
        filters,
        setFilter,
        clearFilters: () => setFilters({}),
        events: timeline.events,
        eventsLoading: timeline.isLoading,
        eventsLoadingMore: timeline.isLoadingMore,
        hasMoreEvents: timeline.hasMore,
        loadMoreEvents: timeline.loadMore,
      }}
    >
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const ctx = useContext(AgentsContext);
  if (!ctx) throw new Error("useAgents must be used within AgentsProvider");
  return ctx;
}
