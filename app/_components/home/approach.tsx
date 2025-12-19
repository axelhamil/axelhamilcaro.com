import { Cpu, GitBranch, Radar, ShieldCheck, Zap } from "lucide-react";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Qualité durable",
    description:
      "Clean Architecture, boundaries claires, tests ciblés. Le produit reste évolutif.",
    accent: "text-accent-mauve",
    border: "hover:border-accent-mauve/50",
    gradient: "from-accent-mauve/20 to-accent-mauve/5",
  },
  {
    icon: Zap,
    title: "Performance & UX",
    description:
      "Core Web Vitals, accessibilité, et détails UI. Rapide, stable, premium.",
    accent: "text-accent-blue",
    border: "hover:border-accent-blue/50",
    gradient: "from-accent-blue/20 to-accent-blue/5",
  },
  {
    icon: GitBranch,
    title: "Delivery pragmatique",
    description:
      "Itérations courtes, scope maîtrisé, release fréquentes. Tu vois l’impact vite.",
    accent: "text-accent-teal",
    border: "hover:border-accent-teal/50",
    gradient: "from-accent-teal/20 to-accent-teal/5",
  },
  {
    icon: Radar,
    title: "Observabilité",
    description:
      "Logs, métriques, alerting. Une prod pilotable, pas une boîte noire.",
    accent: "text-accent-peach",
    border: "hover:border-accent-peach/50",
    gradient: "from-accent-peach/20 to-accent-peach/5",
  },
] as const;

const Approach = () => {
  return (
    <section
      id="approach"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="approach-title"
    >
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
          <Cpu className="w-4 h-4 text-accent-blue" />
          <span className="text-sm font-medium text-primary">Approche</span>
        </div>

        <Heading2
          id="approach-title"
          size="xl"
          className="text-2xl sm:text-3xl md:text-4xl animate-fade-in"
        >
          Comment je construis
        </Heading2>

        <Paragraphe
          variant="secondary"
          className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Une approche orientée produit, avec un standard de qualité qui tient
          dans le temps.
        </Paragraphe>
      </div>

      <RevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {pillars.map((p) => (
          <RevealItem key={p.title} className="group">
            <div
              className={`
                relative h-full flex flex-col items-center text-center gap-3 sm:gap-4
                p-5 sm:p-6 rounded-2xl
                glass-card glow-border ${p.border}
                transition-all duration-500
                group-hover:scale-[1.02] group-hover:-translate-y-2
              `}
            >
              <div
                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 pointer-events-none
                  bg-linear-to-br ${p.gradient}
                `}
                aria-hidden="true"
              />

              <div
                className={`
                  relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl
                  bg-linear-to-br ${p.gradient}
                  flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-500
                  border border-secondary/20
                `}
                aria-hidden="true"
              >
                <p.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${p.accent}`} />
              </div>

              <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl group-hover:text-primary-foreground transition-colors duration-300">
                {p.title}
              </h3>

              <Paragraphe
                variant="secondary"
                size="sm"
                className="relative z-10 text-sm"
              >
                {p.description}
              </Paragraphe>
            </div>
          </RevealItem>
        ))}
      </RevealContainer>

      <div
        className="text-center mt-10 sm:mt-12 animate-fade-in"
        style={{ animationDelay: "600ms" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <span className="text-xs sm:text-sm text-secondary">
            Résultat : un produit livrable rapidement, maintenable, et prêt pour
            la production.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Approach;
