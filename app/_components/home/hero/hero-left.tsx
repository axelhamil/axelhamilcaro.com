import { ArrowRight, Calendar, Code2, Rocket, Zap } from "lucide-react";
import { Button } from "../../ui/button";
import { Heading1 } from "../../ui/heading1";
import { Heading2 } from "../../ui/heading2";
import { Paragraphe } from "../../ui/paragraphe";
import { HeroMotionItem } from "./hero-motion";

const stats = [
  { v: "5+", l: "ans d'XP" },
  { v: "20+", l: "projets livrés" },
  { v: "100%", l: "clients satisfaits" },
] as const;

const HeroLeft = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 min-w-0">
      <HeroMotionItem>
        <div className="flex flex-wrap items-center gap-2">
          <div className="badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs sm:text-sm font-medium">
              Dispo pour missions
            </span>
          </div>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <Heading1
          size="xl"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Développeur{" "}
          <span className="text-accent">FullStack</span>{" "}
          Freelance
        </Heading1>
      </HeroMotionItem>

      <HeroMotionItem>
        <Heading2
          size="lg"
          className="text-lg sm:text-xl md:text-2xl flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="w-5 h-5 text-accent" />
            React & Next.js
          </span>

          <span className="hidden sm:inline text-muted">·</span>

          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-accent" />
            TypeScript Expert
          </span>

          <span className="hidden sm:inline text-muted">·</span>

          <span className="inline-flex items-center gap-1.5">
            <Rocket className="w-5 h-5 text-accent" />
            Node.js & APIs
          </span>
        </Heading2>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="flex flex-col gap-3 md:gap-4 min-w-0">
          <Paragraphe size="lg" className="text-base md:text-lg">
            Je suis <strong>Axel Hamilcaro</strong>, développeur web freelance
            spécialisé en{" "}
            <span className="font-semibold text-primary">
              création d'applications web sur mesure
            </span>
            . Du MVP au produit scalable, je conçois des{" "}
            <strong>solutions digitales performantes</strong>.
          </Paragraphe>

          <Paragraphe size="md" className="text-base md:text-lg text-secondary">
            Expert <strong>React, Next.js et TypeScript</strong>, j'accompagne
            mes clients de la conception au déploiement.{" "}
            <strong>Applications SaaS</strong>, APIs robustes et produits
            durables.
          </Paragraphe>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <Button
            href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
            external
            size="lg"
            className="w-full sm:w-auto justify-center group"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            On s'appelle ?
          </Button>

          <Button
            href="/tree"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto justify-center"
          >
            Tous mes liens
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
          {stats.map(({ v, l }) => (
            <div
              key={l}
              className="flex flex-col items-center px-4 py-3 rounded-xl card-accent hover:scale-105 transition-transform duration-300"
            >
              <span
                className="text-2xl sm:text-3xl font-bold text-accent"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {v}
              </span>
              <span className="text-xs sm:text-sm text-secondary text-center">
                {l}
              </span>
            </div>
          ))}
        </div>
      </HeroMotionItem>
    </div>
  );
};

export default HeroLeft;
