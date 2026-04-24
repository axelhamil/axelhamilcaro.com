import { Code2, MessageSquare, Rocket, Target } from "lucide-react";

const values = [
  {
    Icon: Code2,
    title: "Code propre, pas dogmatique",
    text: "Clean Architecture + DDD quand le produit le mérite. Pragmatique quand il faut juste livrer vite. Pas de sur-ingénierie pour le plaisir.",
  },
  {
    Icon: Target,
    title: "Vision produit avant la technique",
    text: "Je pose les bonnes questions sur le métier avant de coder. Le code doit servir un objectif business clair, sinon il ne sert à rien.",
  },
  {
    Icon: Rocket,
    title: "Livraison fiable",
    text: 'Je tiens mes engagements. Pas de surprise sur les délais, pas de dette technique cachée, pas de "ça marchait sur mon poste".',
  },
  {
    Icon: MessageSquare,
    title: "Communication directe",
    text: "Je travaille en async, je documente, je préviens dès qu'un blocage apparaît. Pas besoin de me chasser pour avoir un statut.",
  },
] as const;

export function AboutValues() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-primary mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Mes valeurs
          </h2>
          <p className="text-secondary text-lg">
            Comment je travaille, concrètement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map(({ Icon, title, text }) => (
            <article
              key={title}
              className="flex flex-col gap-4 p-6 rounded-xl card border border-neutral-200"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/10">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3
                className="text-lg font-semibold text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {title}
              </h3>
              <p className="text-secondary leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
