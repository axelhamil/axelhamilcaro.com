import { RATES, SITE_URL } from "@/app/_config/site.constants";

export type ServiceSlug =
  | "developpeur-nextjs-freelance"
  | "developpement-saas"
  | "lead-tech-fractional"
  | "creation-application-web";

export type RelatedCaseSlug =
  | "billetterie"
  | "civitime"
  | "openup"
  | "scormpilot";

export type ServiceData = {
  slug: ServiceSlug;
  url: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  card: {
    title: string;
    subtitle: string;
  };
  ribbons: {
    hero: readonly string[];
    cta: readonly string[];
  };
  problem: {
    title: string;
    bullets: string[];
  };
  approach: {
    title: string;
    steps: { title: string; body: string }[];
  };
  relatedCases: RelatedCaseSlug[];
  guide?: { href: string; title: string };
  faq: { question: string; answer: string }[];
  schema: {
    name: string;
    description: string;
    serviceType: string;
    offers: { name: string; description: string }[];
  };
};

const baseHero = {
  primaryCtaLabel: "Recevoir mon devis sous 24h",
  secondaryCtaLabel: "Voir mes liens",
  secondaryCtaHref: "/tree",
};

export const servicesData: Record<ServiceSlug, ServiceData> = {
  "creation-application-web": {
    slug: "creation-application-web",
    url: `${SITE_URL}/services/creation-application-web`,
    metaTitle: "Développeur web freelance : app de A à Z",
    metaDescription: `Je suis développeur web freelance à Tours : je crée ton application web ou mobile sur mesure de A à Z, du cadrage à la mise en ligne, à ${RATES.dailyHtEur} € HT par jour.`,
    hero: {
      eyebrow: "Service freelance",
      title: "Développeur web freelance pour créer ton application de A à Z.",
      subtitle: `Je suis Axel Hamilcaro, développeur web freelance basé à Tours : je crée ton application web ou mobile de A à Z, du cadrage à la mise en ligne, à ${RATES.dailyHtEur} € HT par jour, avec un devis sous 24h et une démo chaque semaine. Tu cherches quelqu'un capable de tout gérer de bout en bout ? Je prends ton projet de l'idée à la mise en ligne, puis la maintenance si tu le souhaites. Un seul interlocuteur, une application sur mesure livrée prête à l'emploi.`,
      ...baseHero,
    },
    card: {
      title: "Création d'application web de A à Z",
      subtitle:
        "Tu as une idée mais pas d'équipe technique. Je construis ton application de bout en bout, du cadrage à la mise en ligne, avec un seul interlocuteur.",
    },
    ribbons: {
      hero: [
        "Application de A à Z",
        "Cadrage",
        "Fonctionnalités priorisées",
        "Devis sous 24h",
        "Démo chaque semaine",
        "Web",
        "iOS",
        "Android",
        "Hébergement à ton nom",
        "Mise en ligne",
        "Publication sur les stores",
        "4 à 8 semaines",
        "Un seul interlocuteur",
      ],
      cta: [
        "Premier échange gratuit",
        "30 min",
        "Sans jargon",
        `${RATES.dailyHtEur} € HT par jour`,
        "Forfait possible",
        "De 5 000 à 30 000 € HT",
        "Petite app en 2 à 4 semaines",
        "Comptes",
        "Paiement en ligne",
        "Espace d'administration",
        `Maintenance dès ${RATES.tma.proMonthlyEur} € HT par mois`,
        "Tu repars autonome",
      ],
    },
    problem: {
      title: "Les cas où je prends ton projet",
      bullets: [
        "Tu as une idée d'application mais personne de technique autour de toi pour la construire.",
        "Tu ne sais pas par où commencer : cahier des charges, budget, choix techniques.",
        "Tu ne veux pas coordonner plusieurs prestataires, tu veux une seule personne qui gère tout.",
        "Tu as trouvé des plateformes de freelances, mais tu ne sais pas à quel profil confier ton projet.",
      ],
    },
    approach: {
      title: "Comment se passe la création de ton application.",
      steps: [
        {
          title: "Premier échange (gratuit, 30 min)",
          body: "Tu m'expliques ton idée avec tes mots, sans jargon. Je te dis ce qui est faisable, dans quel ordre, et si je suis la bonne personne pour ton projet.",
        },
        {
          title: "Cadrage et devis sous 24h",
          body: "Je traduis ton besoin en liste de fonctionnalités priorisées, avec un prix et un délai. Tu valides avant qu'une ligne de code soit écrite.",
        },
        {
          title: "Développement, avec une démo chaque semaine",
          body: "Tu vois ton application avancer sur un lien de test et tu donnes ton avis au fil de l'eau. Une application complète sort en 4 à 8 semaines.",
        },
        {
          title: "Mise en ligne et suite",
          body: "Je configure l'hébergement à ton nom, je mets en ligne et je publie sur les stores si ton application est mobile. Ensuite tu repars autonome, ou je continue en maintenance, ton choix.",
        },
      ],
    },
    relatedCases: ["scormpilot", "billetterie", "openup"],
    guide: {
      href: "/blog/combien-coute-application-web-sur-mesure",
      title: "Combien coûte une application web sur mesure en 2026",
    },
    faq: [
      {
        question: "Je ne suis pas technique, est-ce un problème ?",
        answer:
          "Non. Tu décris ton besoin et tes utilisateurs, je m'occupe des choix techniques et je te les explique simplement. Tu valides des écrans et des fonctionnalités, pas du code.",
      },
      {
        question: "Tu gères vraiment tout de bout en bout ?",
        answer:
          "Oui : cadrage, architecture, développement de l'interface et du serveur, base de données, configuration de l'hébergement et mise en ligne, puis la maintenance si tu le souhaites. Tu as un seul interlocuteur du début à la fin.",
      },
      {
        question: "Combien coûte la création d'une application web ?",
        answer: `Je facture ${RATES.dailyHtEur} € HT par jour, ou au forfait quand le périmètre est fixé. Une petite application ou un outil interne demande 10 à 20 jours, soit 5 000 à 10 000 € HT. Une application complète, avec comptes, paiement en ligne et espace d'administration, demande 20 à 40 jours, soit 10 000 à 20 000 € HT. Un produit avancé, avec plusieurs rôles ou une application mobile, se situe entre 20 000 et 30 000 € HT. Tu reçois un devis détaillé sous 24h après le premier échange.`,
      },
      {
        question: "Combien de temps faut-il pour créer une application ?",
        answer:
          "Compte 2 à 4 semaines pour une petite application, 4 à 8 semaines pour une application complète. Le délai dépend surtout du nombre de fonctionnalités, c'est pour ça qu'on les priorise ensemble au cadrage.",
      },
      {
        question: "Tu développes aussi des applications mobiles ?",
        answer:
          "Oui, iOS et Android, à partir du même code que la version web. OpenUp en est un exemple : l'application est disponible sur iOS, Android et web.",
      },
      {
        question: "Que se passe-t-il après la mise en ligne ?",
        answer: `Tu peux repartir autonome, ou me confier la maintenance : correctifs, mises à jour de sécurité et petites évolutions, avec un forfait mensuel à partir de ${RATES.tma.proMonthlyEur} € HT par mois.`,
      },
    ],
    schema: {
      name: "Création d'application web et mobile de A à Z",
      description: `Axel Hamilcaro, développeur fullstack freelance à Tours, crée des applications web et mobiles sur mesure de A à Z, du cadrage à la mise en ligne, à ${RATES.dailyHtEur} € HT par jour, avec un devis sous 24 heures.`,
      serviceType: "Custom web application development",
      offers: [
        {
          name: "Création d'application web sur mesure",
          description:
            "Conception et développement d'une application web de A à Z, du cadrage à la mise en production.",
        },
        {
          name: "Création d'application mobile",
          description:
            "Application iOS et Android développée à partir du même code que la version web.",
        },
        {
          name: "Application prête à l'emploi",
          description:
            "Prise en charge du projet de bout en bout par un seul développeur : cadrage, développement, mise en ligne, maintenance.",
        },
      ],
    },
  },

  "developpeur-nextjs-freelance": {
    slug: "developpeur-nextjs-freelance",
    url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
    metaTitle: "Développeur Next.js freelance",
    metaDescription: `Je développe en Next.js depuis 2021 et en freelance depuis fin 2024 : MVP en 4 à 8 semaines, refonte d'app, TypeScript, React 19. TJM ${RATES.dailyHtEur} € HT, devis sous 24h.`,
    hero: {
      eyebrow: "Service freelance",
      title: "Développeur Next.js freelance qui livre vraiment.",
      subtitle: `Je suis Axel Hamilcaro, développeur Next.js freelance basé à Tours : je construis ton MVP en 4 à 8 semaines ou je refonds ton application en TypeScript et React 19, à ${RATES.dailyHtEur} € HT par jour, devis sous 24h. Tu cherches un freelance Next.js qui prend en charge ton produit de A à Z et livre en production sans surprise ? Next.js est ma stack de prédilection, mais j'adapte la techno à ton besoin : React/Node découplé, Vite, mobile natif. J'interviens sur architecture, MVP, refonte et lead tech temps partiel.`,
      ...baseHero,
    },
    card: {
      title: "Développement web sur mesure",
      subtitle:
        "Ton produit web de A à Z : architecture, MVP, refonte, mise en production. Next.js, React/Node ou la stack adaptée à ton besoin, pas l'inverse.",
    },
    ribbons: {
      hero: [
        "Next.js",
        "React 19",
        "TypeScript",
        "React + Node",
        "Hono",
        "Vite",
        "Capacitor",
        "MVP",
        "Refonte",
        "Architecture",
        "Lead tech temps partiel",
        "Preview chaque semaine",
        "Monitoring",
        "Documentation",
      ],
      cta: [
        `TJM ${RATES.dailyHtEur} € HT`,
        "Forfait sur scope fermé",
        "Démarrage sous 1 à 3 semaines",
        "Cadrage gratuit de 30 min",
        "Solo ou en équipe",
        "Revues de code",
        "Pair programming",
        "iOS et Android",
        "Fastlane",
        "TestFlight",
        "Play Store",
        "Tu repars autonome",
      ],
    },
    problem: {
      title: "Ce que ton projet demande",
      bullets: [
        "Ton équipe est saturée et ta roadmap dérape.",
        "Ta stack legacy ralentit tes livraisons et ton équipe perd patience.",
        "Tu as une idée de produit mais personne pour le construire correctement en autonomie.",
        "Ton MVP a explosé en complexité et tu as besoin de remettre l'architecture à plat.",
      ],
    },
    approach: {
      title: "Comment je travaille.",
      steps: [
        {
          title: "Cadrage business (gratuit, 30min)",
          body: "On valide objectif, contexte, contraintes, budget. Tu repars avec une analyse honnête : si je suis le bon profil ou pas.",
        },
        {
          title: "Architecture + plan de livraison",
          body: "Je conçois l'architecture technique adaptée à ton stade. Pas de Clean Architecture sur un MVP de 2 semaines. Tu valides avant qu'on touche au code.",
        },
        {
          title: "Livraison incrémentale",
          body: "Push hebdomadaire en preview, démo, retour. Pas de tunnel de 6 semaines avec un livrable surprise.",
        },
        {
          title: "Mise en production + transmission",
          body: "Déploiement, monitoring, documentation. Tu repars autonome ou je continue en maintenance, ton choix.",
        },
      ],
    },
    relatedCases: ["scormpilot", "billetterie", "openup"],
    faq: [
      {
        question: "Quel est ton TJM ?",
        answer: `${RATES.dailyHtEur} € HT par jour. Devis au forfait possible pour un périmètre fermé.`,
      },
      {
        question: "Tu peux démarrer quand ?",
        answer:
          "Selon ma charge actuelle, généralement sous 1 à 3 semaines. Je suis transparent sur ma dispo dès le premier échange.",
      },
      {
        question: "Tu travailles seul ou en équipe ?",
        answer:
          "Les deux. En autonomie sur un produit complet, ou intégré à une équipe existante (revues, pair programming, lead tech temps partiel).",
      },
      {
        question: "Tu travailles uniquement avec Next.js ?",
        answer:
          "Non. Next.js est ma stack de prédilection et celle où je vais le plus vite, mais je choisis la techno selon ton projet : React + Node/Hono en architecture découplée, Vite, ou Next.js. Le but, c'est de livrer le bon produit, pas d'imposer un framework.",
      },
      {
        question: "Tu fais du mobile aussi ?",
        answer:
          "Oui, mobile natif iOS et Android via Capacitor (PWA + apps natives depuis une seule codebase, releases auto via Fastlane CI/CD vers TestFlight et Play Store). OpenUp, dont je suis le fondateur technique, est en production sur app.openup.to, disponible sur iOS, Android et web.",
      },
    ],
    schema: {
      name: "Développement Next.js freelance",
      description: `Axel Hamilcaro, développeur fullstack freelance à Tours, développe en Next.js depuis 2021 : MVP en 4 à 8 semaines et refonte d'applications en TypeScript et React 19, à ${RATES.dailyHtEur} € HT par jour.`,
      serviceType: "Software development consulting",
      offers: [
        {
          name: "Développement Next.js sur mesure",
          description:
            "Conception et développement d'applications web Next.js de A à Z.",
        },
        {
          name: "Refonte d'application Next.js",
          description:
            "Audit et refonte progressive d'une codebase existante sans casser la production.",
        },
        {
          name: "Lead tech temps partiel Next.js",
          description:
            "Accompagnement d'équipe et lead technique sur des projets Next.js / React.",
        },
      ],
    },
  },

  "developpement-saas": {
    slug: "developpement-saas",
    url: `${SITE_URL}/services/developpement-saas`,
    metaTitle: "Développeur DDD et SaaS freelance",
    metaDescription:
      "Je suis développeur DDD freelance : SaaS B2B multi-tenant en Clean Architecture, mise en prod complète. Référence : ScormPilot, 5 apps en solo. Devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Je conçois et livre ton SaaS de zéro jusqu'en production.",
      subtitle: `Je suis Axel Hamilcaro, développeur SaaS freelance basé à Tours : je conçois ton SaaS B2B multi-tenant en Clean Architecture et DDD, de la première ligne à la mise en production, à ${RATES.dailyHtEur} € HT par jour. Référence : ScormPilot, 5 apps livrées en solo. Monitoring compris, un code clair pensé pour grandir avec tes clients, sans complexité inutile.`,
      ...baseHero,
    },
    card: {
      title: "Développement SaaS",
      subtitle:
        "Architecture multi-tenant, mise en production et monitoring compris. Un code clair, pensé pour grandir avec tes clients, sans complexité inutile.",
    },
    ribbons: {
      hero: [
        "SaaS B2B",
        "Multi-tenant",
        "Row-level security",
        "Schema-per-tenant",
        "Bounded contexts",
        "Clean Architecture",
        "DDD",
        "CI/CD dès le jour 1",
        "Monitoring",
        "Alerting",
        "Tests BDD",
        "Docker",
        "GitHub Actions",
        "Cloudflare R2",
      ],
      cta: [
        "MVP en 4 à 12 semaines",
        "Premier déploiement en semaine 2-3",
        "ScormPilot",
        "5 apps en solo",
        "Civitime",
        "4 ans de refonte continue",
        "Audit produit",
        "Refonte progressive",
        "GCP",
        "Vercel",
        "Documentation",
        "Onboarding tech",
        "Devis sous 24h",
      ],
    },
    problem: {
      title: "Quand ton MVP ne tient plus",
      bullets: [
        "Ton MVP fonctionne mais l'architecture craque sous la charge clients.",
        "Tu veux lancer un SaaS B2B mais ton équipe n'a pas l'expérience multi-tenancy.",
        "Tu as un produit interne qu'il faut transformer en SaaS commercialisable.",
        "Tes coûts cloud explosent à mesure que les clients arrivent.",
      ],
    },
    approach: {
      title: "Comment je travaille.",
      steps: [
        {
          title: "Audit produit + business",
          body: "On clarifie le modèle (mono-tenant, multi-tenant, hybride), les contraintes de scale, le budget cloud, la roadmap commerciale.",
        },
        {
          title: "Architecture domain-driven",
          body: "Découpage en bounded contexts, Clean Architecture côté backend, choix techno justifiés (Fastify vs NestJS, PostgreSQL row-level security ou schema-per-tenant, etc.).",
        },
        {
          title: "Livraison itérative en production",
          body: "Premier déploiement en semaine 2-3 avec de vrais clients. CI/CD dès le jour 1. Monitoring et alerting dès la mise en production.",
        },
        {
          title: "Industrialisation",
          body: "Tests BDD, documentation, onboarding tech, transmission progressive si tu construis une équipe interne.",
        },
      ],
    },
    relatedCases: ["scormpilot", "civitime", "openup"],
    guide: {
      href: "/blog/combien-coute-mvp-saas",
      title: "Combien coûte un MVP SaaS en 2026",
    },
    faq: [
      {
        question: "Tu peux faire du multi-tenancy avec quel pattern ?",
        answer:
          "Selon le contexte : row-level security PostgreSQL (simple, économique), schema-per-tenant (isolation forte, plus coûteux), database-per-tenant (clients enterprise). Je t'aide à choisir, pas un dogme.",
      },
      {
        question: "Combien de temps pour livrer un MVP SaaS ?",
        answer:
          "4 à 12 semaines selon scope. Référence : ScormPilot = 5 applications livrées en solo (API, dashboard, lecteur, runtime SCORM, app Teams).",
      },
      {
        question: "Tu peux reprendre un SaaS existant qui a déjà mal vieilli ?",
        answer:
          "Oui, c'est même fréquent. Audit puis refonte progressive sans casser l'existant. Civitime = 4 ans de refonte continue, baisse du churn, hausse de l'engagement.",
      },
      {
        question: "Tu gères le côté infra et devops ?",
        answer:
          "Oui. Docker, CI/CD GitHub Actions, déploiement GCP / Vercel / Cloudflare R2. Je ne suis pas un SRE pur, mais je couvre tout ce qu'il faut pour qu'un SaaS B2B tourne en production.",
      },
    ],
    schema: {
      name: "Développement SaaS freelance",
      description: `Axel Hamilcaro, développeur fullstack freelance à Tours, conçoit des SaaS B2B multi-tenant en Clean Architecture et DDD jusqu'à la mise en production, à ${RATES.dailyHtEur} € HT par jour. Référence : ScormPilot, 5 applications livrées seul.`,
      serviceType: "SaaS development consulting",
      offers: [
        {
          name: "Développement SaaS multi-tenant",
          description:
            "Conception et développement d'un SaaS B2B de zéro jusqu'en production.",
        },
        {
          name: "Audit et refonte SaaS existant",
          description:
            "Audit architecture et refonte progressive d'un SaaS existant qui a vieilli.",
        },
        {
          name: "Conseil architecture SaaS",
          description:
            "Accompagnement technique sur les choix d'architecture multi-tenant, scaling, infra.",
        },
      ],
    },
  },

  "lead-tech-fractional": {
    slug: "lead-tech-fractional",
    url: `${SITE_URL}/services/lead-tech-fractional`,
    metaTitle: "Lead tech fractional freelance",
    metaDescription:
      "Je suis lead tech freelance pour startups et PME, après 4 ans chez Civitime de dev à lead tech : 1 à 3 jours par semaine, de 3 à 18 mois, devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Lead technique fractional pour ton équipe.",
      subtitle: `Je suis Axel Hamilcaro, lead tech fractional basé à Tours : j'interviens 1 à 3 jours par semaine, pendant 3 à 18 mois, à ${RATES.dailyHtEur} € HT par jour, pour structurer l'architecture et faire monter ton équipe en compétence, après 4 ans chez Civitime de développeur à lead tech. Tu as une équipe dev mais pas de senior pour cadrer les choix techno ? C'est le rôle que je prends.`,
      ...baseHero,
    },
    card: {
      title: "Lead tech fractional",
      subtitle:
        "Tu as une équipe dev mais pas de senior pour structurer l'architecture et accompagner la montée en compétence ? Lead tech temps partiel, de 3 à 18 mois.",
    },
    ribbons: {
      hero: [
        "Lead tech fractional",
        "1 à 3 jours par semaine",
        "De 3 à 18 mois",
        "Audit en 1 à 2 semaines",
        "Plan d'action 3 à 6 mois",
        "Revues de code",
        "Pair programming",
        "Architecture",
        "Mentorat",
        "Recrutement technique",
        "Préparation de levée",
        "Transmission",
        "Renouvelable au trimestre",
      ],
      cta: [
        "4 ans chez Civitime",
        "De dev à lead tech",
        "3 mois minimum",
        "Idéal de 6 à 18 mois",
        "2 jours par semaine",
        "Lead et dev hands-on",
        "Diagnostic écrit",
        "Roadmap technique",
        "Formation de l'équipe",
        "Sortie avec préavis",
        "Startups et PME",
        "Devis sous 24h",
      ],
    },
    problem: {
      title: "Quand ton équipe a besoin d'un senior",
      bullets: [
        "Ton équipe code vite mais l'architecture dérive et la dette s'accumule.",
        "Tu n'as pas le budget pour un CTO senior à plein temps mais tu as besoin d'un structurant.",
        "Tes devs juniors ont besoin d'un mentor technique pour progresser sans bloquer la livraison.",
        "Tu prépares une levée et tu dois rassurer les investisseurs sur la qualité de la stack.",
      ],
    },
    approach: {
      title: "Comment je travaille.",
      steps: [
        {
          title: "Audit technique + équipe (1 à 2 semaines)",
          body: "Lecture de la codebase, interviews dev, audit pratique CI/CD et infra. Diagnostic écrit avec priorités et impact business.",
        },
        {
          title: "Plan d'action 3 à 6 mois",
          body: "Roadmap technique alignée business : refonte critique vs incremental, formation équipe, recrutement éventuel. Tu valides chaque chantier avant qu'on démarre.",
        },
        {
          title: "Lead opérationnel temps partiel",
          body: "1 à 3 jours par semaine selon scope : revues de code, pair programming, conception d'architecture, accompagnement des devs, points produit.",
        },
        {
          title: "Transmission progressive",
          body: "Objectif : ton équipe devient autonome. Je documente, je forme, et je sors quand tu n'as plus besoin de moi (pas avant).",
        },
      ],
    },
    relatedCases: ["civitime", "scormpilot"],
    guide: {
      href: "/blog/fractional-cto-lead-technique-temps-partiel",
      title: "Avoir un CTO sans le salaire, le modèle fractional",
    },
    faq: [
      {
        question: "Combien de temps par semaine ?",
        answer:
          "Selon scope : 1 à 3 jours par semaine. Pour un démarrage 'audit + plan d'action', 5 jours sur 2-3 semaines. Pour du lead opérationnel récurrent, généralement 2 jours par semaine.",
      },
      {
        question: "Quelle durée d'engagement minimum ?",
        answer:
          "3 mois minimum pour avoir un vrai impact. Idéal : 6 à 18 mois. Engagement renouvelable au trimestre, sortie possible avec préavis raisonnable.",
      },
      {
        question: "Tu peux gérer le recrutement de devs ?",
        answer:
          "Oui : définition du profil, screening technique, entretiens, validation. Je ne fais pas de chasse, mais je travaille avec ton recruteur ou ton cabinet sur la partie technique.",
      },
      {
        question: "Et si on a besoin que tu codes aussi sur le produit ?",
        answer:
          "C'est fréquent. Je peux mixer lead tech et dev hands-on. La répartition dépend de ce dont l'équipe a besoin (mentorat lourd vs accélérer une feature critique).",
      },
    ],
    schema: {
      name: "Lead tech fractional",
      description: `Axel Hamilcaro, développeur fullstack à Tours, passé de développeur à lead technique en 4 ans chez Civitime, encadre la technique de startups et de PME 1 à 3 jours par semaine, de 3 à 18 mois, à ${RATES.dailyHtEur} € HT par jour.`,
      serviceType: "Software engineering leadership",
      offers: [
        {
          name: "Audit technique d'équipe",
          description:
            "Audit complet de la codebase, des process et de l'organisation tech avec plan d'action priorisé.",
        },
        {
          name: "Lead tech fractional 3 à 18 mois",
          description:
            "Lead technique temps partiel sur engagement long. 1 à 3 jours par semaine selon scope.",
        },
        {
          name: "Mentorat technique d'équipe",
          description:
            "Accompagnement de devs juniors et mid-level via revues de code, pair programming et formations ciblées.",
        },
      ],
    },
  },
};
