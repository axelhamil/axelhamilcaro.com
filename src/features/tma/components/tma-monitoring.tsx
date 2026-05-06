import { Activity, Bell, ExternalLink, Gauge, ScrollText } from "lucide-react";
import { TMA_MONITORING_TOOLS } from "../lib/tma-data";

const ICONS = [Bell, Activity, ScrollText, Gauge] as const;

export function TmaMonitoring() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // monitoring_premium()
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Outils de monitoring inclus sur PREMIUM.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Setup, configuration et surveillance compris dans tes 10h
            mensuelles. Tu es alerté avant tes utilisateurs, et tu disposes d'un
            reporting mensuel écrit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {TMA_MONITORING_TOOLS.map((tool, index) => {
            const Icon = ICONS[index] ?? Bell;
            return (
              <article
                key={tool.name}
                className="card p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {tool.name}
                      </h3>
                      <p
                        className="text-xs uppercase tracking-wider text-secondary"
                        style={{ fontFamily: "var(--font-geist-mono)" }}
                      >
                        {tool.tagline}
                      </p>
                    </div>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-accent transition-colors"
                    aria-label={`Site officiel ${tool.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-secondary leading-relaxed">{tool.body}</p>
              </article>
            );
          })}
        </div>

        <div className="card p-6 sm:p-8 border-l-4 border-l-accent">
          <p className="text-primary font-semibold mb-2">
            Souveraineté des données
          </p>
          <p className="text-secondary leading-relaxed">
            Les outils sont provisionnés à ton nom. Tu créés les comptes en 5
            minutes, tu m'invites en admin technique, je configure tout. Les
            coûts restent à ta charge uniquement en cas de dépassement des free
            tiers (≈26$/mois sur Sentry au-delà du plan gratuit). À la
            résiliation, tu gardes tes outils, ton historique et tes dashboards
            : aucune dépendance à mon infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
