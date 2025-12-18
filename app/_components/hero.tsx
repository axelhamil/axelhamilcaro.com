import Image from "next/image";
import { Calendar, ArrowRight, Zap, Code2, Coffee, Rocket } from "lucide-react";
import ScrollIndicator from "./scroll-indicator";
import { Button } from "./ui/button";
import { Heading1 } from "./ui/heading1";
import { Heading2 } from "./ui/heading2";
import { Paragraphe } from "./ui/paragraphe";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative container mx-auto min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-12 2xl:gap-20 py-6 md:py-10"
    >
      {/* Left: Text content */}
      <div className="w-full lg:max-w-2xl xl:max-w-3xl flex flex-col gap-4 md:gap-5 order-2 lg:order-1 z-10">
        {/* Fun intro badges */}
        <div className="flex flex-wrap items-center gap-2 animate-fade-in">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-teal" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-accent-teal">
              Dispo pour missions
            </span>
          </div>

          {/* Coffee counter - fun touch */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-peach/10 border border-accent-peach/30">
            <Coffee className="w-3.5 h-3.5 text-accent-peach" />
            <span className="text-xs sm:text-sm font-medium text-accent-peach">
              +1000 cafés bus
            </span>
          </div>
        </div>

        {/* Main heading with typing effect feel - SEO optimized h1 */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Heading1
            size="xl"
            className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
          >
            <span className="text-accent-blue">&gt;</span> Développeur{" "}
            <span className="text-accent-blue">FullStack Freelance</span>
            <span className="animate-pulse">_</span>
          </Heading1>
        </div>

        <Heading2
          size="lg"
          className="text-lg sm:text-xl md:text-2xl animate-fade-in flex items-center gap-2 flex-wrap"
          style={{ animationDelay: "200ms" }}
        >
          <span className="inline-flex items-center gap-1.5">
            <Code2 className="w-5 h-5 text-accent-mauve" />
            React & Next.js
          </span>
          <span className="text-secondary/50">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-5 h-5 text-accent-peach" />
            TypeScript Expert
          </span>
          <span className="text-secondary/50">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Rocket className="w-5 h-5 text-accent-teal" />
            Node.js & APIs
          </span>
        </Heading2>

        <div
          className="flex flex-col gap-3 md:gap-4 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <Paragraphe size="lg" className="text-base md:text-lg">
            Je suis <strong>Axel Hamilcaro</strong>, développeur web freelance
            spécialisé en{" "}
            <span className="font-semibold text-primary-foreground">
              création d'applications web sur mesure
            </span>
            . Du MVP au produit scalable, je conçois des{" "}
            <strong>solutions digitales performantes</strong> pour startups et
            entreprises.
          </Paragraphe>

          <Paragraphe size="md" className="text-base md:text-lg text-secondary">
            Expert <strong>React, Next.js et TypeScript</strong>, j'accompagne
            mes clients de la conception au déploiement.{" "}
            <strong>Applications SaaS</strong>, sites vitrines modernes, APIs
            robustes — je développe des produits qui convertissent et qui
            durent.
          </Paragraphe>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
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

        {/* Social proof / fun stats */}
        <div
          className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 animate-fade-in"
          style={{ animationDelay: "500ms" }}
        >
          <div className="flex flex-col items-center px-4 py-3 rounded-xl glass-card glow-border hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-accent-blue">
              5+
            </span>
            <span className="text-xs sm:text-sm text-secondary">ans d'XP</span>
          </div>
          <div className="flex flex-col items-center px-4 py-3 rounded-xl glass-card glow-border hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-accent-mauve">
              20+
            </span>
            <span className="text-xs sm:text-sm text-secondary">
              projets livrés
            </span>
          </div>
          <div className="flex flex-col items-center px-4 py-3 rounded-xl glass-card glow-border hover:scale-105 transition-transform duration-300">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-accent-teal">
              100%
            </span>
            <span className="text-xs sm:text-sm text-secondary">
              clients satisfaits
            </span>
          </div>
        </div>
      </div>

      {/* Right: Profile photo with cool effects */}
      <div
        className="w-full lg:w-auto flex justify-center order-1 lg:order-2 animate-fade-in z-10"
        style={{ animationDelay: "200ms" }}
      >
        <div className="relative group">
          {/* Animated glow background */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal opacity-30 blur-2xl animate-pulse-glow group-hover:opacity-50 transition-opacity duration-500" />

          {/* Secondary glow ring */}
          <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-gradient-to-r from-accent-blue via-accent-teal to-accent-mauve opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300" />

          {/* Photo container */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-secondary-background/50 shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <Image
              src="/profil_pp.jpeg"
              alt="Axel Hamilcaro - Développeur Full-Stack"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
            />
          </div>

          {/* Floating badges around photo */}
          <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-blue/30 shadow-lg animate-float">
            <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-blue" />
          </div>

          <div
            className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-mauve/30 shadow-lg animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-accent-mauve" />
          </div>

          <div
            className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-teal/30 shadow-lg animate-float hidden sm:block"
            style={{ animationDelay: "4s" }}
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent-teal" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
