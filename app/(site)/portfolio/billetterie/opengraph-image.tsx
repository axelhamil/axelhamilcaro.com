import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Étude de cas Billetterie, dashboard événementiel conçu par Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Étude de cas · Dashboard",
    title: "Billetterie",
    accent: "dashboard événements.",
    subtitle:
      "Plan de salle 2D/3D, ventes en temps réel par WebSocket, tarification multi-TVA. Solo en 1 mois.",
    ribbon: ["Billetterie", "WebSocket", "Plan 2D/3D", "Conçu en solo"],
    stamp: { top: "Expédié", bottom: "1 mois" },
  });
}
