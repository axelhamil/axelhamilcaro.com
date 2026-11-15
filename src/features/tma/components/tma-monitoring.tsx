import { Activity, Bell, ExternalLink, Gauge, ScrollText } from "lucide-react";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { TMA_MONITORING_TOOLS } from "../lib/tma-data";
import { TmaSectionEntete } from "./tma-section-entete";

const ICONS = [Bell, Activity, ScrollText, Gauge] as const;

export function TmaMonitoring() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        badge={{ label: "Premium uniquement", tone: "premium" }}
        eyebrow="// monitoring_premium()"
        title="Outils de monitoring inclus sur PREMIUM."
        intro="Setup, configuration des alertes et intervention sur incident compris dans tes 10h mensuelles. Les outils t'alertent (et m'alertent) avant tes utilisateurs ; les incidents sont documentés dans le reporting mensuel."
      />

      <ul className="grille-cartes svc-grille-2">
        {TMA_MONITORING_TOOLS.map((tool, index) => {
          const Icon = ICONS[index % ICONS.length];

          return (
            <li
              key={tool.name}
              className="svc-carte etiquette etiquette-carte etiquette-jaune"
            >
              <div className="flex items-start gap-4">
                {Icon ? (
                  <span className="svc-picto" aria-hidden="true">
                    <Icon className="w-5 h-5" />
                  </span>
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <h3 className="svc-carte-titre">{tool.name}</h3>
                  <p className="svc-meta">
                    <BrandText text={tool.tagline} />
                  </p>
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link shrink-0"
                  aria-label={`Site officiel ${tool.name}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="svc-texte">
                <BrandText text={tool.body} />
              </p>
            </li>
          );
        })}
      </ul>

      <div className="tma-souverainete etiquette">
        <p className="svc-carte-titre">Souveraineté des données</p>
        <p className="svc-texte">
          Les outils sont provisionnés à ton nom. Tu crées les comptes en 5
          minutes, tu m'invites en admin technique, je configure tout. Les coûts
          restent à ta charge uniquement en cas de dépassement des free tiers
          (≈26$/mois sur Sentry au-delà du plan gratuit). À la résiliation, tu
          gardes tes outils, ton historique et tes dashboards : aucune
          dépendance à mon infrastructure.
        </p>
      </div>
    </section>
  );
}
