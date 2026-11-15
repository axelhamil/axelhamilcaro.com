import { RATES } from "@/app/_config/site.constants";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Axel Hamilcaro, développeur Next.js freelance : MVP, refonte et architecture";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service · Développement sur mesure",
    title: "Développeur Next.js",
    accent: "freelance.",
    subtitle: `MVP en 4 à 8 semaines, refonte d'app, TypeScript, React 19. ${RATES.dailyHtEur} € HT par jour.`,
    stamp: { top: "Next.js", bottom: "Depuis 2021" },
    ribbon: ["Next.js", "React 19", "TypeScript", "MVP", "Refonte"],
  });
}
