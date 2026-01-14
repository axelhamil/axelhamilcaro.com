import type { ReactNode } from "react";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ClickSpark, EmojiRain } from "@/components/effects/emoji-rain";
import { KeyStatsWidget } from "@/components/shared/widgets/key-stats";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import Navbar from "@/app/_components/shared/layouts/navbar";
import { JsonLd } from "@/app/_components/shared/seo/json-ld";

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
      <ScrollProgress />
      <CustomCursor />
      <EmojiRain />
      <ClickSpark />
      <KeyStatsWidget />
      <Navbar />
      <div id="main-content" className="sm:pt-25 px-4 sm:px-6 md:px-10">
        {children}
      </div>
    </>
  );
}
