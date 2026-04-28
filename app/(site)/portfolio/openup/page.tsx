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
  name: "OpenUp, SaaS de gestion de liens tout-en-un",
  description:
    "Mission freelance solo livrée en quelques semaines avec le founder : SaaS combinant Bitly + Linktree + Beacons. 5 piliers (shortlinks, QR codes, link-in-bio, analytics, custom domains), deep links iOS/Android natifs, mobile natif via Capacitor, edge <50ms via Cloudflare Worker, multi-devise Stripe EUR/USD, Clean Architecture + DDD sur Hono.",
  url: "https://axelhamilcaro.com/portfolio/openup",
  dateCreated: "2026",
  keywords: [
    "SaaS",
    "gestion de liens",
    "shortlink",
    "link-in-bio",
    "QR code dynamique",
    "deep link iOS",
    "deep link Android",
    "Cloudflare Worker",
    "Capacitor",
    "Hono",
    "Clean Architecture",
    "DDD",
    "Stripe",
    "Apple Wallet",
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

export const metadata: Metadata = {
  title: "OpenUp - SaaS de gestion de liens tout-en-un",
  description:
    "Mission freelance : SaaS Bitly + Linktree + Beacons livré en solo from scratch avec le founder en quelques semaines. Deep links iOS/Android natifs, mobile via Capacitor, edge Cloudflare <50ms, Stripe multi-devise, Clean Architecture + DDD sur Hono. Live sur openup.to.",
  keywords: [
    "OpenUp",
    "gestion de liens",
    "shortlink",
    "link-in-bio",
    "QR code",
    "SaaS",
    "Hono",
    "Capacitor",
    "Cloudflare Workers",
    "Clean Architecture",
    "DDD",
    "deep links",
    "Stripe multi-devise",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/openup",
  },
  openGraph: {
    title: "OpenUp - SaaS de gestion de liens tout-en-un",
    description:
      "Mission freelance solo : SaaS Bitly + Linktree + Beacons combinés. Deep links iOS/Android, edge Cloudflare <50ms, Clean Architecture + DDD sur Hono.",
    url: "/portfolio/openup",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenUp - SaaS de gestion de liens tout-en-un",
    description:
      "Mission freelance solo : SaaS Bitly + Linktree + Beacons combinés. Deep links iOS/Android, edge Cloudflare <50ms, Clean Architecture + DDD sur Hono.",
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
