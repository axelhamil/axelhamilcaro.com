import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "À propos d'Axel Hamilcaro, développeur fullstack et builder";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "À propos",
    title: "Les briques sur lesquelles",
    accent: "d'autres construisent.",
    subtitle:
      "Tours. Builder open source, dev chez Eskimoz. 4 ans chez Civitime, de dev à lead tech.",
    ribbon: ["À propos", "Parcours", "Méthode", "Serveur MCP"],
    withPhoto: true,
    stamp: { top: "Build log", bottom: "N° 001" },
  });
}
