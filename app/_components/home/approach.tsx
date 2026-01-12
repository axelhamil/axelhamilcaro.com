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
  },
  {
    icon: Zap,
    title: "Performance & UX",
    description:
      "Core Web Vitals, accessibilité, et détails UI. Rapide, stable, premium.",
  },
  {
    icon: GitBranch,
    title: "Delivery pragmatique",
    description:
      "Itérations courtes, scope maîtrisé, release fréquentes. Tu vois l'impact vite.",
  },
  {
    icon: Radar,
    title: "Observabilité",
    description:
      "Logs, métriques, alerting. Une prod pilotable, pas une boîte noire.",
  },
] as const;

const Approach = () => {
  return (
    <section
      id="approach"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="approach-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem>
          <div className="badge mb-4">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Approche</span>
          </div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="approach-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Comment je construis
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            Une approche orientée produit, avec un standard de qualité qui tient
            dans le temps.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {pillars.map((p) => (
          <RevealItem key={p.title} className="group">
            <div className="relative h-full flex flex-col items-center text-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl card-accent transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-accent-light"
                aria-hidden="true"
              />

              <div
                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-secondary-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300"
                aria-hidden="true"
              >
                <p.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl">
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

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem>
          <div className="badge">
            <span className="text-xs sm:text-sm text-secondary">
              Résultat : un produit livrable rapidement, maintenable, et prêt
              pour la production.
            </span>
          </div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default Approach;
