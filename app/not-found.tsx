import type { Metadata } from "next";
import { FragmentHunt } from "@/src/features/not-found/components/fragment-hunt";
import { NotFoundLabel } from "@/src/features/not-found/components/not-found-label";
import Navbar from "@/src/shared/layouts/navbar";

export const metadata: Metadata = {
  title: "Page introuvable",
  description:
    "Cette page n'existe pas ou a changé d'adresse. Retrouve mes builds, mes services et mon blog depuis la page d'accueil d'axelhamilcaro.com.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="trame min-h-svh pt-[var(--nav-h)]">
        <div className="container mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <NotFoundLabel />
          <FragmentHunt />
        </div>
      </main>
    </>
  );
}
