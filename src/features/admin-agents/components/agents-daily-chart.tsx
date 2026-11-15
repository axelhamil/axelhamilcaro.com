"use client";

import { formatDay, formatShortDay } from "./agents-format";
import { useAgents } from "./agents-provider";

const MAX_LABELS = 8;

export function AgentsDailyChart() {
  const { stats, isEmpty } = useAgents();
  if (!stats || isEmpty) return null;

  const days = stats.callsByDay;
  const max = Math.max(...days.map((day) => day.calls), 1);
  const labelEvery = Math.ceil(days.length / MAX_LABELS);

  return (
    <section className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[var(--admin-text)]">
          Appels par jour
        </h2>
        <div className="flex items-center gap-3 text-xs text-[var(--admin-text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[var(--admin-accent)] opacity-60" />
            Appels
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[var(--admin-destructive)]" />
            Erreurs
          </span>
        </div>
      </div>
      <ol className="flex h-28 items-end gap-0.5">
        {days.map((day, index) => {
          const height =
            day.calls > 0 ? Math.max((day.calls / max) * 100, 4) : 1;
          const errorShare = day.calls > 0 ? (day.errors / day.calls) * 100 : 0;
          const label = formatDay(day.day);

          return (
            <li
              key={day.day}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1"
              title={`${label} : ${day.calls} appels, ${day.errors} en erreur`}
            >
              <span
                className="flex w-full flex-col justify-end overflow-hidden rounded-t bg-[var(--admin-accent)]/60 transition-opacity hover:bg-[var(--admin-accent)]"
                style={{ height: `${height}%` }}
              >
                <span
                  className="w-full bg-[var(--admin-destructive)]"
                  style={{ height: `${errorShare}%` }}
                />
              </span>
              <span className="h-3 truncate text-[10px] text-[var(--admin-text-muted)]">
                {index % labelEvery === 0 ? formatShortDay(day.day) : ""}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
