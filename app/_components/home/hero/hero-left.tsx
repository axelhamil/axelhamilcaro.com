import { ArrowRight, Calendar, Code2, Coffee, Rocket, Zap } from "lucide-react";
import { Button } from "../../ui/button";
import { Heading1 } from "../../ui/heading1";
import { Heading2 } from "../../ui/heading2";
import { Paragraphe } from "../../ui/paragraphe";
import { HeroMotionItem } from "./hero-motion";

const stats = [
  { v: "5+", l: "ans d'XP", c: "text-accent-blue" },
  { v: "20+", l: "projets livrés", c: "text-accent-mauve" },
  { v: "100%", l: "clients satisfaits", c: "text-accent-teal" },
] as const;

const HeroLeft = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 min-w-0">
      <HeroMotionItem>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-accent-teal">
              Dispo pour missions
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-peach/10 border border-accent-peach/30">
            <Coffee className="w-3.5 h-3.5 text-accent-peach" />
            <span className="text-xs sm:text-sm font-medium text-accent-peach">
              +1000 cafés bus
            </span>
          </div>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <Heading1
          size="xl"
          className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
        >
          <span className="text-accent-blue">&gt;</span> Développeur{" "}
          <span className="text-accent-blue">FullStack Freelance</span>
          <span className="animate-pulse">_</span>
        </Heading1>
      </HeroMotionItem>

      <HeroMotionItem>
        <Heading2
          size="lg"
          className="text-lg sm:text-xl md:text-2xl flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="w-5 h-5 text-accent-mauve" />
            React & Next.js
          </span>

          <span className="hidden sm:inline text-secondary/50">·</span>

          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-accent-peach" />
            TypeScript Expert
          </span>

          <span className="hidden sm:inline text-secondary/50">·</span>

          <span className="inline-flex items-center gap-1.5">
            <Rocket className="w-5 h-5 text-accent-teal" />
            Node.js & APIs
          </span>
        </Heading2>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="flex flex-col gap-3 md:gap-4 min-w-0">
          <Paragraphe size="lg" className="text-base md:text-lg">
            Je suis <strong>Axel Hamilcaro</strong>, développeur web freelance
            spécialisé en{" "}
            <span className="font-semibold text-primary-foreground">
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
          {stats.map(({ v, l, c }) => (
            <div
              key={l}
              className="flex flex-col items-center px-4 py-3 rounded-xl glass-card glow-border hover:scale-105 transition-transform duration-300"
            >
              <span className={`text-2xl sm:text-3xl font-bold font-mono ${c}`}>
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
