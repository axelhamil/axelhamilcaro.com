import { ArrowRight, Check } from "lucide-react";
import { LEGAL_ENTITY } from "@/app/_config/site.constants";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/ui/portfolio/button";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import { TMA_FORFAITS } from "../lib/tma-data";

const PAYMENT_LINKS: Record<"pro" | "premium", string> = {
  pro:
    process.env.NEXT_PUBLIC_STRIPE_TMA_PRO_URL ??
    "https://buy.stripe.com/8x200cdlZggqfhE991c3m01",
  premium:
    process.env.NEXT_PUBLIC_STRIPE_TMA_PREMIUM_URL ??
    "https://buy.stripe.com/fZu6oA3LpaW64D00Cvc3m02",
};

export function TmaPricing() {
  return (
    <section id="forfaits" className="svc-section container scroll-mt-24">
      <div className="svc-entete">
        <p className="surtitre">{"// souscrire()"}</p>
        <h2 className="svc-h2 heading-display">
          <AccentTitle text="PRO ou PREMIUM, tu sais ce que tu paies." />
        </h2>
        <p className="svc-intro">
          Aucune feature cachée, aucun upsell. Sans engagement, résiliable en
          self-service via ton portail Stripe. Facture automatique chaque mois,
          TVA gérée selon ton pays de facturation.
        </p>
      </div>

      <div className="tma-forfaits">
        {TMA_FORFAITS.map((forfait) => (
          <article
            key={forfait.slug}
            className={cn(
              "tma-forfait etiquette",
              forfait.recommended ? "svc-aplat" : "etiquette-gris",
            )}
          >
            {forfait.recommended ? (
              <p className="tma-forfait-tampon tampon tampon-droite">
                <span className="tampon-haut">Recommandé</span>{" "}
                <span className="tampon-bas" aria-hidden="true">
                  {forfait.hours}h / mois
                </span>
              </p>
            ) : null}

            <header className="flex flex-col gap-3">
              <p className="svc-meta">{forfait.slug.toUpperCase()}</p>
              <h3 className="tma-forfait-nom heading-display">
                {forfait.name}
              </h3>
              <p className="svc-texte">{forfait.tagline}</p>
            </header>

            <div className="tma-bloc-filet flex flex-col gap-3">
              <p className="svc-meta">Pour qui</p>
              <ul className="flex flex-col gap-2">
                {forfait.targetAudience.map((item) => (
                  <li key={item} className="tma-fonctionnalite">
                    <span className="tma-fleche" aria-hidden="true">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="tma-prix tma-bloc-filet">
              <span className="tma-prix-valeur">{forfait.price}€</span>
              <span className="svc-meta">HT / mois</span>
            </p>

            <Button
              href={PAYMENT_LINKS[forfait.slug]}
              variant="primary"
              size="lg"
              className="w-full"
            >
              M'abonner
              <span className="sr-only"> au forfait {forfait.name}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>

            <dl className="tma-caracteristiques tma-bloc-filet">
              <div>
                <dt className="svc-meta">Heures incluses</dt>
                <dd className="tma-caracteristique-valeur">
                  {forfait.hours}h / mois
                </dd>
              </div>
              <div>
                <dt className="svc-meta">Hors-forfait</dt>
                <dd className="tma-caracteristique-valeur">
                  {forfait.hourlyOverflow} € HT par heure
                </dd>
              </div>
              <div>
                <dt className="svc-meta">Délai de prise en compte</dt>
                <dd className="tma-caracteristique-valeur">
                  {forfait.responseTime}
                </dd>
              </div>
              <div>
                <dt className="svc-meta">Visio max / mois</dt>
                <dd className="tma-caracteristique-valeur">
                  {forfait.meetingHours}
                </dd>
              </div>
            </dl>

            <div className="tma-bloc-filet flex flex-col gap-4">
              <p className="svc-meta">Fonctionnalités</p>
              <ul className="flex flex-col gap-3">
                {forfait.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={cn(
                      "tma-fonctionnalite",
                      feature.premiumOnly && "tma-fonctionnalite-premium",
                    )}
                  >
                    <span className="tma-coche" aria-hidden="true">
                      <Check className="w-3 h-3" strokeWidth={3.5} />
                    </span>
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tma-bloc-filet flex justify-end self-end">
              <a
                href={`#${forfait.slug}-details`}
                className="link-underline cible-tactile gap-1.5"
              >
                En savoir plus
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-8 max-w-2xl">
        <p className="svc-texte">
          Paiement sécurisé via Stripe (Payment Link). Tu reçois ta facture par
          email à chaque renouvellement et tu gères tout depuis ton portail
          Stripe : moyen de paiement, factures, résiliation.
        </p>
        <p className="svc-meta">{`${LEGAL_ENTITY.vatStatus}.`}</p>
      </div>
    </section>
  );
}
