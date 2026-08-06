import type { Metadata } from "next";
import {
  OpenupFaq,
  openupFaqItems,
} from "@/src/features/portfolio-openup/components/openup-faq";
import {
  OpenupArchitecture,
  OpenupBackdrop,
  OpenupBottomCta,
  OpenupContext,
  OpenupFeatures,
  OpenupHero,
  OpenupScreenshots,
  OpenupStats,
  OpenupTechStack,
} from "@/src/features/portfolio-openup/components/openup-showcase";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "OpenUp, générateur de deep links",
  description:
    "Mission freelance solo livrée from scratch avec le founder : SaaS qui transforme une URL en lien ouvrant l'application native de destination. 57 applications résolues, 11 navigateurs intégrés contournés (Instagram, TikTok, WeChat), plusieurs milliers d'utilisateurs et 10 à 15% convertis en payant. Mobile natif via Capacitor, edge <50ms via Cloudflare Worker, multi-devise Stripe EUR/USD, Clean Architecture + DDD sur Hono.",
  url: "https://axelhamilcaro.com/portfolio/openup",
  dateCreated: "2026",
  keywords: [
    "deep link",
    "générateur de deep links",
    "in-app browser",
    "Universal Links",
    "Android App Links",
    "SaaS",
    "gestion de liens",
    "shortlink",
    "link-in-bio",
    "QR code dynamique",
    "Cloudflare Worker",
    "Capacitor",
    "Hono",
    "Clean Architecture",
    "DDD",
    "Stripe",
    "freelance",
  ],
  applicationCategory: "BusinessApplication",
});

const faqSchema = buildFaqPageSchema(openupFaqItems);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Projets", url: "/#portfolio" },
  { name: "OpenUp", url: "/portfolio/openup" },
]);

const openupDescription =
  "OpenUp, générateur de deep links livré solo from scratch. 57 apps ouvertes en natif, 11 in-app browsers contournés, 10 à 15% de conversion payante. Hono, Capacitor, Cloudflare edge <50ms.";

export const metadata: Metadata = {
  title: "OpenUp : générateur de deep links",
  description: openupDescription,
  keywords: [
    "OpenUp",
    "deep link",
    "générateur de deep links",
    "in-app browser",
    "Universal Links",
    "App Links",
    "gestion de liens",
    "shortlink",
    "link-in-bio",
    "SaaS",
    "Hono",
    "Capacitor",
    "Cloudflare Workers",
    "Clean Architecture",
    "DDD",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/openup",
  },
  openGraph: {
    title: "OpenUp : générateur de deep links",
    description: openupDescription,
    url: "/portfolio/openup",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenUp : générateur de deep links",
    description: openupDescription,
  },
};

export default function OpenupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
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
      <main className="pb-8">
        <div className="relative">
          <OpenupBackdrop />
          <OpenupHero />
          <OpenupStats />
          <OpenupContext />
          <OpenupScreenshots />
          <OpenupFeatures />
          <OpenupArchitecture />
          <OpenupTechStack />
          <OpenupFaq />
          <OpenupBottomCta />
        </div>
      </main>
    </>
  );
}
