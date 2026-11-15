import { RATES } from "@/app/_config/site.constants";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Services freelance d'Axel Hamilcaro, développeur fullstack : application web, SaaS, lead tech et TMA";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Services freelance",
    title: "Développeur fullstack",
    accent: "freelance.",
    subtitle: `Application de A à Z, dev sur mesure, SaaS, lead tech, TMA. ${RATES.dailyHtEur} € HT par jour, devis en 24h.`,
    stamp: { top: "Devis", bottom: "Sous 24h" },
    ribbon: ["Application web", "SaaS", "Lead tech", "TMA", "Tours et remote"],
  });
}
