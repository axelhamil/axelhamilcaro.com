import { CaseFaq } from "@/src/shared/ui/portfolio/case-sections";

export const civitimeFaqItems = [
  {
    question:
      "Pourquoi une refonte Clean Architecture + DDD + event sourcing ?",
    answer:
      "La codebase legacy de Civitime souffrait de couplage fort métier/techno. Refonte progressive vers DDD et event sourcing pour permettre l'audit complet de l'historique RSE et faciliter l'ajout de nouvelles métriques sans casser l'existant.",
  },
  {
    question: "Qu'est-ce que l'éditeur IA RAG a apporté concrètement ?",
    answer:
      "Les pédagogues utilisaient une chaîne d'outils manuels pour produire le contenu RSE. Avec le RAG (corpus interne et GPT-4) intégré dans l'éditeur, les délais d'itération ont été divisés par 2 sans dégrader la qualité éditoriale.",
  },
  {
    question: "Tu étais lead technique seul ou avec une équipe ?",
    answer:
      "Lead technique au sein d'une équipe produit. Je définissais l'architecture, codais les fondations, et accompagnais les autres devs en revue et pair programming.",
  },
  {
    question: "Combien de temps a duré la mission ?",
    answer:
      "4 ans (janvier 2021 à décembre 2024). Civitime est mon plus long engagement et ma meilleure école produit.",
  },
];

export function CivitimeFaq() {
  return (
    <CaseFaq
      items={civitimeFaqItems}
      intro="Les questions que mes clients m'ont posées sur cette mission."
    />
  );
}
