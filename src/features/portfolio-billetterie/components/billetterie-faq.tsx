import { CaseFaq } from "@/src/shared/ui/portfolio/case-sections";

export const billetterieFaqItems = [
  {
    question: "Quel était le challenge technique principal ?",
    answer:
      "Construire un système de billetterie complet (plan 2D/3D interactif, ventes temps réel WebSocket, calcul automatique TVA et tarifs) en solo en 1 mois pour un événement précis avec deadline ferme.",
  },
  {
    question: "Pourquoi WebSocket et pas du polling ?",
    answer:
      "Le plan de salle devait refléter en temps réel les places vendues par d'autres opérateurs en parallèle. Polling = latence et conflits, WebSocket = synchronisation sub-200ms et UX fluide pour les agents en caisse.",
  },
  {
    question: "Combien de temps de la conception à la mise en production ?",
    answer:
      "1 mois calendaire, en solo, avec un client en parallèle. Adoption immédiate par l'équipe opérations le jour J.",
  },
  {
    question: "Quelle stack technique as-tu utilisée ?",
    answer:
      "Next.js 15 et React 19 (dashboard), NestJS (API + WebSocket), PostgreSQL avec Drizzle ORM, Seats.io pour le plan de salle 2D/3D. Déploiement Docker sur infra cliente.",
  },
];

export function BilletterieFaq() {
  return (
    <CaseFaq
      items={billetterieFaqItems}
      intro="Les questions que mes clients m'ont posées sur cette mission."
    />
  );
}
