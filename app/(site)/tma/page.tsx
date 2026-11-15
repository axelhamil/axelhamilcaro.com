import type { Metadata } from "next";
import { PERSON_ID } from "@/app/_config/site.constants";
import { TmaCta } from "@/src/features/tma/components/tma-cta";
import { TmaDeliverables } from "@/src/features/tma/components/tma-deliverables";
import { TmaFaq } from "@/src/features/tma/components/tma-faq";
import { TmaHero } from "@/src/features/tma/components/tma-hero";
import { TmaMonitoring } from "@/src/features/tma/components/tma-monitoring";
import { TmaNotIncluded } from "@/src/features/tma/components/tma-not-included";
import { TmaPrerequisites } from "@/src/features/tma/components/tma-prerequisites";
import { TmaPricing } from "@/src/features/tma/components/tma-pricing";
import { TmaProDetails } from "@/src/features/tma/components/tma-pro-details";
import { TmaProWorkflow } from "@/src/features/tma/components/tma-pro-workflow";
import { TmaProcess } from "@/src/features/tma/components/tma-process";
import { TmaWhoFor } from "@/src/features/tma/components/tma-who-for";
import {
  TMA_FAQ,
  TMA_FORFAITS,
  TMA_META,
  TMA_SCHEMA,
  TMA_URL,
} from "@/src/features/tma/lib/tma-data";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { AREA_SERVED } from "@/src/shared/seo/schemas/area-served";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

export const metadata: Metadata = buildPageMetadata({
  title: TMA_META.title,
  description: TMA_META.description,
  path: "/tma",
  keywords: [...TMA_META.keywords],
});

const faqSchema = buildFaqPageSchema(TMA_FAQ);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "TMA", url: "/tma" },
]);

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: TMA_SCHEMA.name,
  description: TMA_SCHEMA.description,
  url: TMA_URL,
  serviceType: "Tierce Maintenance Applicative",
  provider: { "@id": PERSON_ID },
  areaServed: AREA_SERVED,
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
    <main>
      <JsonLdScript data={serviceSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <TmaHero />
      <TmaWhoFor />
      <TmaPricing />
      <TmaProDetails />
      <TmaProWorkflow />
      <TmaDeliverables />
      <TmaMonitoring />
      <TmaProcess />
      <TmaPrerequisites />
      <TmaNotIncluded />
      <TmaFaq />
      <TmaCta />
    </main>
  );
}
