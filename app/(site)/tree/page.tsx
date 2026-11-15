import type { Metadata } from "next";
import { PERSON_ID, SITE_URL } from "@/app/_config/site.constants";
import { treeLinkService } from "@/src/backend/tree-links/tree-link.service";
import TreeHeader from "@/src/features/tree/components/header";
import TreeContact from "@/src/features/tree/components/tree-contact";
import TreeLinksWrapper from "@/src/features/tree/components/tree-links-wrapper";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Liens : LinkedIn, GitHub, Malt, rendez-vous",
  description:
    "Tous mes liens au même endroit : LinkedIn, GitHub, Malt, Instagram, TikTok et prise de rendez-vous. Je suis Axel Hamilcaro, développeur fullstack et builder.",
  path: "/tree",
});

export const revalidate = 60;

export default async function TreePage() {
  const links = await treeLinkService.listActive();

  const linksPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/tree`,
    url: `${SITE_URL}/tree`,
    name: "Liens d'Axel Hamilcaro",
    about: { "@id": PERSON_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    inLanguage: "fr-FR",
  };

  return (
    <main className="trame pleine-largeur min-h-[calc(100svh-var(--nav-h))]">
      <JsonLdScript data={linksPageJsonLd} />
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-10">
        <TreeHeader />
        <TreeContact />
        <TreeLinksWrapper links={links} />
      </div>
    </main>
  );
}
