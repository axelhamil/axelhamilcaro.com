import { LEGAL_ENTITY } from "@/app/_config/site.constants";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Mentions légales du site axelhamilcaro.com";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Légal · Site axelhamilcaro.com",
    title: "Mentions",
    accent: "légales.",
    subtitle: `Axel Hamilcaro EI, SIRET ${LEGAL_ENTITY.siret}, hébergé par Vercel.`,
    ribbon: ["Mentions légales", "LCEN", "RGPD", "Cookies"],
  });
}
