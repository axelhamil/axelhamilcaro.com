import type { ReactNode } from "react";
import { BlogNavbar } from "@/src/features/blog/components/blog-navbar";
import { ScrollToTop } from "@/src/features/blog/components/scroll-to-top";
import Footer from "@/src/features/home/components/footer";

export default function BlogLayout({
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
      <BlogNavbar />
      <div id="main-content" className="pt-20">
        {children}
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}
