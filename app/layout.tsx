import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import Navbar from "./_components/shared/layouts/navbar";
import { JsonLd } from "./_components/shared/seo/json-ld";
import { geistMono, geistSans, spaceGrotesk } from "./_config/fonts";
import cn from "./_lib/cn";
import "./global.css";

export { metadata } from "./_config/metadata";
export { viewport } from "./_config/viewport";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        `${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`,
        "antialiased pt-20 sm:pt-25 px-4 sm:px-6 md:px-10 bg-primary-background",
      )}
    >
      <body className="overflow-x-hidden">
        <JsonLd />
        <Navbar />
        <div className="relative">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
