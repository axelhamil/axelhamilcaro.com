"use client";

import {
  AlertTriangle,
  Bot,
  Clock,
  Fingerprint,
  Gauge,
  Radio,
  Timer,
  Users,
} from "lucide-react";
import { AdminStatCard } from "@/src/features/admin/components/shared/admin-stat-card";
import {
  formatAbsolute,
  formatDuration,
  formatRelative,
} from "./agents-format";
import { useAgents } from "./agents-provider";

const percentFormat = new Intl.NumberFormat("fr-FR", {
  style: "percent",
  maximumFractionDigits: 1,
});

export function AgentsOverview() {
  const { stats, isLoading, isEmpty } = useAgents();

  if (isLoading || !stats || isEmpty) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AdminStatCard
        title="Appels MCP"
        value={stats.calls}
        icon={Radio}
        color="cyan"
      />
      <AdminStatCard
        title="Taux d'erreur"
        value={percentFormat.format(stats.errorRate)}
        icon={AlertTriangle}
        color="red"
        tooltip={`${stats.errors} appels en erreur sur ${stats.calls}`}
      />
      <AdminStatCard
        title="Durée médiane"
        value={formatDuration(stats.medianMs)}
        icon={Timer}
        color="blue"
      />
      <AdminStatCard
        title="Durée p95"
        value={formatDuration(stats.p95Ms)}
        icon={Gauge}
        color="amber"
        tooltip="95 % des appels répondent plus vite que cette durée"
      />
      <AdminStatCard
        title="Origines distinctes"
        value={stats.distinctOrigins}
        icon={Bot}
        color="purple"
        tooltip="Déduites du user-agent : ChatGPT, Claude, Cursor, scripts, navigateurs"
      />
      <AdminStatCard
        title="Visiteurs distincts"
        value={stats.distinctVisitors}
        icon={Fingerprint}
        color="pink"
        tooltip="Empreinte d'IP hachée, renouvelée chaque jour. Les appels plus anciens n'en ont pas."
      />
      <AdminStatCard
        title="Dernière activité"
        value={formatRelative(stats.lastAt)}
        icon={Clock}
        color="green"
        tooltip={formatAbsolute(stats.lastAt)}
      />
      <AdminStatCard
        title="Leads MCP"
        value={stats.leads.mcp}
        icon={Users}
        color="green"
        tooltip={`${stats.leads.webForms} leads par formulaire web sur la même période`}
      />
    </div>
  );
}
