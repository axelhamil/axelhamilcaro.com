"use client";

import { RefreshCw } from "lucide-react";
import { useAgents } from "./agents-provider";

export function AgentsHeader() {
  const { isRefreshing, refresh } = useAgents();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[var(--admin-text)]">Agents</h1>
        <p className="text-sm text-[var(--admin-text-muted-foreground)]">
          Trafic MCP des 7 derniers jours
        </p>
      </div>
      <button
        type="button"
        onClick={() => refresh()}
        className="p-2 rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-muted-foreground)] hover:text-[var(--admin-text)]"
      >
        <RefreshCw
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </button>
    </div>
  );
}
