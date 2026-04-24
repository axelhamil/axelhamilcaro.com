import TransitionLink from "@/src/shared/ui/navigation/transition-link";
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
    description: "Plateforme RSE B Corp, lead tech 4 ans, IA RAG.",
  },
  homecafe: {
    name: "HomeCafé",
    description:
      "App web + mobile native, 70+ parcours métier, 545+ tests BDD.",
  },
  scormpilot: {
    name: "ScormPilot",
    description: "SaaS e-learning multi-tenant, 5 apps en solo.",
  },
};

export function ServiceCases({
  relatedCases,
}: {
  relatedCases: RelatedCaseSlug[];
}) {
  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Mes case studies sur ce type de mission
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCases.map((slug) => {
            const meta = CASE_META[slug];
            return (
              <TransitionLink
                key={slug}
                href={`/portfolio/${slug}`}
                className="card p-6 block hover:border-accent/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {meta.name}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {meta.description}
                </p>
                <span className="mt-4 inline-block text-accent text-sm font-medium">
                  Voir le case →
                </span>
              </TransitionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
