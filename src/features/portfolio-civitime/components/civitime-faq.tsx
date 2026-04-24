export const civitimeFaqItems = [
  {
    question:
      "Pourquoi une refonte Clean Architecture + DDD + event sourcing ?",
    answer:
      "La codebase legacy de Civitime souffrait de couplage fort métier/techno. Refonte progressive vers DDD et event sourcing pour permettre l'audit complet de l'historique RSE et faciliter l'ajout de nouvelles métriques sans casser l'existant.",
  },
  {
    question: "Qu'est-ce que l'éditeur IA RAG a apporté concrètement ?",
    answer:
      "Les pédagogues utilisaient une chaîne d'outils manuels pour produire le contenu RSE. Avec le RAG (corpus interne et GPT-4) intégré dans l'éditeur, les délais d'itération ont été divisés par 2 sans dégrader la qualité éditoriale.",
  },
  {
    question: "Tu étais lead technique seul ou avec une équipe ?",
    answer:
      "Lead technique au sein d'une équipe produit. Je définissais l'architecture, codais les fondations, et accompagnais les autres devs en revue et pair programming.",
  },
  {
    question: "Combien de temps a duré la mission ?",
    answer:
      "4 ans (janvier 2021 à décembre 2024). Civitime est mon plus long engagement et ma meilleure école produit.",
  },
];

export function CivitimeFaq() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-bold text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Questions fréquentes sur ce projet
        </h2>
        <p className="text-secondary text-lg mb-12">
          Les questions que mes clients m&apos;ont posées sur cette mission.
        </p>
        <dl>
          {civitimeFaqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-neutral-200 py-6"
            >
              <summary className="cursor-pointer flex justify-between items-center text-lg font-semibold text-primary group-open:text-accent">
                <dt className="flex-1">{item.question}</dt>
                <span className="ml-4 text-2xl font-light group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <dd className="mt-4 text-secondary leading-relaxed">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
