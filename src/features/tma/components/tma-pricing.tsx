import { ArrowRight, Check, Sparkles, Target } from "lucide-react";
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
    <section id="forfaits" className="py-20 sm:py-28 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {"// souscrire()"}
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            PRO ou PREMIUM, tu sais ce que tu paies.
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Aucune feature cachée, aucun upsell. Sans engagement, résiliable en
            self-service via ton portail Stripe. Facture automatique chaque
            mois, TVA gérée selon ton pays de facturation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TMA_FORFAITS.map((forfait) => (
            <article
              key={forfait.slug}
              className={`relative card p-6 sm:p-8 lg:p-10 flex flex-col ${
                forfait.recommended ? "border-accent/40" : ""
              }`}
            >
              {forfait.recommended ? (
                <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  Recommandé
                </div>
              ) : null}

              <header className="mb-6">
                <p
                  className="text-accent font-semibold tracking-wider text-sm mb-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {forfait.slug.toUpperCase()}
                </p>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-primary mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {forfait.name}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {forfait.tagline}
                </p>
              </header>

              <div className="mb-6 pb-6 border-b border-border">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-secondary mb-3">
                  <Target className="w-4 h-4 text-accent" aria-hidden="true" />
                  Pour qui
                </p>
                <ul className="space-y-2">
                  {forfait.targetAudience.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-primary"
                    >
                      <span
                        className="text-accent mt-0.5 shrink-0"
                        aria-hidden="true"
                      >
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1 mb-8">
                <span
                  className="text-4xl sm:text-5xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {forfait.price}€
                </span>
                <span className="text-secondary text-base sm:text-lg">
                  HT / mois
                </span>
              </div>

              <a
                href={PAYMENT_LINKS[forfait.slug]}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-lg font-semibold transition-all ${
                  forfait.recommended
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "bg-primary text-primary-background hover:opacity-90"
                }`}
              >
                M'abonner
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
                    Heures incluses
                  </dt>
                  <dd className="text-primary font-semibold">
                    {forfait.hours}h / mois
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
                    Hors-forfait
                  </dt>
                  <dd className="text-primary font-semibold">
                    {forfait.hourlyOverflow}€ / h
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
                    Délai de prise en compte
                  </dt>
                  <dd className="text-primary font-semibold">
                    {forfait.responseTime}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
                    Visio max / mois
                  </dt>
                  <dd className="text-primary font-semibold">
                    {forfait.meetingHours}
                  </dd>
                </div>
              </dl>

              <p className="text-xs uppercase tracking-wider text-secondary mb-3">
                Fonctionnalités
              </p>
              <ul className="space-y-3 flex-1">
                {forfait.features.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex items-start gap-3 text-primary"
                  >
                    <Check
                      className={`w-5 h-5 mt-0.5 shrink-0 ${
                        feature.premiumOnly ? "text-accent" : "text-accent/70"
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      className={
                        feature.premiumOnly ? "font-medium" : "text-secondary"
                      }
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-border flex justify-end">
                <a
                  href={`#${forfait.slug}-details`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-secondary text-sm mt-8 max-w-2xl mx-auto">
          Paiement sécurisé via Stripe (Payment Link). Tu reçois ta facture par
          email à chaque renouvellement et tu gères tout depuis ton portail
          Stripe : moyen de paiement, factures, résiliation.
        </p>
        <p className="text-center text-secondary/80 text-xs mt-3 max-w-2xl mx-auto">
          TVA non applicable, art. 293 B du CGI.
        </p>
      </div>
    </section>
  );
}
