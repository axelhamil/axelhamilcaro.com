"use client";

import { Bot, Radio, Users } from "lucide-react";
import { AdminStatCard } from "@/src/features/admin/components/shared/admin-stat-card";
import { useAgents } from "./agents-provider";

export function AgentsOverview() {
  const { stats, isLoading } = useAgents();

  if (isLoading || !stats) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <AdminStatCard
        title="Appels MCP"
        value={stats.calls}
        icon={Radio}
        color="cyan"
      />
      <AdminStatCard
        title="Clients distincts"
        value={stats.distinctClients}
        icon={Bot}
        color="purple"
      />
      <AdminStatCard
        title="Leads MCP"
        value={stats.leads.mcp}
        icon={Users}
        color="green"
      />
    </div>
  );
}
