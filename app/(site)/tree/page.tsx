import type { Metadata } from "next";
import { treeLinkService } from "@/src/backend/tree-links/tree-link.service";
import TreeFooter from "@/src/features/tree/components/footer";
import TreeHeader from "@/src/features/tree/components/header";
import TreeLinksWrapper from "@/src/features/tree/components/tree-links-wrapper";

export const metadata: Metadata = {
  title: "Liens et Réseaux",
  description:
    "Retrouvez tous mes liens professionnels : LinkedIn, GitHub, Malt, et plus. Connectez-vous avec Axel Hamilcaro, développeur Full-Stack freelance à Paris.",
  alternates: {
    canonical: "/tree",
  },
  openGraph: {
    title: "Liens et Réseaux",
    description:
      "Retrouvez tous mes liens professionnels : LinkedIn, GitHub, Malt, et plus. Connectez-vous avec Axel Hamilcaro, développeur Full-Stack freelance à Paris.",
    url: "/tree",
  },
};

export const revalidate = 1800;

export default async function TreePage() {
  const links = await treeLinkService.listActive();

  return (
    <main className="relative h-full flex flex-col items-center justify-start px-4 pt-20 sm:pt-0 overflow-hidden">
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6">
        <TreeHeader />
        <TreeLinksWrapper links={links} />
        <TreeFooter />
      </div>
    </main>
  );
}
