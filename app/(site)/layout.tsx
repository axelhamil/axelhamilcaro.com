"use client";

import type { ReactNode } from "react";
import Navbar from "@/app/_components/shared/layouts/navbar";
import { JsonLd } from "@/app/_components/shared/seo/json-ld";
import { KonamiEasterEgg } from "@/app/_components/shared/effects/konami-easter-egg";
import { CustomCursor } from "@/app/_components/shared/effects/custom-cursor";
import { ScrollProgress } from "@/app/_components/shared/effects/scroll-progress";

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
      <KonamiEasterEgg />
      <Navbar />
      <div className="pt-20 sm:pt-25 px-4 sm:px-6 md:px-10">{children}</div>
    </>
  );
}
