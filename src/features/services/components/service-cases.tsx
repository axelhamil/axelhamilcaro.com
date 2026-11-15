import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import type { RelatedCaseSlug } from "../lib/services-data";

const CASE_META: Record<
  RelatedCaseSlug,
  { name: string; description: string }
> = {
  billetterie: {
    name: "Billetterie événementielle",
    description: "Plan 2D/3D + WebSocket temps réel, solo en 1 mois.",
  },
  civitime: {
    name: "Civitime",
    description: "Plateforme RSE B Corp, 4 ans de dev à lead tech, IA RAG.",
  },
  openup: {
    name: "OpenUp",
    description:
      "Projet parallèle dont je suis le fondateur technique : deep links, iOS, Android et web.",
  },
  scormpilot: {
    name: "ScormPilot",
    description: "SaaS e-learning multi-tenant, 5 apps en solo.",
  },
};

interface ServiceCasesProps {
  relatedCases: RelatedCaseSlug[];
}

export function ServiceCases({ relatedCases }: ServiceCasesProps) {
  return (
    <section className="svc-section container">
      <h2 className="svc-h2 svc-h2-seul heading-display">
        <AccentTitle text="Ce que j'ai construit" />
      </h2>
      <ul className="grille-cartes">
        {relatedCases.map((slug) => {
          const meta = CASE_META[slug];

          return (
            <li key={slug}>
              <TransitionLink
                href={`/portfolio/${slug}`}
                className="svc-carte etiquette etiquette-carte etiquette-jaune etiquette-appui"
              >
                <h3 className="svc-carte-titre">{meta.name}</h3>
                <p className="svc-texte">{meta.description}</p>
                <span className="svc-lien-carte">
                  <span className="svc-lien-carte-texte">Voir le cas →</span>
                </span>
              </TransitionLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
