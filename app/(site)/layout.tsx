"use client";

import type { ReactNode } from "react";
import { CustomCursor } from "@/app/_components/shared/effects/custom-cursor";
import {
  ClickSpark,
  EmojiRain,
} from "@/app/_components/shared/effects/emoji-rain";
import { KeyStatsWidget } from "@/app/_components/shared/effects/key-stats";
import { ScrollProgress } from "@/app/_components/shared/effects/scroll-progress";
import Navbar from "@/app/_components/shared/layouts/navbar";
import { JsonLd } from "@/app/_components/shared/seo/json-ld";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <CustomCursor />
      <EmojiRain />
      <ClickSpark />
      <KeyStatsWidget />
      <Navbar />
      <div className="sm:pt-25 px-4 sm:px-6 md:px-10">{children}</div>
    </>
  );
}
