import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Service Développement SaaS Freelance — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service freelance",
    title: "Développement SaaS",
    subtitle:
      "Multi-tenant · Clean Architecture · DDD · Référence ScormPilot (5 apps solo)",
  });
}
