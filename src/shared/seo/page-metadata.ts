import type { Metadata } from "next";
import { AUTHOR, SITE_URL } from "@/app/_config/site.constants";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "profile" | "article";
  keywords?: string[];
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
}: PageMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} · ${AUTHOR.name}`;

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      siteName: AUTHOR.name,
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@axelhamilcaro",
    },
  };
}
