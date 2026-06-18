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
  targetAudience: string[];
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

export const TMA_LAST_UPDATED = {
  iso: "2026-05-12",
  display: "12 mai 2026",
} as const;

export const TMA_META = {
  title: "TMA : maintenance applicative dès 350€/mois",
  description:
    "Forfait TMA mensuel pour app Next.js, React, Node ou mobile. PRO 350€/mois (5h, 1 jour ouvré) ou PREMIUM 800€/mois (10h, monitoring proactif). Sans engagement.",
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
    targetAudience: [
      "Tu as une app en production qui tourne et qui a besoin de suivi régulier",
      "Tu n'as pas besoin d'astreinte critique 24/7",
      "Tu veux garder ton app à jour sans recruter en interne",
      "Un volume horaire raisonnable et flexible te suffit",
    ],
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
    targetAudience: [
      "Ton app est critique pour ton activité (revenu, opérations, image)",
      "Tu as besoin de monitoring proactif et d'alertes avant tes utilisateurs",
      "Tu veux un canal de support dédié et un délai de réponse plus court",
      "Tu dois présenter un suivi régulier à ton équipe, ton board ou tes clients",
    ],
    price: 800,
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
    body: "PRO ou PREMIUM, paiement Stripe sécurisé, facture automatique chaque mois. Sans engagement : tu peux mettre à jour ton moyen de paiement ou résilier en self-service depuis ton portail Stripe à tout moment. Les changements de forfait se font sur simple demande par email.",
  },
  {
    step: "02",
    title: "Onboarding sous 48h",
    body: "Visio de cadrage : on fait le tour de ton app, des accès (repo, hosting, domaines, monitoring), de la stack et des priorités du moment. Tu gardes ta doc, je m'adapte à ton organisation.",
  },
  {
    step: "03",
    title: "On démarre le mois 1",
    body: "Tu m'envoies tes tickets sur le canal défini ensemble (email, WhatsApp, Slack, Discord). En PREMIUM, les alertes monitoring (Sentry, UptimeRobot, Better Stack) arrivent aussi directement dans le canal partagé. Je traite tout selon le SLA du forfait : 1 jour ouvré sur PRO, 1 demi-journée sur PREMIUM. Maintenance et sécurité d'abord, évolutions ensuite.",
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
    question: "Comment tu comptes les heures consommées par ticket ?",
    answer:
      "Décompte par tranches de 30 min, arrondi au plus bas avec un minimum de 30 min par ticket. Exemples concrets : un ticket de 12 min compte pour 30 min (minimum atteint), un ticket de 45 min compte pour 30 min (arrondi au plus bas dans la tranche 30-60), un ticket de 1h10 compte pour 1h (tranche 60-90), un ticket de 1h55 compte pour 1h30 (tranche 90-120). C'est plus juste qu'un arrondi systématique au-dessus (standard freelance habituel) et ça évite les disputes pénibles à la minute près.",
  },
  {
    question: "Comment se passe la résiliation ?",
    answer:
      "Sans engagement, résiliation en self-service via ton portail Stripe (Customer Portal) accessible depuis le lien de ta facture. Le forfait s'arrête à la fin de la période déjà payée, sans démarche supplémentaire de mon côté. Je te transmets un handover propre (accès, doc, état des chantiers en cours) avant la clôture.",
  },
  {
    question: "Je peux changer de forfait en cours de route ?",
    answer:
      "Oui à tout moment, sur simple demande par email : c'est moi qui pilote la bascule pour qu'elle reste propre des deux côtés. Pour un upgrade PRO → PREMIUM, je fais la bascule immédiate au prorata (tu paies la différence pour les jours restants du mois) et je mets en place les outils Premium au début de la période complète suivante (Sentry, monitoring, status page). Pour un retour vers PRO, on en discute ensemble pour ne pas casser ton observabilité en plein vol.",
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
    question: "Tu acceptes les paiements par virement ou sur facture ?",
    answer:
      "Stripe (CB, prélèvement automatique) est l'option par défaut : la facture est envoyée à chaque renouvellement et tout est self-service. Pour les structures qui ont un process fournisseur obligatoire (ETI, grands comptes, secteur public, associations) ou qui veulent un règlement par virement SEPA avec devis et bon de commande, je facture sur demande, mensuel ou trimestriel. Engagement annuel et tarif négocié possibles à partir d'un certain volume, à discuter via la modale de contact.",
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
  {
    question: "Combien de clients TMA tu peux prendre en parallèle ?",
    answer:
      "Capacité limitée volontairement : maximum 6 clients PRO simultanés, 3 clients PREMIUM. C'est ce qui permet de tenir les SLA (1 j ouvré PRO, 1 demi-journée PREMIUM) sans saturation. Si je suis complet à ton inscription, je te le dis tout de suite et on cale une date de démarrage plutôt que de t'inscrire dans un backlog flou.",
  },
  {
    question: "Que se passe-t-il si mon app tombe le week-end ou la nuit ?",
    answer:
      "Pas d'astreinte 24/7 : la TMA reste un service en heures ouvrées (lundi au vendredi). Sur PREMIUM, le monitoring continue de tourner et de t'alerter même hors heures ; si tu veux que j'intervienne en best-effort la nuit ou le week-end, c'est facturé en heures supplémentaires au tarif standard de 80€/h, avec ton accord écrit avant intervention. Pour de l'astreinte garantie 24/7, c'est une mission séparée avec rémunération adaptée à cadrer ensemble.",
  },
  {
    question: "Si j'ai plusieurs projets, ça rentre dans le même forfait ?",
    answer:
      "Non, 1 TMA = 1 projet. Même si les stacks sont identiques, chaque projet a son propre historique, sa propre infra, ses propres priorités, et le coût de contexte n'est pas linéaire. Donc 2 projets = 2 forfaits TMA séparés (PRO ou PREMIUM selon les besoins de chacun). Exception unique : un même produit déployé en plusieurs morceaux (ex: SaaS + site marketing sur la même base de code) reste 1 TMA.",
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

export const TMA_PRO_DELIVERABLES: TmaDeliverable[] = [
  {
    title: "Correction de bugs et performance",
    tagline: "Stabilité au quotidien",
    cadence: "Sur tickets",
    body: "Correction des bugs reproductibles signalés par tes utilisateurs ou par toi, traitement des lenteurs (requêtes coûteuses, points de friction UX), stabilisation des régressions déjà identifiées. Prise en charge sous 1 jour ouvré, correction livrée et déployée sans rouvrir un chantier complet. Pour les bugs intermittents ou inexpliqués qui demandent une investigation, voir card « Diagnostic et investigation ».",
  },
  {
    title: "Mises à jour et sécurité",
    tagline: "Dépendances + patches CVE",
    cadence: "Passes régulières",
    body: "Mises à jour des dépendances (npm, pnpm, lockfile), application des patches de sécurité critiques (CVE), audit des packages obsolètes ou abandonnés. Passes régulières dans tes 5h pour anticiper les failles avant qu'elles bloquent un déploiement ou remontent dans un audit client.",
  },
  {
    title: "Petites évolutions et ops admin",
    tagline: "Ajouts légers + opérations",
    cadence: "Sur tickets",
    body: "Ajouter un champ, exporter des données ad hoc, créer un compte admin, débloquer un utilisateur, ajuster un libellé, modifier un comportement métier mineur : tout ce qui rentre dans tes 5h sans cadrage produit. Les évolutions qui dépassent le forfait d'heures sortent en mission séparée sur devis.",
  },
  {
    title: "Diagnostic et investigation",
    tagline: "Incidents + cause racine",
    cadence: "Sur incident",
    body: "Quand un truc casse en prod ou qu'un comportement bizarre revient, je prends en charge le diagnostic : analyse de la cause racine, post-mortem léger écrit, recommandations pour éviter la récidive. Distinct du « je corrige » : ici on cherche le pourquoi avant de patcher, particulièrement utile sur les bugs intermittents ou les régressions inexpliquées.",
  },
];

export const TMA_PRO_WORKFLOW: TmaDeliverable[] = [
  {
    title: "Canal défini ensemble",
    tagline: "Email, WhatsApp, Slack, Discord",
    cadence: "Lundi au vendredi",
    body: "Tu m'envoies tes tickets sur le canal qui colle à ton organisation, défini à l'onboarding. Pas de portail à apprendre, pas d'outil imposé, pas de friction. Interventions du lundi au vendredi en heures ouvrées.",
  },
  {
    title: "Prise en compte sous 1 jour ouvré",
    tagline: "SLA garanti",
    cadence: "Max 1 j ouvré",
    body: "Tout ticket envoyé est pris en compte sous 1 jour ouvré maximum. Pas de devis à attendre 5 jours, pas de relance à faire. Si je suis indisponible plus de 2 jours, je préviens 2 semaines à l'avance.",
  },
  {
    title: "Communication avant / après tâche",
    tagline: "Transparence totale",
    cadence: "Chaque intervention",
    body: "Avant d'attaquer un ticket, je te confirme ce que je vais faire et le temps estimé. Après la livraison, message récap avec ce qui a été fait. Pas de boîte noire, tu suis ce qui se passe sur ton app au quotidien.",
  },
  {
    title: "Visio mensuelle et décompte transparent",
    tagline: "1h / mois + suivi heures",
    cadence: "Tous les mois",
    body: "1h de visioconférence par mois pour faire le point (priorités, planning, décisions). Décompte des heures consommées par tranches de 30 min, arrondi au plus bas avec minimum 30 min par ticket (plus juste qu'un arrondi systématique au-dessus). Suivi partagé dès qu'on approche des 5h, dépassement uniquement avec ton accord écrit (80€/h).",
  },
];

export const TMA_PREMIUM_DELIVERABLES: TmaDeliverable[] = [
  {
    title: "Status page publique",
    tagline: "Uptime + historique incidents",
    cadence: "Mise à jour temps réel",
    body: "Page publique sur un sous-domaine dédié (type status.tonsite.com) affichant l'uptime de l'app et l'historique des incidents. Setup initial et maintenance compris dans tes 10h. Signal de transparence vers tes utilisateurs : moins de tickets « ça marche pas chez moi », plus de confiance, et un argument commercial si tu vends en B2B.",
  },
  {
    title: "CHANGELOG mensuel annoté",
    tagline: "Livrable de communication",
    cadence: "Tous les mois",
    body: "Récapitulatif écrit des bugs corrigés, mises à jour appliquées et petites évolutions livrées dans le mois. Vulgarisé pour pouvoir le partager à ton équipe, ton board ou tes clients. Distinct du reporting technique interne : c'est un livrable de communication, rédaction comprise dans tes 10h.",
  },
  {
    title: "Audit performance et sécurité",
    tagline: "Perf + dépendances + headers",
    cadence: "Tous les 3 mois",
    body: "Audit trimestriel (1 à 2h pris sur tes 10h du mois concerné) avec rapport PDF actionnable. Trois axes : performance perçue (vitesse de chargement, Core Web Vitals), failles de sécurité (dépendances obsolètes, headers HTTP, secrets exposés) et optimisations rentables à court terme. Chaque recommandation est priorisée par impact, tu sais quoi traiter en premier.",
  },
  {
    title: "Canal de support dédié",
    tagline: "Slack, Discord, WhatsApp, Teams…",
    cadence: "Channel partagé permanent",
    body: "Canal dédié partagé sur l'outil que tu utilises déjà : Slack, Discord, WhatsApp, Microsoft Teams ou Google Chat. Suivi des tickets, questions rapides, notifications de monitoring centralisées au même endroit. Couplé au SLA PREMIUM (prise en compte sous une demi-journée ouvrée), c'est ce qui te différencie du support email standard du PRO.",
  },
];

export const TMA_EXCLUSIONS: TmaExclusion[] = [
  {
    title: "Évolutions lourdes hors forfait",
    body: "Les évolutions qui dépassent significativement le forfait d'heures (refonte d'un module, nouveau workflow métier, intégration tierce conséquente) sortent du forfait et passent en mission séparée sur devis, pour ne pas cannibaliser tes heures de support et de maintenance.",
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
