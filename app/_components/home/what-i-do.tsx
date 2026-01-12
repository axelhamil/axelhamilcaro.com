import { Code2, Lightbulb, Rocket, Sparkles, Wrench } from "lucide-react";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";

const services = [
  {
    icon: Lightbulb,
    title: "Conception",
    description:
      "Du besoin métier à l'architecture technique, je pose les bases solides.",
  },
  {
    icon: Code2,
    title: "Développement",
    description:
      "Code propre, testé et maintenable. Pas de dette technique cachée.",
  },
  {
    icon: Rocket,
    title: "Déploiement",
    description: "CI/CD, monitoring, et mise en production sans stress.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Évolutions, corrections, et support sur le long terme.",
  },
];

const WhatIDo = () => {
  return (
    <section
      id="services"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem>
          <div className="badge mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Services</span>
          </div>
        </RevealItem>

        <RevealItem>
          <Heading2
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce que je fais
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            Un accompagnement complet, de l'idée au produit en production
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {services.map((service) => (
          <RevealItem key={service.title} className="group">
            <div className="relative h-full flex flex-col items-center text-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl card-accent transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-accent-light" />

              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-secondary-background border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-300">
                <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>

              <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl">
                {service.title}
              </h3>

              <Paragraphe
                variant="secondary"
                size="sm"
                className="relative z-10 text-sm"
              >
                {service.description}
              </Paragraphe>
            </div>
          </RevealItem>
        ))}
      </RevealContainer>
    </section>
  );
};

export default WhatIDo;
