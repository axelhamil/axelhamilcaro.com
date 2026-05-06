import { Button } from "@/src/shared/ui/portfolio/button";
import { TMA_HERO } from "../lib/tma-data";
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
        <p className="text-secondary text-lg leading-relaxed max-w-3xl mx-auto mb-8">
          {TMA_HERO.subtitle}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-secondary mb-10">
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Sans engagement
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">●</span> Réponse sous 1 jour ouvré
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
