export const billetterieFaqItems = [
  {
    question: "Quel était le challenge technique principal ?",
    answer:
      "Construire un système de billetterie complet (plan 2D/3D interactif, ventes temps réel WebSocket, calcul automatique TVA et tarifs) en solo en 1 mois pour un événement précis avec deadline ferme.",
  },
  {
    question: "Pourquoi WebSocket et pas du polling ?",
    answer:
      "Le plan de salle devait refléter en temps réel les places vendues par d'autres opérateurs en parallèle. Polling = latence et conflits, WebSocket = synchronisation sub-200ms et UX fluide pour les agents en caisse.",
  },
  {
    question: "Combien de temps de la conception à la mise en production ?",
    answer:
      "1 mois calendaire, en solo, avec un client en parallèle. Adoption immédiate par l'équipe opérations le jour J.",
  },
  {
    question: "Quelle stack technique as-tu utilisée ?",
    answer:
      "Next.js (dashboard), Node.js (API + WebSocket), PostgreSQL, Three.js pour le rendu 3D du plan de salle. Déploiement sur infra cliente.",
  },
];

export function BilletterieFaq() {
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
          {billetterieFaqItems.map((item) => (
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
