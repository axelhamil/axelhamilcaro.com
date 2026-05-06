import { SITE_URL } from "@/app/_config/site.constants";

export type TmaPersona = {
  eyebrow: string;
  title: string;
  body: string;
};

export type TmaForfaitFeature = {
  label: string;
  premiumOnly?: boolean;
};

export type TmaForfait = {
  slug: "pro" | "premium";
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  hours: number;
  hoursLabel: string;
  hourlyOverflow: number;
  responseTime: string;
  meetingHours: string;
  recommended?: boolean;
  features: TmaForfaitFeature[];
};

export type TmaProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type TmaFaqItem = {
  question: string;
  answer: string;
};

export const TMA_URL = `${SITE_URL}/tma`;

export const TMA_META = {
  title:
    "TMA — Tierce Maintenance Applicative web/mobile à partir de 350€/mois",
  description:
    "Forfait mensuel de Tierce Maintenance Applicative (TMA) pour ton app web ou mobile : Next.js, React, Node, infra légère (Vercel, Railway, PostgreSQL). Bugs, sécurité, support, monitoring. PRO 350€/mois (5h) ou PREMIUM 600€/mois (10h). Sans engagement, résiliation self-service via Stripe.",
  keywords: [
    "tierce maintenance applicative",
    "TMA freelance",
    "TMA Next.js",
    "TMA React",
    "TMA Node",
    "maintenance application web",
    "maintenance app mobile",
    "forfait maintenance application",
    "support technique application web",
    "monitoring application",
    "freelance TMA France",
    "infogérance applicative freelance",
  ],
} as const;

export const TMA_HERO = {
  eyebrow: "// maintenance_applicative()",
  title: "Tierce Maintenance Applicative pour ton app en prod.",
  subtitle:
    "Forfait mensuel sans engagement, heures dédiées chaque mois, un seul interlocuteur freelance expérimenté. Tu gardes ton app web ou mobile vivante (bugs, sécurité, perf, support, infra légère) sans recruter et sans devoir tout réexpliquer à chaque ticket.",
  primaryCtaLabel: "Voir les forfaits",
  primaryCtaHref: "#forfaits",
  secondaryCtaLabel: "En discuter avant",
} as const;

export const TMA_PERSONAS: TmaPersona[] = [
  {
    eyebrow: "01",
    title: "Tu as une app en production",
    body: "Le produit tourne, des utilisateurs l'utilisent, mais personne ne gère les bugs, les correctifs sécurité et les mises à jour de dépendances qui s'accumulent. Le forfait PRO suffit pour 5h/mois ; le PREMIUM ajoute monitoring proactif, alertes et reporting mensuel pour les apps critiques.",
  },
  {
    eyebrow: "02",
    title: "Tu n'as plus de dev en interne",
    body: "Ton dev est parti, ton agence est trop chère pour 5 à 10h par mois, et tu ne veux pas recruter pour un besoin variable. Tu cherches un freelance expérimenté qui prend la stack au mois, sans engagement, et qui reste joignable au quotidien sur le canal défini ensemble.",
  },
  {
    eyebrow: "03",
    title: "Tu as besoin de réactivité",
    body: "Quand ton app crashe ou qu'un client bloque, tu n'as pas envie d'attendre 5 jours un devis. Sur PRO, prise en compte sous 1 jour ouvré maximum. Sur PREMIUM, sous une demi-journée ouvrée, avec support technique prioritaire et alertes monitoring qui te préviennent avant le client.",
  },
  {
    eyebrow: "04",
    title: "Tu as besoin d'un référent au quotidien",
    body: "Tu as régulièrement besoin d'exports de données, d'ajouter un utilisateur admin, de débloquer un compte, d'analyser un comportement bizarre ou de tirer un rapport custom. Toutes ces opérations passent dans tes heures incluses, sans avoir à expliquer le projet à un nouveau prestataire à chaque fois.",
  },
];

