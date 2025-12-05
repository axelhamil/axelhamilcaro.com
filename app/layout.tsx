import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./global.css";
import type { ReactNode } from "react";
import Navbar from "./_components/navbar";

const interSans = Inter({
  variable: "--font-inter-sans",
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
    <html lang="fr">
      <body className={`${interSans.variable} antialiased pt-15`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
