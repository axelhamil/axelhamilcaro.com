"use client";

import { Button } from "@/components/ui/button";
import type { McpEventRow } from "@/src/features/admin-agents/hooks/use-mcp-events";
import { formatAbsolute } from "./agents-format";

export interface AgentsEventDetailProps {
  event: McpEventRow;
  onShowVisit: (visit: string) => void;
}

function describeArguments(args: McpEventRow["toolArguments"]) {
  if (!args) return null;

  return Object.entries(args)
    .map(([name, value]) => (value === null ? name : `${name} = ${value}`))
    .join(", ");
}

export function AgentsEventDetail({
  event,
  onShowVisit,
}: AgentsEventDetailProps) {
  const details: [string, string | null][] = [
    ["Date exacte", formatAbsolute(event.createdAt)],
    ["User-agent", event.userAgent],
    [
      "Client déclaré",
      event.clientName
        ? `${event.clientName} ${event.clientVersion ?? ""}${event.clientInferred ? " (donné à initialize dans la même visite)" : ""}`
        : null,
    ],
    ["Arguments", describeArguments(event.toolArguments)],
    ["Erreur", event.errorMessage],
    ["Session MCP", event.sessionId],
    ["Referer", event.referer],
  ];

  return (
    <div className="space-y-3">
      <dl className="grid gap-x-6 gap-y-2 text-xs sm:grid-cols-[max-content_1fr]">
        {details.map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-[var(--admin-text-muted)]">{label}</dt>
            <dd className="break-all text-[var(--admin-text)]">
              {value ?? "non capté"}
            </dd>
          </div>
        ))}
      </dl>
      {event.toolArguments && (
        <p className="text-xs text-[var(--admin-text-muted)]">
          Seuls les identifiants publics du site sont conservés en clair. Les
          champs libres ne gardent que leur nom.
        </p>
      )}
      {event.visit && (
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => event.visit && onShowVisit(event.visit)}
        >
          Voir tous les appels de cette visite
        </Button>
      )}
    </div>
  );
}