export const TMA_FORFAITS: TmaForfait[] = [
  {
    slug: "pro",
    name: "TMA PRO",
    tagline: "Pour garder ton app fiable et à jour.",
    description:
      "Suivi régulier de ton application en production : corrections de bugs, mises à jour de sécurité, support technique et interventions sous 1 jour ouvré pour garder ton application fiable et à jour.",
    price: 350,
    currency: "EUR",
    hours: 5,
    hoursLabel: "5h de maintenance incluses par mois",
    hourlyOverflow: 80,
    responseTime: "1 jour ouvré max",
    meetingHours: "1h/mois",
    features: [
      { label: "5h de maintenance incluses par mois" },
      { label: "Corrections de bugs et optimisation des performances" },
      { label: "Mises à jour des dépendances et correctifs de sécurité" },
      { label: "Support technique" },
      { label: "Prise en compte sous 1 jour ouvré maximum" },
      { label: "1h de visioconférence par mois (selon dispos communes)" },
      { label: "Hors-forfait : 80€/h" },
      { label: "Sans engagement, interventions du lundi au vendredi" },
    ],
  },
  {
    slug: "premium",
    name: "TMA PREMIUM",
    tagline: "Pour les apps critiques, monitoring et reporting compris.",
    description:
      "Accompagnement complet pour les applications critiques : monitoring proactif, optimisations continues, reporting mensuel et priorité sur les interventions sous une demi-journée ouvrée.",
    price: 600,
    currency: "EUR",
    hours: 10,
    hoursLabel: "10h d'intervention incluses par mois",
    hourlyOverflow: 70,
    responseTime: "1 demi-journée ouvrée",
    meetingHours: "2h/mois",
    recommended: true,
    features: [
      { label: "10h d'intervention incluses par mois" },
      { label: "Monitoring proactif et alertes", premiumOnly: true },
      {
        label: "Reporting mensuel et optimisations continues",
        premiumOnly: true,
      },
      { label: "Mises à jour des dépendances et correctifs de sécurité" },
      { label: "Support technique prioritaire", premiumOnly: true },
      {
        label: "Prise en compte sous 1 demi-journée ouvrée",
        premiumOnly: true,
      },
      { label: "2h de visioconférence par mois (selon dispos communes)" },
      { label: "Hors-forfait : 70€/h", premiumOnly: true },
      { label: "Sans engagement, interventions du lundi au vendredi" },
    ],
  },
];

export const TMA_PROCESS: TmaProcessStep[] = [
  {
    step: "01",
    title: "Tu choisis ton forfait",
    body: "PRO ou PREMIUM, paiement Stripe sécurisé, facture automatique chaque mois. Sans engagement : tu peux changer de forfait, mettre à jour ton moyen de paiement ou résilier en self-service depuis ton portail Stripe à tout moment.",
  },
  {
    step: "02",
    title: "Onboarding sous 48h",
    body: "Visio de cadrage : on fait le tour de ton app, des accès (repo, hosting, domaines, monitoring), de la stack et des priorités du moment. Tu gardes ta doc, je m'adapte à ton organisation.",
  },
  {
    step: "03",
    title: "On démarre le mois 1",
    body: "Tu m'envoies tes tickets sur le canal défini ensemble (email, WhatsApp, Slack, Discord). Je les traite selon le SLA du forfait : 1 jour ouvré sur PRO, 1 demi-journée sur PREMIUM. Maintenance et sécurité d'abord, évolutions ensuite.",
  },
  {
    step: "04",
    title: "On suit, on ajuste, on rapporte",
    body: "Volant de visioconférence à caler selon nos dispos (1h en PRO, 2h en PREMIUM, certains mois sans). On passe les tickets en revue, on priorise, on planifie les évolutions. Sur PREMIUM : reporting mensuel écrit garanti, avec optimisations continues et suivi des alertes monitoring.",
  },
];

