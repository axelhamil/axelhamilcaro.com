import type { Metadata } from "next";
import { AboutCredentials } from "@/src/features/about/components/about-credentials";
import { AboutHero } from "@/src/features/about/components/about-hero";
import { AboutProof } from "@/src/features/about/components/about-proof";
import { AboutStory } from "@/src/features/about/components/about-story";
import { AboutValues } from "@/src/features/about/components/about-values";
import Footer from "@/src/shared/layouts/footer";
import { buildAboutPageSchema } from "@/src/shared/seo/schemas/about-page";

const ABOUT_URL = "https://axelhamilcaro.com/about";

export const metadata: Metadata = {
  title: "À propos — Axel Hamilcaro, développeur full-stack freelance",
  description:
    "Développeur full-stack freelance depuis 2021. Formé à la Wild Code School. Lead technique 4 ans chez Civitime. 10+ projets livrés en autonomie. Focus Next.js, React, Node.js, intégration IA.",
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    title: "À propos — Axel Hamilcaro",
    description:
      "Développeur full-stack freelance basé en Touraine. 5 ans d'expérience, 10+ projets livrés. Focus Next.js, React, Node.js, intégration IA.",
    url: ABOUT_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos — Axel Hamilcaro",
    description:
      "Développeur full-stack freelance basé en Touraine. 5 ans d'expérience, 10+ projets livrés.",
  },
};

const aboutSchema = buildAboutPageSchema({
  url: ABOUT_URL,
  name: "À propos — Axel Hamilcaro",
  description:
    "Page de présentation d'Axel Hamilcaro, développeur full-stack freelance basé en Touraine.",
});

export default function AboutPage() {
  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCredentials />
      <AboutProof />
      <Footer />
    </main>
  );
}
