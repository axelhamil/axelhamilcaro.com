"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAgents } from "./agents-provider";

const PERIODS = [
  { days: 1, label: "24 h" },
  { days: 7, label: "7 j" },
  { days: 30, label: "30 j" },
];

export function AgentsHeader() {
  const { days, setDays, isRefreshing, refresh } = useAgents();
  const period = PERIODS.find((option) => option.days === days);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[var(--admin-text)]">Agents</h1>
        <p className="text-sm text-[var(--admin-text-muted)]">
          Trafic du serveur MCP public, {period?.label ?? `${days} j`}, heure de
          Paris
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {PERIODS.map((option) => (
            <Button
              key={option.days}
              type="button"
              size="sm"
              variant={option.days === days ? "default" : "outline"}
              aria-pressed={option.days === days}
              onClick={() => setDays(option.days)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          aria-label="Rafraîchir"
          onClick={refresh}
        >
          <RefreshCw className={isRefreshing ? "animate-spin" : undefined} />
        </Button>
      </div>
    </div>
  );
}
