import { Building2, Briefcase } from "lucide-react";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";

const companies = [
  {
    name: "Civitime",
    type: "Elearning",
    logo: "CT",
    accent: "text-accent-mauve",
    gradient: "from-accent-mauve/20 to-accent-mauve/5",
    border: "hover:border-accent-mauve/50",
  },
  {
    name: "Scormpilot",
    type: "SaaS B2B",
    logo: "SP",
    accent: "text-accent-blue",
    gradient: "from-accent-blue/20 to-accent-blue/5",
    border: "hover:border-accent-blue/50",
  },
  {
    name: "MentorTroc",
    type: "Éducation",
    logo: "MT",
    accent: "text-accent-teal",
    gradient: "from-accent-teal/20 to-accent-teal/5",
    border: "hover:border-accent-teal/50",
  },
] as const;

const TrustedBy = () => {
  return (
    <section
      id="trusted-by"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="trusted-by-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
            <Briefcase className="w-4 h-4 text-accent-blue" />
            <span className="text-sm font-medium text-primary">Références</span>
          </div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="trusted-by-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Ils m'ont fait confiance
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Startups, scale-ups, et entreprises établies. Du MVP au produit
            mature.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
        {companies.map((company) => (
          <RevealItem key={company.name} className="group">
            <div
              className={`
                relative flex flex-col items-center justify-center gap-2
                p-5 sm:p-6 rounded-xl aspect-square
                glass-card glow-border border border-secondary/20
                transition-all duration-500
                group-hover:scale-105 group-hover:-translate-y-1
                ${company.border}
              `}
            >
              <div
                className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 pointer-events-none
                  bg-gradient-to-br ${company.gradient}
                `}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg
                    flex items-center justify-center
                    border border-secondary/20
                    bg-gradient-to-br ${company.gradient}
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500
                  `}
                  aria-hidden="true"
                >
                  <span
                    className={`text-base sm:text-lg font-bold ${company.accent}`}
                  >
                    {company.logo}
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-xs sm:text-sm font-semibold text-primary">
                    {company.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-secondary">
                    {company.type}
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <Building2 className="w-4 h-4 text-secondary" />
            <span className="text-xs sm:text-sm text-secondary">
              +15 projets livrés depuis 2020 · Disponible pour nouveaux projets
            </span>
          </div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default TrustedBy;
