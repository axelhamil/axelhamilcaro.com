import type { ReactNode } from "react";
import { Toaster } from "sonner";
import Footer from "@/src/shared/layouts/footer";
import Navbar from "@/src/shared/layouts/navbar";
import { SiteWidgets } from "@/src/shared/layouts/site-widgets";
import { WebMcpBootstrap } from "@/src/shared/webmcp/webmcp-bootstrap";

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
      <WebMcpBootstrap />
      <SiteWidgets />
      <Navbar />
      <div
        id="main-content"
        className="pt-[var(--nav-h)] px-4 sm:px-6 md:px-10"
      >
        {children}
      </div>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
