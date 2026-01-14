import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";

export const metadata: Metadata = {
  title: "Liens",
  description:
    "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
  openGraph: {
    title: "Liens | Axel Hamilcaro",
    description:
      "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
    url: `${SITE_URL}/tree`,
  },
  twitter: {
    title: "Liens | Axel Hamilcaro",
    description:
      "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
  },
  alternates: {
    canonical: `${SITE_URL}/tree`,
  },
};
