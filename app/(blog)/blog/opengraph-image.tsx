import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Blog d'Axel Hamilcaro, développeur fullstack et builder";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Ce que je fabrique,",
    accent: "ce que j'en apprends.",
    subtitle:
      "Architecture, sécurité logicielle, Next.js, coûts et retours d'expérience.",
    ribbon: ["Blog", "Guides", "Études de cas", "Traductions"],
    stamp: { top: "Carnet", bottom: "de bord" },
  });
}
