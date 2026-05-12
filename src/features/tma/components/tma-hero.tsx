import { Button } from "@/src/shared/ui/portfolio/button";
import { TMA_HERO, TMA_LAST_UPDATED } from "../lib/tma-data";
import { TmaContactButton } from "./tma-contact-button";

export function TmaHero() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p
          className="text-accent font-medium tracking-wider text-sm mb-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {TMA_HERO.eyebrow}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {TMA_HERO.title}
        </h1>
        <p className="text-secondary text-lg leading-relaxed max-w-3xl mx-auto mb-4">
          {TMA_HERO.subtitle}
        </p>
        <p
          className="text-secondary/60 text-xs uppercase tracking-wider mb-8"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          Tarifs en vigueur au {TMA_LAST_UPDATED.display}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-secondary mb-10 max-w-3xl mx-auto">
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Sans engagement
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Réponse sous 1 j ouvré (1/2 j
            sur PREMIUM)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Next.js, React, Node, infra
            légère
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Paiement Stripe sécurisé
          </li>
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={TMA_HERO.primaryCtaHref} variant="primary" size="lg">
            {TMA_HERO.primaryCtaLabel}
          </Button>
          <TmaContactButton label={TMA_HERO.secondaryCtaLabel} />
        </div>
      </div>
    </section>
  );
}
