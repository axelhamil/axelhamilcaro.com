import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Portrait } from "@/src/shared/ui/portrait/portrait";
import HeroLeft from "./hero-left";

const HERO_RIBBON = [
  "Web",
  "Mobile",
  "API",
  "SaaS",
  "Open source",
  "TypeScript",
  "Bun",
  "Hono",
  "React",
  "PostgreSQL",
  "Clean Architecture",
  "DDD",
  "Tests d'abord",
  "Outils pour agents",
  "Tours",
  "Remote France",
] as const;

const Hero = () => {
  return (
    <section
      id="hero"
      className="hero trame pleine-largeur flex flex-col min-h-[calc(100svh-var(--nav-h))]"
    >
      <div className="container mx-auto flex-1 px-4 sm:px-6 md:px-10 py-10 md:py-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <HeroLeft />
        <Portrait stampTop="Build log" stampBottom="N° 001" />
      </div>

      <Ribbon items={HERO_RIBBON} hachures />
    </section>
  );
};

export default Hero;
