"use client";

import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryName, formatPeriod } from "./agents-format";
import { useAgents } from "./agents-provider";

export function AgentsEmptyState() {
  const { stats, isEmpty, days, setDays, traffic, setTraffic } = useAgents();
  if (!stats || !isEmpty) return null;

  const period = formatPeriod(days);
  const hidden = stats.hidden;
  const sources = hidden.byCategory
    .map(({ category, count }) => `${count} ${categoryName(category, count)}`)
    .join(" et ");
  const onlyNoise = traffic !== "tout" && hidden.total > 0;

  return (
    <section className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] px-6 py-14 text-center">
      <Bot className="h-8 w-8 text-[var(--admin-text-subtle)]" />
      <h2 className="text-lg font-medium text-[var(--admin-text)]">
        {onlyNoise
          ? `Aucun agent IA n'a appelé le serveur MCP sur ${period}`
          : `Aucun appel MCP sur ${period}`}
      </h2>
      <p className="max-w-lg text-sm text-[var(--admin-text-muted)]">
        {onlyNoise
          ? `Les ${hidden.total} appels reçus viennent de ${sources} : tests en ligne de commande et robots qui sondent le serveur. Ils sont masqués pour ne pas gonfler les chiffres.`
          : "Le serveur n'a reçu aucune requête sur cette période. Vérifiez qu'il est bien référencé (/.well-known/mcp.json, llms.txt) ou élargissez la période."}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {onlyNoise && (
          <Button type="button" size="sm" onClick={() => setTraffic("tout")}>
            Voir tout le trafic
          </Button>
        )}
        {days < 30 && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setDays(30)}
          >
            Élargir à 30 jours
          </Button>
        )}
      </div>
    </section>
  );
}