export const TMA_FAQ: TmaFaqItem[] = [
  {
    question: "Et si je dépasse les heures incluses dans le forfait ?",
    answer:
      "Les heures supplémentaires sont facturées au tarif hors-forfait : 80€/h sur le forfait PRO, 70€/h sur le forfait PREMIUM, avec ton accord écrit avant intervention. Pas de surprise sur la facture. Si le dépassement devient récurrent, on rebascule sur le forfait au-dessus.",
  },
  {
    question: "Comment se passe la résiliation ?",
    answer:
      "Sans engagement, résiliation en self-service via ton portail Stripe (Customer Portal) accessible depuis le lien de ta facture. Le forfait s'arrête à la fin de la période déjà payée, sans démarche supplémentaire de mon côté. Je te transmets un handover propre (accès, doc, état des chantiers en cours) avant la clôture.",
  },
  {
    question: "Je peux changer de forfait en cours de route ?",
    answer:
      "Oui, à tout moment. Si tu démarres en PRO et que ton volume grimpe, on passe en PREMIUM dès le mois suivant (ou tout de suite, au prorata). Inversement, tu peux redescendre en PRO si tu n'as plus besoin du monitoring proactif et du reporting.",
  },
  {
    question: "Quels canaux de support et quels délais ?",
    answer:
      "Le canal est défini avec toi au démarrage : email, WhatsApp, Slack, Discord ou autre, selon ton organisation. Du lundi au vendredi. Sur PRO, prise en compte sous 1 jour ouvré maximum. Sur PREMIUM, sous une demi-journée ouvrée, avec en plus du monitoring proactif et des alertes pour anticiper les incidents avant que tu les remarques.",
  },
  {
    question: "Sur quelles stacks tu interviens ?",
    answer:
      "Apps web et mobile sur Next.js, React et Node. Backend ou frontend, je maintiens les deux. Côté infra, je gère les déploiements légers : Vercel, Railway, PostgreSQL, Cloudflare, et tout ce qui ressemble. Si ton app est sur une stack proche (NestJS, Fastify, Prisma, Drizzle, Expo, Capacitor), on regarde ensemble avant de signer.",
  },
  {
    question: "Est-ce que tu fais aussi des nouvelles features ?",
    answer:
      "Oui, dans la limite des heures de ton forfait (5h/mois en PRO, 10h/mois en PREMIUM). Maintenance, bugs et correctifs sécurité passent en priorité. Pour une feature plus lourde (>3 jours), on cadre en mission séparée pour ne pas cannibaliser les heures de support.",
  },
  {
    question: "On fait des points réguliers ?",
    answer:
      "Le forfait inclut un volant de visioconférence à utiliser dans le mois (1h sur PRO, 2h sur PREMIUM). On la cale selon nos dispos communes : certains mois on prend tout d'un coup, d'autres on découpe en 2-3 calls courts, et il peut y avoir des mois sans visio si rien ne le justifie ou si l'agenda ne le permet pas. Les heures non utilisées ne sont pas reportées. Sur PREMIUM, le reporting mensuel écrit est garanti même sans visio.",
  },
  {
    question: "Comment se passe la facturation ?",
    answer:
      "Tu t'abonnes via Stripe directement depuis cette page. La facture est générée automatiquement chaque mois et envoyée à l'email du compte. Tu retrouves l'historique dans ton portail Stripe (Customer Portal) et tu peux mettre à jour ton moyen de paiement à tout moment.",
  },
  {
    question: "Et si tu es en vacances ou indisponible ?",
    answer:
      "Je préviens 2 semaines à l'avance pour les périodes prévues (>2 jours d'indisponibilité). Sur PREMIUM, si l'indisponibilité dépasse 3 jours ouvrés sur le mois, on prorate les heures non consommées. Le monitoring continue de tourner et de t'alerter pendant ces périodes.",
  },
  {
    question: "Tu peux gérer la TMA d'un client à moi ?",
    answer:
      "Oui, c'est même fréquent : agences, ESN, ou freelances qui veulent déléguer la TMA d'un client final. On signe un contrat de sous-traitance, je reste invisible côté client si tu préfères, et tu gardes la relation commerciale. Conditions détaillées sur demande.",
  },
];
