import { type ReactNode, ViewTransition } from "react";
import { Toaster } from "sonner";
import Footer from "@/src/shared/layouts/footer";
import Navbar from "@/src/shared/layouts/navbar";
import { SiteWidgets } from "@/src/shared/layouts/site-widgets";
import { MagneticField } from "@/src/shared/ui/effects/magnetic-field";
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
        className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-3"
      >
        Aller au contenu principal
      </a>
      <WebMcpBootstrap />
      <MagneticField />
      <Navbar />
      <ViewTransition default="none" exit="auto">
        <div id="main-content" className="page-marges pt-[var(--nav-h)]">
          <ViewTransition>{children}</ViewTransition>
        </div>
      </ViewTransition>
      <Footer />
      <SiteWidgets />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
