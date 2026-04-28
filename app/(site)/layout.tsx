import type { ReactNode } from "react";
import { Toaster } from "sonner";
import Navbar from "@/src/shared/layouts/navbar";
import { SiteWidgets } from "@/src/shared/layouts/site-widgets";
import { JsonLd } from "@/src/shared/seo/json-ld";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        Aller au contenu principal
      </a>
      <JsonLd />
      <SiteWidgets />
      <Navbar />
      <div id="main-content" className="sm:pt-25 px-4 sm:px-6 md:px-10">
        {children}
      </div>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
