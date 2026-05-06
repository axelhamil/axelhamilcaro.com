import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { TmaCta } from "@/src/features/tma/components/tma-cta";
import { TmaFaq } from "@/src/features/tma/components/tma-faq";
import { TmaHero } from "@/src/features/tma/components/tma-hero";
import { TmaPricing } from "@/src/features/tma/components/tma-pricing";
import { TmaProcess } from "@/src/features/tma/components/tma-process";
import { TmaWhoFor } from "@/src/features/tma/components/tma-who-for";
import {
  TMA_FAQ,
  TMA_FORFAITS,
  TMA_META,
  TMA_URL,
} from "@/src/features/tma/lib/tma-data";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

export const metadata: Metadata = {
  title: TMA_META.title,
  description: TMA_META.description,
  keywords: [...TMA_META.keywords],
  alternates: { canonical: TMA_URL },
  openGraph: {
    title:
      "TMA — Tierce Maintenance Applicative à partir de 350€/mois | Axel Hamilcaro",
    description:
      "Forfait mensuel pour ton app Next.js, React, Node ou mobile. PRO 350€ (5h, 1 jour ouvré) ou PREMIUM 600€ (10h, monitoring proactif, demi-journée). Sans engagement, résiliation Stripe.",
    url: TMA_URL,
    type: "website",
    siteName: "Axel Hamilcaro",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMA — Forfaits 350€ ou 600€/mois | Axel Hamilcaro",
    description:
      "Maintenance Applicative au mois pour ton app web ou mobile : Next.js, React, Node, infra légère. Sans engagement.",
  },
};

const faqSchema = buildFaqPageSchema(TMA_FAQ);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "TMA", url: "/tma" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tierce Maintenance Applicative — Next.js, React, Node, mobile",
  description: TMA_META.description,
  url: TMA_URL,
  serviceType: "Tierce Maintenance Applicative",
  provider: {
    "@type": "Person",
    name: "Axel Hamilcaro",
    url: SITE_URL,
  },
  areaServed: { "@type": "Country", name: "France" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Forfaits TMA",
    itemListElement: TMA_FORFAITS.map((forfait) => ({
      "@type": "Offer",
      name: forfait.name,
      description: forfait.description,
      price: forfait.price,
      priceCurrency: forfait.currency,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: forfait.price,
        priceCurrency: forfait.currency,
        unitText: "MONTH",
        billingDuration: "P1M",
      },
      eligibleDuration: {
        "@type": "QuantitativeValue",
        value: forfait.hours,
        unitText: "HOUR",
      },
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: forfait.name,
        description: forfait.tagline,
      },
    })),
  },
};

export default function TmaPage() {
  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TmaHero />
      <TmaWhoFor />
      <TmaPricing />
      <TmaProcess />
      <TmaFaq />
      <TmaCta />
    </main>
  );
}
