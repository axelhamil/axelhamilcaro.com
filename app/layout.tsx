import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./_components/navbar";
import cn from "../lib/cn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axel Hamilcaro Website",
  description: "My Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        `${geistSans.variable} ${geistMono.variable} antialiased pt-25 px-10 bg-grid transition-all ease-in-out duration-500`,
      )}
    >
      <body>
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
