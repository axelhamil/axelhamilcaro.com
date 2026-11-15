import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import {
  OpenupFaq,
  openupFaqItems,
} from "@/src/features/portfolio-openup/components/openup-faq";
import {
  OpenupArchitecture,
  OpenupBottomCta,
  OpenupContext,
  OpenupFeatures,
  OpenupHero,
  OpenupScreenshots,
  OpenupStats,
  OpenupTechStack,
} from "@/src/features/portfolio-openup/components/openup-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "OpenUp, générateur de deep links",
  description:
    "Produit dont Axel Hamilcaro est le fondateur technique : SaaS qui transforme une URL en lien ouvrant l'application native de destination, même depuis le navigateur intégré d'Instagram ou de TikTok. 57 applications résolues, 11 navigateurs intégrés contournés (Instagram, TikTok, WeChat), redirection décidée en moins de 50 ms depuis l'edge Cloudflare, plusieurs milliers d'utilisateurs et 10 à 15% convertis en payant. QR codes, link-in-bio et analytics autour du lien. Web, iOS et Android depuis une seule codebase via Capacitor, abonnements Stripe en EUR et USD, Clean Architecture + DDD sur Hono.",
  url: `${SITE_URL}/portfolio/openup`,
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
  "OpenUp, le générateur de deep links dont je suis le fondateur technique : 57 apps ouvertes en natif, 11 in-app browsers contournés, 10 à 15 % de conversion.";

export const metadata: Metadata = buildPageMetadata({
  title: "OpenUp : générateur de deep links",
  description: openupDescription,
  path: "/portfolio/openup",
  type: "article",
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
});

export default function OpenupPage() {
  return (
    <>
      <JsonLdScript data={creativeWorkSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <main className="cas cas-openup">
        <OpenupHero />
        <OpenupStats />
        <OpenupContext />
        <OpenupScreenshots />
        <OpenupFeatures />
        <OpenupArchitecture />
        <OpenupTechStack />
        <OpenupFaq />
        <OpenupBottomCta />
      </main>
    </>
  );
}
