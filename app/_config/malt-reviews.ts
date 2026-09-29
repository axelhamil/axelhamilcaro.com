export const MALT_REVIEWS_SOURCE = "https://www.malt.fr/profile/axelhamilcaro";

interface MaltReviewer {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
}

export interface MaltAppraisal {
  reviewer: MaltReviewer;
  date: string;
  rating: number;
  body: string;
}

export interface MaltRecommendation {
  reviewer: MaltReviewer;
  date: string;
  body: string;
}

const ANTHONY: MaltReviewer = {
  id: "reviewer-anthony",
  name: "Anthony",
  jobTitle: "Dev full stack",
  company: "Civitime",
};

const RAPHAEL: MaltReviewer = {
  id: "reviewer-raphael-le-cras",
  name: "Raphael Le Cras",
  jobTitle: "Fondateur d'OpenUp",
  company: "OpenUp",
};

const BRYAN: MaltReviewer = {
  id: "reviewer-bryan-kaneb",
  name: "Bryan Kaneb",
  jobTitle: "Développeur web",
  company: "Freelance Malt",
};

export const MALT_APPRAISALS: MaltAppraisal[] = [
  {
    reviewer: ANTHONY,
    date: "2026-08-28",
    rating: 5,
    body: "Je travaille avec Axel depuis plusieurs années sur différents projets. Son travail est toujours d'une très grande qualité. Je n'ai rien à redire. Il comprend les problématiques de ces clients, et adapte sa mission en fonction des besoins terrain. Je recommande !",
  },
  {
    reviewer: RAPHAEL,
    date: "2026-08-28",
    rating: 5,
    body: "Un client m’a signalé un bug, que j’ai immédiatement transmis à Axel. Il l’a rapidement identifié et corrigé. Très efficace encore une fois.",
  },
  {
    reviewer: RAPHAEL,
    date: "2026-07-31",
    rating: 5,
    body: "Encore une collaboration très efficace avec Axel, cette fois sur la refonte stratégique de notre onboarding. Le design livré sur Figma a été réalisé parfaitement.",
  },
  {
    reviewer: RAPHAEL,
    date: "2026-07-15",
    rating: 5,
    body: "J’ai eu besoin de mettre en place un nouveau système de quotas pour améliorer mes conversions. Le délai de ce changement était de 48h, et Axel l’a réalisé dans l’après-midi même. Toujours aussi fiable et efficace !",
  },
  {
    reviewer: RAPHAEL,
    date: "2026-07-01",
    rating: 5,
    body: "J’ai eu besoin d’un changement urgent d’une fonctionnalité sur plan gratuit de mon app, et Axel l’a modifié dans l’après-midi même de ma demande. Très réactif et la demande a été réalisé correctement.",
  },
  {
    reviewer: RAPHAEL,
    date: "2026-06-30",
    rating: 5,
    body: "Axel est le développeur derrière OpenUp depuis le lancement, et travailler avec lui est un vrai plus. Sur ce projet (désactivation automatique des liens lors d'un downgrade de plan et système de modération/bannissement de comptes), le travail a été propre et livré dans les délais. Il a également pris le temps de mettre à jour l'application et de corriger un bug d'une fonctionnalité. Je lui confie la partie technique de mon produit en confiance et je continue à travailler avec lui. Je ne peux que le recommander de nouveau.",
  },
];

export const MALT_RECOMMENDATIONS: MaltRecommendation[] = [
  {
    reviewer: RAPHAEL,
    date: "2026-05-08",
    body: "Je recommande Axel à 100%. Il a réussi à reprendre de zéro mon projet SaaS qui était au point mort depuis plusieurs mois. Au-delà de l'exécution technique, Axel m'a accompagné de A à Z avec une grande pédagogie sur les choix technologiques. Côté UI/UX, il est extrêmement attentif aux détails et a reproduit mes templates à la perfection. Sa réactivité et son implication sont rares. Je continuerai de travailler avec lui en toute confiance pour la suite de l'aventure.",
  },
  {
    reviewer: BRYAN,
    date: "2025-12-19",
    body: "J’ai fait appel à Axel pour un projet React/Node et la collaboration s’est très bien passée. Axel a une vraie solidité technique, il structure bien son code, pose les bonnes questions en amont et livre un travail propre. Au-delà des compétences pures, c’est sa fiabilité qui m’a marqué, il respecte ses engagements et sait anticiper les problèmes avant qu’ils n’arrivent. La communication était simple et directe, ce qui facilite grandement le suivi du projet. C’est un profil sur lequel on peut s’appuyer. Je le recommande vivement pour vos projets de développements web ou mobile.",
  },
];
