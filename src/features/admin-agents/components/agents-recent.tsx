"use client";

import { useAgents } from "./agents-provider";

export function AgentsRecent() {
  const { stats, isLoading } = useAgents();
  if (isLoading || !stats) return null;

  return (
    <div className="rounded-lg border border-[var(--admin-border)] p-4">
      <h2 className="mb-3 text-sm font-medium text-[var(--admin-text)]">
        Activité récente
      </h2>
      {stats.recent.length === 0 ? (
        <p className="text-sm text-[var(--admin-text-muted-foreground)]">
          Aucun événement.
        </p>
      ) : (
        <ul className="space-y-2 text-sm text-[var(--admin-text)]">
          {stats.recent.map((event) => (
            <li key={event.id} className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="text-[var(--admin-text-muted-foreground)]">
                {event.ok ? "ok" : "err"}
              </span>
              <span>{event.method}</span>
              <span className="truncate">{event.name ?? "—"}</span>
              <span className="text-[var(--admin-text-muted-foreground)]">
                {event.clientName ?? "unknown"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
