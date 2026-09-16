import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/src/shared/seo/json-ld";
import { ThemeProvider } from "@/src/shared/ui/theme/theme-provider";
import {
  courierPrime,
  fraunces,
  geistMono,
  instrumentSans,
} from "./_config/fonts";
import { MCP } from "./_config/site.constants";
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
        `${instrumentSans.variable} ${geistMono.variable} ${fraunces.variable} ${courierPrime.variable}`,
        "antialiased bg-primary-background",
      )}
    >
      <head>
        <link
          rel="alternate"
          type="application/ai-catalog+json"
          href={MCP.aiCatalogUrl}
        />
        <link
          rel="alternate"
          type="application/mcp-server-card+json"
          href={MCP.serverCardUrl}
        />
        <link rel="alternate" type="application/json" href={MCP.manifestUrl} />
        <link rel="alternate" type="text/plain" href={MCP.llmsUrl} />
      </head>
      <body className="overflow-x-hidden">
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <JsonLd />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
