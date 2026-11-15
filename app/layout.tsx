import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TraverseTransition } from "@/src/shared/ui/navigation/traverse-transition";
import { ThemeProvider } from "@/src/shared/ui/theme/theme-provider";
import { geistMono, inter } from "./_config/fonts";
import { MCP } from "./_config/site.constants";
import "./global.css";

export { metadata } from "./_config/metadata";
export { viewport } from "./_config/viewport";

export default function RootLayout({
  children,
  identity,
}: Readonly<{
  children: ReactNode;
  identity: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        inter.variable,
        geistMono.variable,
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
        {identity}
        <TraverseTransition />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
