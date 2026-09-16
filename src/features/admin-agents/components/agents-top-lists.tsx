"use client";

import { useAgents } from "./agents-provider";

function RankedList({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ name: string | null; count: number }>;
}) {
  return (
    <div className="rounded-lg border border-[var(--admin-border)] p-4">
      <h2 className="mb-3 text-sm font-medium text-[var(--admin-text)]">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--admin-text-muted-foreground)]">
          Aucun appel pour l'instant.
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {rows.map((row) => (
            <li
              key={`${row.name}-${row.count}`}
              className="flex justify-between gap-4 text-[var(--admin-text)]"
            >
              <span className="truncate">{row.name ?? "(sans nom)"}</span>
              <span className="text-[var(--admin-text-muted-foreground)]">
                {row.count}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AgentsTopLists() {
  const { stats, isLoading } = useAgents();
  if (isLoading || !stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <RankedList title="Top tools" rows={stats.topTools} />
      <RankedList title="Top resources" rows={stats.topResources} />
    </div>
  );
}
