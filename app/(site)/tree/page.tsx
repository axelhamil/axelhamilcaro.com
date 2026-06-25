import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { treeLinkService } from "@/src/backend/tree-links/tree-link.service";
import TreeHeader from "@/src/features/tree/components/header";
import TreeLinksWrapper from "@/src/features/tree/components/tree-links-wrapper";

export const metadata: Metadata = {
  title: "Liens et Réseaux",
  description:
    "Retrouvez mes liens professionnels : LinkedIn, GitHub, Malt, rendez-vous. Axel Hamilcaro, dev freelance Next.js, React, Node.js, Touraine, remote France.",
  alternates: {
    canonical: "/tree",
  },
  openGraph: {
    title: "Liens et Réseaux",
    description:
      "Retrouvez mes liens professionnels : LinkedIn, GitHub, Malt, rendez-vous. Axel Hamilcaro, dev freelance Next.js, React, Node.js, Touraine, remote France.",
    url: "/tree",
  },
};

export const revalidate = 60;

export default async function TreePage() {
  const links = await treeLinkService.listActive();

  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/tree`,
    url: `${SITE_URL}/tree`,
    name: "Axel Hamilcaro : liens et réseaux",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    about: { "@id": `${SITE_URL}/#person` },
    inLanguage: "fr-FR",
  };

  return (
    <main className="relative min-h-[calc(100svh-var(--nav-h))] flex flex-col items-center pt-6 sm:pt-10 pb-12 overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6">
        <TreeHeader />
        <TreeLinksWrapper links={links} />
      </div>
    </main>
  );
}
