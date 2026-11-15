"use client";

import { Button } from "@/components/ui/button";
import type { McpTraffic } from "@/src/features/admin-agents/hooks/use-mcp-stats";
import { formatHidden } from "./agents-format";
import { useAgents } from "./agents-provider";

const TRAFFIC_OPTIONS: { value: McpTraffic; label: string }[] = [
  { value: "agents", label: "Agents seulement" },
  { value: "sans-scanners", label: "Sans scanners" },
  { value: "tout", label: "Tout" },
];

export function AgentsTrafficFilter() {
  const { traffic, setTraffic, stats } = useAgents();
  const hidden = stats?.hidden;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-[var(--admin-text-muted)]">Trafic</span>
      {TRAFFIC_OPTIONS.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={option.value === traffic ? "default" : "outline"}
          aria-pressed={option.value === traffic}
          onClick={() => setTraffic(option.value)}
        >
          {option.label}
        </Button>
      ))}
      {hidden && hidden.total > 0 && (
        <Button
          type="button"
          size="sm"
          variant="link"
          onClick={() => setTraffic("tout")}
        >
          {formatHidden(hidden.total, hidden.byCategory)}
        </Button>
      )}
    </div>
  );
}
