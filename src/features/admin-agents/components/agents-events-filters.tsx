"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { McpEventStatus } from "@/src/features/admin-agents/hooks/use-mcp-events";
import { useAgents } from "./agents-provider";

const ALL = "all";

export interface FilterSelectProps {
  label: string;
  value: string | undefined;
  allLabel: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string | undefined) => void;
}

function FilterSelect({
  label,
  value,
  allLabel,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <Select
      value={value ?? ALL}
      onValueChange={(next) => onChange(next === ALL ? undefined : next)}
    >
      <SelectTrigger size="sm" aria-label={label} className="min-w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function isStatus(value: string | undefined): value is McpEventStatus {
  return value === "ok" || value === "error";
}

export function AgentsEventsFilters() {
  const { stats, filters, setFilter, clearFilters } = useAgents();
  const hasFilter = Object.values(filters).some(Boolean);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Méthode"
        value={filters.method}
        allLabel="Toutes les méthodes"
        options={(stats?.methods ?? []).map(({ method, count }) => ({
          value: method,
          label: `${method} (${count})`,
        }))}
        onChange={(method) => setFilter("method", method)}
      />
      <FilterSelect
        label="Statut"
        value={filters.status}
        allLabel="Tous les statuts"
        options={[
          { value: "ok", label: "Réussis" },
          { value: "error", label: "En erreur" },
        ]}
        onChange={(status) =>
          setFilter("status", isStatus(status) ? status : undefined)
        }
      />
      <FilterSelect
        label="Origine"
        value={filters.origin}
        allLabel="Toutes les origines"
        options={(stats?.origins ?? []).map((origin) => ({
          value: origin.id,
          label: `${origin.label} (${origin.count})`,
        }))}
        onChange={(origin) => setFilter("origin", origin)}
      />
      {filters.visit && (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() => setFilter("visit", undefined)}
        >
          Visite {filters.visit.slice(0, 8)}
          <X />
        </Button>
      )}
      {hasFilter && (
        <Button type="button" size="sm" variant="ghost" onClick={clearFilters}>
          Effacer les filtres
        </Button>
      )}
    </div>
  );
}
