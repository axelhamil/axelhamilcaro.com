import type { ReactNode } from "react";
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
      <Navbar />
      <div className="pt-20 sm:pt-25 px-4 sm:px-6 md:px-10">{children}</div>
    </>
  );
}
