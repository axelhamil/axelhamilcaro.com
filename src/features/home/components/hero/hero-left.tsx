import { ArrowDown, ArrowRight } from "lucide-react";
import { PUBLIC_BUILDS_COUNT } from "@/app/_config/projects";
import { THESIS } from "@/app/_config/site.constants";
import { AnimatedCounter } from "@/src/shared/ui/effects/animated-counter";
import { Button } from "@/src/shared/ui/portfolio/button";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const FIRST_JOB_YEAR = 2021;

const yearsOfExperience = new Date().getFullYear() - FIRST_JOB_YEAR;

const facts = [
  { v: `${yearsOfExperience}+`, l: "ans de métier", tone: "" },
  { v: "20+", l: "applications livrées", tone: "etiquette-gris" },
  {
    v: `${PUBLIC_BUILDS_COUNT}`,
    l: "builds publics sur GitHub",
    tone: "etiquette-jaune",
  },
] as const;

const HeroLeft = () => {
  return (
    <div className="hero-texte flex flex-col gap-7 min-w-0">
      <h1 className="hero-h1 heading-display">
        <span className="hero-h1-nom surtitre">Axel Hamilcaro</span>
        <span className="sr-only">, </span>
        <span className="block">développeur fullstack</span>{" "}
        <span className="marqueur hero-h1-accent">
          <span className="hero-h1-et">et</span> builder
        </span>
      </h1>

      <p className="hero-accroche">Je ship ce qui sert vraiment le business.</p>

      <Paragraph size="lg" className="hero-lede">
        <strong>
          Je suis Axel Hamilcaro, développeur fullstack et builder, basé à
          Tours.
        </strong>{" "}
        {`${THESIS.firstPerson} Le jour, je développe chez Eskimoz, et je mène OpenUp en parallèle. Je prends toujours des projets en freelance.`}
      </Paragraph>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
        <Button href="/#portfolio" size="lg">
          Voir ce que je fabrique
          <ArrowDown className="w-5 h-5" />
        </Button>

        <Button href="/services" variant="secondary" size="lg">
          Travailler avec moi
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:gap-5 max-w-xl pr-2 pb-2">
        {facts.map(({ v, l, tone }) => (
          <li
            key={l}
            className={`etiquette aimant ${tone} flex-col items-start gap-1 px-3 py-2 sm:px-4 sm:py-3`}
          >
            <AnimatedCounter value={v} className="hero-fait-valeur" />
            <span className="label-mono hero-fait-label">
              <BrandText text={l} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroLeft;
