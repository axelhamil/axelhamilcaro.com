import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Button } from "@/src/shared/ui/portfolio/button";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import { TMA_FORFAITS, TMA_HERO, TMA_LAST_UPDATED } from "../lib/tma-data";
import { TmaContactButton } from "./tma-contact-button";

const HERO_RIBBON = [
  "Bugs",
  "Sécurité",
  "Performances",
  "Dépendances à jour",
  "Support technique",
  "Infra légère",
  "Next.js",
  "React",
  "Node",
  "Prise en compte sous 1 jour ouvré",
  "Du lundi au vendredi",
  "Onboarding sous 48h",
  "Sans engagement",
];

const lowestPrice = Math.min(...TMA_FORFAITS.map((forfait) => forfait.price));

export function TmaHero() {
  return (
    <section className="trame pleine-largeur">
      <div className="svc-hero-corps container flex flex-col items-start gap-8">
        <div className="flex w-full flex-wrap items-start justify-between gap-6">
          <p className="surtitre">{TMA_HERO.eyebrow}</p>
          <p aria-hidden="true" className="tampon tampon-droite">
            <span className="tampon-haut">Dès {lowestPrice}€</span>{" "}
            <span className="tampon-bas">HT / mois</span>
          </p>
        </div>

        <h1 className="svc-h1 heading-display">
          <AccentTitle text={TMA_HERO.title} />
        </h1>

        <p className="svc-lede">{TMA_HERO.subtitle}</p>

        <p className="svc-meta">
          Tarifs en vigueur au {TMA_LAST_UPDATED.display}
        </p>

        <ul className="tma-puces">
          <li className="tma-puce etiquette etiquette-sm">Sans engagement</li>
          <li className="tma-puce etiquette etiquette-sm">
            Réponse sous 1 j ouvré (1/2 j sur PREMIUM)
          </li>
          <li className="tma-puce etiquette etiquette-sm">
            Next.js, React, Node, infra légère
          </li>
          <li className="tma-puce etiquette etiquette-sm">
            Paiement Stripe sécurisé
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
          <Button href={TMA_HERO.primaryCtaHref} variant="primary" size="lg">
            {TMA_HERO.primaryCtaLabel}
          </Button>
          <TmaContactButton label={TMA_HERO.secondaryCtaLabel} />
        </div>
      </div>

      <Ribbon items={HERO_RIBBON} hachures />
    </section>
  );
}
