import type { Metadata } from "next";
import {
  HomecafeArchitecture,
  HomecafeBackdrop,
  HomecafeBottomCta,
  HomecafeContext,
  HomecafeFeatures,
  HomecafeHero,
  HomecafeScreenshots,
  HomecafeStats,
  HomecafeTechStack,
} from "@/src/features/portfolio-homecafe/components/homecafe-showcase";
import {
  HomecafeFaq,
  homecafeFaqItems,
} from "@/src/features/portfolio-homecafe/components/homecafe-faq";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "HomeCafé — App bien-être et productivité",
  description:
    "Application web (Next.js) et mobile native (Expo / React Native) en monorepo Turborepo. 70+ parcours métier sur 12 domaines, 545+ tests BDD, Clean Architecture + DDD + CQRS.",
  url: "https://axelhamilcaro.com/portfolio/homecafe",
  dateCreated: "2025",
  keywords: [
    "bien-être",
    "productivité",
    "Next.js",
    "React Native",
    "Expo",
    "Turborepo",
    "Clean Architecture",
    "DDD",
    "CQRS",
    "BDD",
    "mobile native",
  ],
  applicationCategory: "LifestyleApplication",
});

const faqSchema = buildFaqPageSchema(homecafeFaqItems);

export const metadata: Metadata = {
  title: "HomeCafe - Application de bien-être & productivité",
  description:
    "Mission freelance : conception et développement d'une app web + mobile de bien-être. 78 use cases, 526 tests, 18 domaines DDD, Clean Architecture + CQRS.",
  keywords: [
    "HomeCafe",
    "bien-être",
    "productivité",
    "application mobile",
    "Next.js",
    "Expo",
    "React Native",
    "Clean Architecture",
    "DDD",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/homecafe",
  },
  openGraph: {
    title: "HomeCafe - Application de bien-être & productivité",
    description:
      "Mission freelance : app complète de bien-être personnel. 78 use cases, 18 domaines DDD, 526 tests, Clean Architecture + CQRS.",
    url: "/portfolio/homecafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeCafe - Application de bien-être & productivité",
    description:
      "Mission freelance : app complète de bien-être personnel. 78 use cases, 18 domaines DDD, 526 tests, Clean Architecture + CQRS.",
  },
};

export default function HomecafePage() {
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
      <main className="pb-8">
        <div className="relative">
          <HomecafeBackdrop />
          <HomecafeHero />
          <HomecafeStats />
          <HomecafeContext />
          <HomecafeScreenshots />
          <HomecafeFeatures />
          <HomecafeArchitecture />
          <HomecafeTechStack />
          <HomecafeFaq />
          <HomecafeBottomCta />
        </div>
      </main>
    </>
  );
}
