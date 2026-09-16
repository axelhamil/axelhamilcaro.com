"use client";

import { createContext, type ReactNode, useContext } from "react";
import {
  type McpStats,
  useMcpStats,
} from "@/src/features/admin-agents/hooks/use-mcp-stats";

type AgentsContextValue = {
  stats: McpStats | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: () => void;
};

const AgentsContext = createContext<AgentsContextValue | null>(null);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const { stats, isLoading, isRefreshing, refresh } = useMcpStats(7);

  return (
    <AgentsContext.Provider value={{ stats, isLoading, isRefreshing, refresh }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const ctx = useContext(AgentsContext);
  if (!ctx) throw new Error("useAgents must be used within AgentsProvider");
  return ctx;
}
