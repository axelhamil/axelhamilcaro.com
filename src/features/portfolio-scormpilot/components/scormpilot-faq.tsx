import { CaseFaq } from "@/src/shared/ui/portfolio/case-sections";

export const scormpilotFaqItems = [
  {
    question: "Pourquoi 5 applications séparées et pas un monolithe ?",
    answer:
      "Chaque app a un cycle de release différent : API et dashboard évoluent vite, lecteur et runtime SCORM doivent rester stables et fonctionner offline (clients = organismes de formation), et l'app Teams suit les contraintes Microsoft.",
  },
  {
    question: "Multi-tenancy, comment c'est implémenté ?",
    answer:
      "Schema-per-tenant PostgreSQL avec migration automatique à l'onboarding client. Isolation forte des données (exigence des organismes de formation pour leurs apprenants).",
  },
  {
    question: "Combien de joueurs supportés en production ?",
    answer:
      "Plusieurs milliers de sessions quotidiennes au moment du lancement. Architecture pensée pour scale horizontal sans intervention manuelle.",
  },
  {
    question: "Tu as livré ça vraiment seul ?",
    answer:
      "Oui, en solo de juin 2025 à aujourd'hui. Stack moderne + Clean Architecture + CI/CD = un dev autonome peut livrer un SaaS multi-app. C'est la promesse de mon offre développement SaaS.",
  },
];

export function ScormpilotFaq() {
  return (
    <CaseFaq
      items={scormpilotFaqItems}
      intro="Les questions que mes clients m'ont posées sur cette mission."
    />
  );
}
