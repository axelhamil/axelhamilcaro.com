import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/src/shared/ui/theme/theme-provider";
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
      suppressHydrationWarning
      className={cn(
        `${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`,
        "antialiased bg-primary-background",
      )}
    >
      <body className="overflow-x-hidden">
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
