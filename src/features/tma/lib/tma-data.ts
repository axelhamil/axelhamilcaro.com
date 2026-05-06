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

export type TmaMonitoringTool = {
  name: string;
  tagline: string;
  body: string;
  url: string;
};

export type TmaPrerequisite = {
  title: string;
  body: string;
};

export type TmaExclusion = {
  title: string;
  body: string;
};

export type TmaDeliverable = {
  title: string;
  tagline: string;
  body: string;
  cadence: string;
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
      "Forfait Pro de TMA pour applications en production : 5h/mois d'intervention (correctifs, optimisation, mises à jour sécurité/dépendances, ajustements techniques mineurs, petites évolutions, support e-mail). Prise en charge sous 1 jour ouvré. 1h de visio incluse par mois. Hors-forfait : 80€/h. Sans engagement, reconduction mensuelle.",
    price: 350,
    currency: "EUR",
    hours: 5,
    hoursLabel: "5h de maintenance incluses par mois",
    hourlyOverflow: 80,
    responseTime: "1 jour ouvré",
    meetingHours: "1h/mois",
    features: [
      { label: "5h de maintenance incluses par mois" },
      { label: "Corrections de bugs et optimisation des performances" },
      { label: "Mises à jour des dépendances et correctifs de sécurité" },
      {
        label: "Ajustements techniques mineurs (logs, requêtes, stabilité)",
      },
      {
        label: "Petites évolutions (exports, configurations, documentation)",
      },
      { label: "Support technique" },
      { label: "Prise en compte sous 1 jour ouvré" },
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
      "Forfait Premium de TMA pour applications critiques : monitoring proactif (Sentry, UptimeRobot, Better Stack à provisionner par le client), mises à jour de sécurité, correction de bugs, optimisations, reporting mensuel et support. Inclus : 10h/mois, 2h de visio, prise en charge sous une demi-journée ouvrée. Hors-forfait : 80€/h. Sans engagement, reconduction mensuelle.",
    price: 600,
    currency: "EUR",
    hours: 10,
    hoursLabel: "10h d'intervention incluses par mois",
    hourlyOverflow: 80,
    responseTime: "1 demi-journée ouvrée",
    meetingHours: "2h/mois",
    recommended: true,
    features: [
      { label: "10h d'intervention incluses par mois" },
      {
        label:
          "Monitoring proactif et alertes (Sentry, UptimeRobot, Better Stack)",
        premiumOnly: true,
      },
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
      { label: "2h de visioconférence incluses par mois" },
      { label: "Hors-forfait : 80€/h" },
      { label: "CHANGELOG mensuel annoté", premiumOnly: true },
      { label: "Audit perf / sécu trimestriel", premiumOnly: true },
      { label: "Status page publique", premiumOnly: true },
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
      "Les heures supplémentaires sont facturées 80€/h sur les deux forfaits, avec ton accord écrit avant intervention. Pas de surprise sur la facture. Si le dépassement devient récurrent, on rebascule sur le forfait au-dessus (PRO → PREMIUM) plutôt que d'empiler les heures hors-forfait.",
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
      "Sur PRO, le canal est défini au démarrage : email, WhatsApp, Slack ou autre, selon ton organisation. Sur PREMIUM, tu bénéficies en plus d'un canal de support dédié (channel partagé permanent sur Slack, Discord, WhatsApp, Teams, Google Chat ou l'outil que tu utilises déjà) pour un suivi plus fluide et plus traçable. Du lundi au vendredi dans tous les cas. Prise en compte sous 1 jour ouvré max sur PRO, sous 1 demi-journée ouvrée sur PREMIUM, avec monitoring proactif et alertes pour anticiper les incidents avant que tu les remarques.",
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
    question: "Qui paie les outils de monitoring (Sentry, UptimeRobot, etc.) ?",
    answer:
      "Les outils sont provisionnés à ton nom (souveraineté des données, tu en restes propriétaire). Dans 90% des cas, les free tiers suffisent largement (Sentry 5k events/mois, UptimeRobot 50 monitors, Better Stack 1GB de logs/jour). Si ton volume dépasse, le surcoût est à ta charge directement chez l'éditeur (≈26$/mois sur Sentry au-delà du free tier). Le setup, la configuration et la surveillance restent inclus dans tes 10h PREMIUM.",
  },
  {
    question: "Quels accès tu as besoin pour démarrer ?",
    answer:
      "Repo Git (ou ZIP du code source à défaut), accès au hosting (Vercel, Railway, DigitalOcean, etc.), domaine et zone DNS si pertinent, secrets et variables d'environnement transmis via un gestionnaire (1Password, Bitwarden, repo privé chiffré, etc.), accès admin de l'application si applicable, et un référent technique côté client pour le cadrage initial. Tout est listé en checklist au moment de l'onboarding pour ne rien oublier.",
  },
  {
    question: "Mes données sont-elles protégées ?",
    answer:
      "Oui. Tout transite et reste sur tes propres outils (souveraineté), pas de copie sur mon infrastructure. Suppression de tous les accès à la résiliation, NDA possible sur demande, RGPD respecté. Les sous-traitants utilisés (Resend pour les emails de service, Stripe pour la facturation, hébergement Vercel) sont détaillés dans les mentions légales. Aucune donnée client n'est utilisée pour entraîner un modèle, exporter, ou partager avec un tiers.",
  },
  {
    question: "Tu peux gérer la TMA d'un client à moi ?",
    answer:
      "Oui, c'est même fréquent : agences, ESN, ou freelances qui veulent déléguer la TMA d'un client final. On signe un contrat de sous-traitance, je reste invisible côté client si tu préfères, et tu gardes la relation commerciale. Conditions détaillées sur demande.",
  },
];

export const TMA_MONITORING_TOOLS: TmaMonitoringTool[] = [
  {
    name: "Sentry",
    tagline: "Error tracking + APM",
    body: "Capture des erreurs front et back, traces de performance, alertes en temps réel. Free tier 5k events/mois, suffisant pour la plupart des PME.",
    url: "https://sentry.io",
  },
  {
    name: "UptimeRobot",
    tagline: "Uptime des endpoints critiques",
    body: "Vérifications HTTP toutes les 5 minutes sur tes routes clés (API, checkout, login). Alerte email/SMS si down. Free tier 50 monitors.",
    url: "https://uptimerobot.com",
  },
  {
    name: "Better Stack",
    tagline: "Logs centralisés + status page",
    body: "Agrégation des logs applicatifs, recherche pleine, et status page publique pour communiquer avec tes utilisateurs en cas d'incident. Free tier 1GB/jour.",
    url: "https://betterstack.com",
  },
  {
    name: "Vercel Speed Insights",
    tagline: "RUM web vitals",
    body: "Mesure des Core Web Vitals (LCP, INP, CLS) sur les vrais utilisateurs. Inclus si l'app est hébergée sur Vercel, sinon on bascule sur une alternative équivalente.",
    url: "https://vercel.com/docs/speed-insights",
  },
];

export const TMA_PREREQUISITES: TmaPrerequisite[] = [
  {
    title: "App déjà en production",
    body: "La TMA n'est pas un service de développement from scratch. Ton produit doit déjà tourner avec des utilisateurs réels (ou un déploiement de staging stable au minimum).",
  },
  {
    title: "Code source accessible",
    body: "Repo Git (GitHub, GitLab, Bitbucket, self-hosted) de préférence. À défaut, archive ZIP versionnée. Pas de TMA possible sans accès au code.",
  },
  {
    title: "Stack dans la zone supportée",
    body: "Next.js, React, Node, NestJS, Fastify, Prisma, Drizzle, Expo, Capacitor, hébergé sur Vercel, Railway, DigitalOcean, Cloudflare Workers ou équivalent, avec PostgreSQL ou MySQL. Si proche, on regarde ensemble avant de signer.",
  },
  {
    title: "Un référent technique côté client",
    body: "Une personne joignable côté client pour le cadrage initial, les arbitrages produit, et la validation des évolutions. Pas besoin que ce soit un dev, un PM ou un fondateur technique suffit.",
  },
];

export const TMA_PREMIUM_DELIVERABLES: TmaDeliverable[] = [
  {
    title: "Status page publique",
    tagline: "Better Stack",
    cadence: "Mise à jour temps réel",
    body: "Page hébergée sur un sous-domaine dédié (type status.tonsite.com) qui affiche l'uptime de l'app et l'historique des incidents. Signal de transparence vers tes utilisateurs finaux : moins de tickets « ça marche pas chez moi », plus de confiance.",
  },
  {
    title: "CHANGELOG mensuel annoté",
    tagline: "Markdown / PDF",
    cadence: "Tous les mois",
    body: "Récapitulatif clair des bugs corrigés, mises à jour appliquées et petites évolutions livrées dans le mois. Vulgarisé pour pouvoir le partager à ton équipe ou à tes clients. Distinct du reporting technique interne, c'est un livrable de communication.",
  },
  {
    title: "Audit perf / sécu trimestriel",
    tagline: "Lighthouse + CVE + headers",
    cadence: "Tous les 3 mois",
    body: "Audit court (1 à 2h prises sur le forfait) avec output PDF : Lighthouse et Core Web Vitals, audit des dépendances (vulnérabilités CVE et obsolescence), sécurité (headers HTTP, expositions, secrets), recommandations priorisées par impact.",
  },
  {
    title: "Canal de support dédié",
    tagline: "Slack, Discord, WhatsApp, Teams…",
    cadence: "Channel partagé permanent",
    body: "Un canal dédié partagé entre toi et moi sur l'outil que tu utilises déjà : Slack, Discord, WhatsApp, Microsoft Teams, Google Chat ou autre. Pour le suivi des tickets, les questions rapides et les notifications de monitoring. Plus fluide et plus traçable que l'email, sans imposer un nouvel outil à ton équipe.",
  },
];

export const TMA_EXCLUSIONS: TmaExclusion[] = [
  {
    title: "Nouvelles fonctionnalités > 3 jours",
    body: "Les évolutions lourdes (refonte d'un module, nouveau workflow métier, intégration tierce conséquente) sortent du forfait et passent en mission séparée sur devis, pour ne pas cannibaliser tes heures de support.",
  },
  {
    title: "Refonte ou migration de stack",
    body: "Passer de CRA à Next.js, migrer une base PostgreSQL, refondre une UI complète : c'est un projet en soi, traité en mission dédiée avec cadrage et chiffrage propres.",
  },
  {
    title: "Formation ou support utilisateur final",
    body: "La TMA s'adresse à toi (l'éditeur de l'app), pas à tes utilisateurs finaux. Pas de hotline, pas de formation des équipes utilisatrices, pas de réponse directe à tes clients.",
  },
  {
    title: "Astreinte 24/7 ou hors heures ouvrées",
    body: "Interventions du lundi au vendredi en heures ouvrées. Pas d'astreinte nuit, week-end ou jours fériés. Si ton app est critique 24/7, on cadre une mission d'astreinte séparée avec rémunération adaptée.",
  },
  {
    title: "Coûts des outils tiers",
    body: "Sentry payant, hébergement Vercel/Railway, domaines, certificats, services SaaS tiers : tout est à ta charge directement chez l'éditeur. Je n'avance ni ne refacture aucun coût d'infrastructure.",
  },
  {
    title: "Stacks non supportées",
    body: "PHP/WordPress, .NET, Java/Spring, Ruby on Rails, Python (autre que scripts ponctuels), Go : pas de TMA sur ces stacks. Si ton app mélange du Node et du PHP, on regarde au cas par cas.",
  },
];
