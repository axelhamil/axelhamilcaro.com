import { Code2, Rocket, Lightbulb, Wrench, Sparkles } from "lucide-react";
import { Heading2 } from "./ui/heading2";
import { Paragraphe } from "./ui/paragraphe";

const services = [
  {
    icon: Lightbulb,
    title: "Conception",
    description:
      "Du besoin métier à l'architecture technique, je pose les bases solides.",
    color: "text-accent-mauve",
    gradient: "from-accent-mauve/20 to-accent-mauve/5",
    borderColor: "hover:border-accent-mauve/50",
  },
  {
    icon: Code2,
    title: "Développement",
    description:
      "Code propre, testé et maintenable. Pas de dette technique cachée.",
    color: "text-accent-blue",
    gradient: "from-accent-blue/20 to-accent-blue/5",
    borderColor: "hover:border-accent-blue/50",
  },
  {
    icon: Rocket,
    title: "Déploiement",
    description: "CI/CD, monitoring, et mise en production sans stress.",
    color: "text-accent-teal",
    gradient: "from-accent-teal/20 to-accent-teal/5",
    borderColor: "hover:border-accent-teal/50",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Évolutions, corrections, et support sur le long terme.",
    color: "text-accent-peach",
    gradient: "from-accent-peach/20 to-accent-peach/5",
    borderColor: "hover:border-accent-peach/50",
  },
];

const WhatIDo = () => {
  return (
    <section id="services" className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20">
      {/* Section header */}
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
          <Sparkles className="w-4 h-4 text-accent-mauve" />
          <span className="text-sm font-medium text-primary">
            Services
          </span>
        </div>
        <Heading2
          size="xl"
          className="text-2xl sm:text-3xl md:text-4xl animate-fade-in"
        >
          Ce que je fais
        </Heading2>
        <Paragraphe
          variant="secondary"
          className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Un accompagnement complet, de l'idée au produit en production
        </Paragraphe>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="group animate-fade-in-up"
            style={{
              animationDelay: `${(index + 1) * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <div
              className={`
                relative h-full flex flex-col items-center text-center gap-3 sm:gap-4
                p-5 sm:p-6 rounded-2xl
                glass-card glow-border ${service.borderColor}
                transition-all duration-500
                group-hover:scale-[1.02] group-hover:-translate-y-2
              `}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 pointer-events-none
                  bg-gradient-to-br ${service.gradient}
                `}
              />

              {/* Icon */}
              <div
                className={`
                  relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl
                  bg-gradient-to-br ${service.gradient}
                  flex items-center justify-center
                  group-hover:scale-110 group-hover:rotate-3
                  transition-all duration-500
                  border border-secondary/20
                `}
              >
                <service.icon
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${service.color} transition-transform duration-300`}
                />
              </div>

              {/* Title */}
              <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl group-hover:text-primary-foreground transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <Paragraphe
                variant="secondary"
                size="sm"
                className="relative z-10 text-sm"
              >
                {service.description}
              </Paragraphe>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
