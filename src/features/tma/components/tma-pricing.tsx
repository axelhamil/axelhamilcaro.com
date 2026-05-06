import { StripePricingTable } from "./stripe-pricing-table";

const PRICING_TABLE_ID = "prctbl_1TU7tx4IcJtCDFydX07JM7Wl";
const PUBLISHABLE_KEY =
  "pk_live_51Sex8N4IcJtCDFydyHC13CUlXt957Bl3bBBDdZejHT1W5IaixhuYzAS6mTKGka02jj7IuMaoDRHKyTIgPEKGC9hN008fsJaWIn";

export function TmaPricing() {
  return (
    <section id="forfaits" className="py-20 sm:py-28 px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // souscrire()
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            PRO ou PREMIUM, tu sais ce que tu paies.
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Aucune feature cachée, aucun upsell. Sans engagement, résiliable
            en self-service via ton portail Stripe. Facture automatique chaque
            mois, TVA gérée selon ton pays de facturation.
          </p>
        </div>
        <StripePricingTable
          pricingTableId={PRICING_TABLE_ID}
          publishableKey={PUBLISHABLE_KEY}
        />
      </div>
    </section>
  );
}
