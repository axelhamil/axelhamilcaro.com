import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Service Développeur Next.js Freelance — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service freelance",
    title: "Développeur Next.js freelance",
    subtitle: "Architecture, MVP, refonte, intégration IA · Devis sous 24h",
  });
}
