import { type ReactNode, ViewTransition } from "react";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/src/features/blog/components/scroll-to-top";
import Footer from "@/src/shared/layouts/footer";
import Navbar from "@/src/shared/layouts/navbar";
import { MagneticField } from "@/src/shared/ui/effects/magnetic-field";
import { WebMcpBootstrap } from "@/src/shared/webmcp/webmcp-bootstrap";

export default function BlogLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <WebMcpBootstrap />
      <MagneticField />
      <Navbar />
      <ViewTransition default="none" exit="auto">
        <div id="main-content" className="page-marges pt-[var(--nav-h)]">
          <ViewTransition>{children}</ViewTransition>
        </div>
      </ViewTransition>
      <Footer />
      <ScrollToTop />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
