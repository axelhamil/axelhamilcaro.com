import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { geistMono, geistSans, spaceGrotesk } from "./_config/fonts";
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
        "antialiased bg-primary-background",
      )}
    >
      <body className="overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
