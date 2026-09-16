"use client";

import { useAgents } from "./agents-provider";

export function AgentsLeads() {
  const { stats, isLoading } = useAgents();
  if (isLoading || !stats) return null;

  return (
    <div className="rounded-lg border border-[var(--admin-border)] p-4 space-y-2">
      <h2 className="text-sm font-medium text-[var(--admin-text)]">
        Leads agentiques vs formulaires web
      </h2>
      <p className="text-sm text-[var(--admin-text)]">
        MCP : {stats.leads.mcp} · Formulaires web : {stats.leads.webForms}
      </p>
      <p className="text-xs text-[var(--admin-text-muted-foreground)]">
        {stats.leads.contactModalExcluded}
      </p>
    </div>
  );
}
