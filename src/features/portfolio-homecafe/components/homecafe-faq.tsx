export const homecafeFaqItems = [
  {
    question:
      "Pourquoi un monorepo Turborepo plutôt que deux repos séparés web et mobile ?",
    answer:
      "Partage des modèles de domaine, des helpers et de la logique métier entre web (Next.js) et mobile (Expo / React Native). Un seul source of truth, un seul déploiement, moins de drift entre les deux plateformes.",
  },
  {
    question: "545+ tests BDD, c'est utile ou de la vanity metric ?",
    answer:
      "Utile : 12 domaines métier complexes (mood tracking, journaling, kanban, calendrier, gamification, feed social) interagissent. Sans tests BDD côté domaine, chaque ajout de feature aurait cassé l'existant.",
  },
  {
    question: "70+ parcours métier en 6 mois, comment c'est tenable ?",
    answer:
      "Architecture Clean + DDD + CQRS qui découple les parcours. Chaque domaine est isolé (12 bounded contexts). Ajouter un parcours = ajouter dans un domaine, pas refactorer 50 endroits.",
  },
  {
    question: "Tu as fait l'app mobile native, pas juste un wrapper ?",
    answer:
      "App native via Expo et React Native. Vraies notifications push, intégrations OS (Google Calendar, Cloudflare R2 pour le stockage media). Pas une PWA déguisée.",
  },
];

export function HomecafeFaq() {
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
          {homecafeFaqItems.map((item) => (
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
