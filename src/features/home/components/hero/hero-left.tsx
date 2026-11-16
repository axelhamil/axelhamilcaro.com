import { ArrowDown, ArrowUpRight } from "lucide-react";
import { FACT_LABELS, HERO_COPY } from "@/app/_config/home-copy";
import { PARCOURS } from "@/app/_config/parcours";
import {
  PRIVATE_BUILDS_COUNT,
  PUBLIC_BUILDS_COUNT,
} from "@/app/_config/projects";
import { EXTERNAL_LINKS } from "@/app/_config/site.constants";
import { AnimatedCounter } from "@/src/shared/ui/effects/animated-counter";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const facts = [
  { v: String(PUBLIC_BUILDS_COUNT), l: FACT_LABELS.publicBuilds, tone: "" },
  {
    v: String(PRIVATE_BUILDS_COUNT),
    l: FACT_LABELS.privateBuilds,
    tone: "etiquette-gris",
  },
  {
    v: PARCOURS.civitime.debut.iso.slice(0, 4),
    l: FACT_LABELS.developerSince,
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

      <p className="hero-accroche">{HERO_COPY.accroche}</p>

      <Paragraph size="lg" className="hero-lede">
        <strong>{HERO_COPY.intro}</strong>{" "}
        {`${HERO_COPY.lede} ${HERO_COPY.context}`}
      </Paragraph>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
        <Button href="/#portfolio" size="lg">
          {HERO_COPY.primaryCta}
          <ArrowDown className="w-5 h-5" />
        </Button>

        <Button
          href={EXTERNAL_LINKS.github}
          external
          variant="secondary"
          size="lg"
        >
          {HERO_COPY.secondaryCta}
          <ArrowUpRight className="w-5 h-5" />
        </Button>
      </div>

      <Paragraph
        variant="secondary"
        className="hero-selectif flex flex-wrap items-center gap-x-3"
      >
        {HERO_COPY.selective}
        <TransitionLink
          href="/#services"
          className="link-underline label-mono cible-tactile"
        >
          {HERO_COPY.selectiveLink}
        </TransitionLink>
      </Paragraph>

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
