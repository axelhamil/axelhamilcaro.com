"use client";

import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { McpEventRow } from "@/src/features/admin-agents/hooks/use-mcp-events";
import { AgentsEventDetail } from "./agents-event-detail";
import { AgentsEventsFilters } from "./agents-events-filters";
import {
  categoryName,
  formatAbsolute,
  formatDuration,
  formatPlace,
  formatRelative,
} from "./agents-format";
import { useAgents } from "./agents-provider";

const COLUMNS = [
  "Quand",
  "Appel",
  "Client",
  "Origine",
  "Lieu",
  "Durée",
  "Statut",
];

function clientLabel(event: McpEventRow) {
  if (!event.clientName) return "-";
  return [event.clientName, event.clientVersion].filter(Boolean).join(" ");
}

export function AgentsEventsTable() {
  const {
    events,
    eventsLoading,
    eventsLoadingMore,
    hasMoreEvents,
    loadMoreEvents,
    setFilter,
    isEmpty,
  } = useAgents();
  const [openId, setOpenId] = useState<string | null>(null);

  if (isEmpty) return null;

  return (
    <section className="space-y-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-sm font-semibold text-[var(--admin-text)]">
          Activité récente
        </h2>
        <AgentsEventsFilters />
      </div>

      {eventsLoading ? (
        <Loader2 className="mx-auto my-8 h-6 w-6 animate-spin text-[var(--admin-accent)]" />
      ) : events.length === 0 ? (
        <p className="py-8 text-center text-sm text-[var(--admin-text-muted)]">
          Aucun appel ne correspond à ces filtres sur la période.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <span className="sr-only">Détail</span>
              </TableHead>
              {COLUMNS.map((column) => (
                <TableHead
                  key={column}
                  className="text-xs text-[var(--admin-text-muted)]"
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => {
              const isOpen = openId === event.id;

              return (
                <Fragment key={event.id}>
                  <TableRow>
                    <TableCell>
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="ghost"
                        aria-expanded={isOpen}
                        aria-label="Afficher le détail de l'appel"
                        onClick={() => setOpenId(isOpen ? null : event.id)}
                      >
                        {isOpen ? <ChevronDown /> : <ChevronRight />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <time
                        dateTime={event.createdAt ?? undefined}
                        className="block text-[var(--admin-text)]"
                      >
                        {formatRelative(event.createdAt)}
                      </time>
                      <span className="block text-xs text-[var(--admin-text-muted)]">
                        {formatAbsolute(event.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-64">
                      {event.name && (
                        <span className="block truncate text-[var(--admin-text)]">
                          {event.name}
                        </span>
                      )}
                      <span className="block font-mono text-xs text-[var(--admin-text-muted)]">
                        {event.method}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="block text-[var(--admin-text)]">
                        {clientLabel(event)}
                      </span>
                      {event.clientInferred && (
                        <span className="block text-xs text-[var(--admin-text-muted)]">
                          via initialize
                        </span>
                      )}
                    </TableCell>
                    <TableCell title={event.userAgent ?? "Aucun user-agent"}>
                      <span className="text-[var(--admin-text)]">
                        {event.origin.label}
                      </span>
                      <span className="admin-badge ml-2">
                        {categoryName(event.origin.category)}
                      </span>
                    </TableCell>
                    <TableCell className="text-[var(--admin-text-muted)]">
                      {formatPlace(event.city, event.country)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-[var(--admin-text)]">
                      {formatDuration(event.durationMs)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          event.ok
                            ? "admin-badge admin-badge-success"
                            : "admin-badge admin-badge-destructive"
                        }
                        title={event.errorMessage ?? undefined}
                      >
                        {event.ok ? "ok" : "erreur"}
                      </span>
                    </TableCell>
                  </TableRow>
                  {isOpen && (
                    <TableRow>
                      <TableCell
                        colSpan={COLUMNS.length + 1}
                        className="whitespace-normal bg-[var(--admin-bg)]"
                      >
                        <AgentsEventDetail
                          event={event}
                          onShowVisit={(visit) => setFilter("visit", visit)}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      )}

      {hasMoreEvents && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={eventsLoadingMore}
          onClick={loadMoreEvents}
        >
          {eventsLoadingMore ? "Chargement…" : "Charger plus"}
        </Button>
      )}
    </section>
  );
}
