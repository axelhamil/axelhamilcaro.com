import {
  CONTACT,
  EXTERNAL_LINKS,
  SITE_URL,
} from "@/app/_config/site.constants";

export type ServiceSlug =
  | "developpeur-nextjs-freelance"
  | "developpement-saas"
  | "lead-tech-fractional";

export type RelatedCaseSlug =
  | "billetterie"
  | "civitime"
  | "homecafe"
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
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
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
  faq: { question: string; answer: string }[];
  schema: {
    serviceType: string;
    offers: { name: string; description: string }[];
  };
};

const baseHero = {
  primaryCtaLabel: "Lancer mon projet sous 24h",
  primaryCtaHref: CONTACT.mailto,
  secondaryCtaLabel: "Réserver mon audit",
  secondaryCtaHref: EXTERNAL_LINKS.calendly,
};

export const servicesData: Record<ServiceSlug, ServiceData> = {
  "developpeur-nextjs-freelance": {
    slug: "developpeur-nextjs-freelance",
    url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
    metaTitle:
      "Développeur Next.js Freelance — Architecture, MVP, Refonte | Axel Hamilcaro",
    metaDescription:
      "Développeur Next.js freelance, 5 ans d'expérience. Architecture moderne, MVP en 4-8 semaines, refonte d'apps existantes. Stack TypeScript / React 19 / Tailwind v4. Devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Développeur Next.js freelance qui livre vraiment.",
      subtitle:
        "Tu cherches un freelance Next.js senior qui prend en charge ton produit de A à Z et livre en production sans surprise ? J'interviens sur architecture, MVP, refonte et lead tech temps partiel.",
      ...baseHero,
    },
    problem: {
      title: "Tu reconnais une de ces situations ?",
      bullets: [
        "Ton équipe est saturée et ton roadmap dérape.",
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
    relatedCases: ["scormpilot", "homecafe", "billetterie"],
    faq: [
      {
        question: "Quel est ton TJM ?",
        answer: "450€ HT/jour. Devis au forfait possible pour scope fermé.",
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
        question: "Tu fais du React Native aussi ?",
        answer:
          "Oui, mobile native via Expo et React Native. HomeCafé est ma référence récente : app web Next.js et app mobile native dans le même monorepo Turborepo.",
      },
    ],
    schema: {
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
    metaTitle:
      "Développement SaaS Freelance — Multi-tenant, Architecture, Production | Axel Hamilcaro",
    metaDescription:
      "Développeur freelance spécialisé SaaS B2B. Architecture multi-tenant, Clean Architecture + DDD, mise en production complète. Référence : ScormPilot (5 apps en solo). Devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Je conçois et livre ton SaaS de zéro jusqu'en production.",
      subtitle:
        "Multi-tenancy, Clean Architecture, DDD, CI/CD, monitoring. Stack moderne et maintenable, pas de YAGNI déguisé en sur-ingénierie.",
      ...baseHero,
    },
    problem: {
      title: "Tu reconnais une de ces situations ?",
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
    relatedCases: ["scormpilot", "civitime"],
    faq: [
      {
        question: "Tu peux faire du multi-tenancy avec quel pattern ?",
        answer:
          "Selon le contexte : row-level security PostgreSQL (simple, économique), schema-per-tenant (isolation forte, plus coûteux), database-per-tenant (clients enterprise). Je t'aide à choisir, pas un dogme.",
      },
      {
        question: "Combien de temps pour livrer un MVP SaaS ?",
        answer:
          "4 à 12 semaines selon scope. Référence : ScormPilot = 5 applications livrées en solo (API, dashboard, lecteur SCORM, runtime, app Teams).",
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
      serviceType: "SaaS development consulting",
      offers: [
        {
          name: "Développement SaaS multi-tenant",
          description:
            "Conception et développement d'un SaaS B2B from scratch jusqu'en production.",
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
    metaTitle:
      "Lead Technique Fractional Freelance — Architecture, Équipe, Mentorat | Axel Hamilcaro",
    metaDescription:
      "Lead technique freelance temps partiel pour startups et PME. Référence : 4 ans lead tech Civitime (refonte Clean Architecture, baisse du churn, hausse engagement). Devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Lead technique fractional pour ton équipe.",
      subtitle:
        "Tu as une équipe dev mais pas de senior pour structurer l'architecture, cadrer les choix techno et accompagner la montée en compétence ? J'interviens en lead tech temps partiel sur des engagements de 3 à 18 mois.",
      ...baseHero,
    },
    problem: {
      title: "Tu reconnais une de ces situations ?",
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
