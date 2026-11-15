"use client";

import { formatAbsolute, formatRelative } from "./agents-format";
import { useAgents } from "./agents-provider";

export interface RankedListRow {
  key: string;
  label: string;
  count: number;
  lastAt: string | null;
}

export interface RankedListProps {
  title: string;
  rows: RankedListRow[];
  total: number;
}

function RankedList({ title, rows, total }: RankedListProps) {
  return (
    <section className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--admin-text)]">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[var(--admin-text-muted)]">
          Aucun appel sur la période.
        </p>
      ) : (
        <ul className="space-y-2.5 text-sm">
          {rows.map((row) => (
            <li key={row.key} className="space-y-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[var(--admin-text)]">
                  {row.label}
                </span>
                <span className="shrink-0 tabular-nums text-[var(--admin-text)]">
                  {row.count}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--admin-text-muted)]">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-[var(--admin-bg-elevated)]">
                  <span
                    className="block h-full rounded-full bg-[var(--admin-accent)]/60"
                    style={{
                      width: `${(row.count / Math.max(total, 1)) * 100}%`,
                    }}
                  />
                </span>
                <time
                  dateTime={row.lastAt ?? undefined}
                  title={formatAbsolute(row.lastAt)}
                >
                  {formatRelative(row.lastAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function toRows(
  rows: Array<{ name: string | null; count: number; lastAt: string | null }>,
) {
  return rows.map((row) => ({
    key: row.name ?? "(sans nom)",
    label: row.name ?? "(sans nom)",
    count: row.count,
    lastAt: row.lastAt,
  }));
}

function sum(rows: Array<{ count: number }>) {
  return rows.reduce((total, row) => total + row.count, 0);
}

export function AgentsTopLists() {
  const { stats, isLoading, isEmpty } = useAgents();
  if (isLoading || !stats || isEmpty) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <RankedList
        title="Origines"
        rows={stats.origins.map((origin) => ({
          key: origin.id,
          label: origin.label,
          count: origin.count,
          lastAt: origin.lastAt,
        }))}
        total={stats.calls}
      />
      <RankedList
        title="Top tools"
        rows={toRows(stats.topTools)}
        total={sum(stats.topTools)}
      />
      <RankedList
        title="Top resources"
        rows={toRows(stats.topResources)}
        total={sum(stats.topResources)}
      />
    </div>
  );
}
