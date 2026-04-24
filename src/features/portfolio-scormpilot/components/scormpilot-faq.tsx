export const scormpilotFaqItems = [
  {
    question: "Pourquoi 5 applications séparées et pas un monolithe ?",
    answer:
      "Chaque app a un cycle de release différent : API et dashboard évoluent vite, lecteur SCORM doit être ultra stable (clients = organismes de formation), runtime SCORM doit fonctionner offline, app Teams doit suivre les contraintes Microsoft.",
  },
  {
    question: "Multi-tenancy, comment c'est implémenté ?",
    answer:
      "Schema-per-tenant PostgreSQL avec migration automatique à l'onboarding client. Isolation forte des données (exigence des organismes de formation pour leurs apprenants).",
  },
  {
    question: "Combien de joueurs supportés en production ?",
    answer:
      "Plusieurs milliers de sessions quotidiennes au moment du lancement. Architecture pensée pour scale horizontal sans intervention manuelle.",
  },
  {
    question: "Tu as livré ça vraiment seul ?",
    answer:
      "Oui, en solo de juin 2025 à aujourd'hui. Stack moderne + Clean Architecture + CI/CD = un dev autonome peut livrer un SaaS multi-app. C'est la promesse de mon offre développement SaaS.",
  },
];

export function ScormpilotFaq() {
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
          {scormpilotFaqItems.map((item) => (
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
