import {
  CONTACT,
  EXTERNAL_LINKS,
  SITE_URL,
} from "@/app/_config/site.constants";

export type ServiceSlug =
  | "developpeur-nextjs-freelance"
  | "developpement-saas"
  | "integration-ia-rag";

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
        "Tu cherches un freelance Next.js senior qui prend en charge ton produit de A à Z et livre en production sans surprise ? J'interviens sur architecture, MVP, refonte et intégration IA.",
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

  "integration-ia-rag": {
    slug: "integration-ia-rag",
    url: `${SITE_URL}/services/integration-ia-rag`,
    metaTitle:
      "Intégration IA / RAG Freelance — Vercel AI SDK, OpenAI, Claude | Axel Hamilcaro",
    metaDescription:
      "Développeur freelance spécialisé intégration IA pragmatique : RAG, agents, AI SDK Vercel, OpenAI, Claude API. Référence : éditeur IA RAG Civitime (délais d'itération divisés par 2). Devis sous 24h.",
    hero: {
      eyebrow: "Service freelance",
      title: "Intégration IA pragmatique dans ton produit.",
      subtitle:
        "RAG, agents, génération assistée. Pas de hype : on identifie où l'IA crée de la vraie valeur business, on livre, on mesure.",
      ...baseHero,
    },
    problem: {
      title: "Tu reconnais une de ces situations ?",
      bullets: [
        "Ton équipe veut intégrer l'IA mais ne sait pas par où commencer.",
        "Tu as testé ChatGPT en interne mais ça ne s'intègre pas proprement à ton produit.",
        "Tu veux un copilote interne qui connaît tes données (RAG) sans envoyer ton corpus à OpenAI.",
        "Tu as besoin d'agents qui automatisent des workflows complexes dans ton produit.",
      ],
    },
    approach: {
      title: "Comment je travaille.",
      steps: [
        {
          title: "Cadrage cas d'usage",
          body: "On identifie 1 à 3 cas d'usage IA qui ont le ROI le plus clair pour ton produit. Pas 50 features gadget.",
        },
        {
          title: "POC en 1 à 2 semaines",
          body: "Un POC fonctionnel, pas une slide. Vercel AI SDK + OpenAI ou Claude + retrieval (Pinecone, pg_vector ou simple). Tu valides avant qu'on industrialise.",
        },
        {
          title: "Intégration produit",
          body: "Streaming, gestion des erreurs LLM, observabilité (Langfuse / Helicone), gestion des coûts par tenant, fallbacks.",
        },
        {
          title: "Mesure et itération",
          body: "On instrumente l'usage. Si une feature IA ne sert à personne, on la coupe. Pas de prod-show.",
        },
      ],
    },
    relatedCases: ["civitime"],
    faq: [
      {
        question: "Quels modèles tu utilises ?",
        answer:
          "OpenAI (GPT-4o, GPT-5), Anthropic (Claude Opus / Sonnet / Haiku), Vercel AI SDK pour l'orchestration. Choix dicté par le cas d'usage et le budget, pas par la mode.",
      },
      {
        question: "Tu peux faire du RAG sans envoyer mes données à OpenAI ?",
        answer:
          "Oui : modèles auto-hébergés (Llama, Mistral via vLLM), embeddings open source, vector store self-hosted (pg_vector PostgreSQL). Compromis qualité / coût / sécurité à arbitrer ensemble.",
      },
      {
        question: "Combien ça coûte de faire tourner ça en production ?",
        answer:
          "Très variable. Je t'aide à modéliser le coût par utilisateur dès le POC pour que tu saches si le business case tient avant d'industrialiser.",
      },
      {
        question: "Tu fais aussi de l'automatisation type n8n ou agents ?",
        answer:
          "Oui, agents avec AI SDK Vercel ou stack custom. Pour des workflows internes, n8n peut suffire. Pour de l'IA dans le produit, je code l'orchestration en TypeScript pour garder la maîtrise.",
      },
    ],
    schema: {
      serviceType: "AI integration consulting",
      offers: [
        {
          name: "POC IA / RAG en 1-2 semaines",
          description:
            "Un POC fonctionnel pour valider un cas d'usage IA dans ton produit avant industrialisation.",
        },
        {
          name: "Intégration IA en production",
          description:
            "Intégration complète d'IA dans ton produit : RAG, agents, observabilité, gestion des coûts.",
        },
        {
          name: "Conseil stratégie IA",
          description:
            "Aide au choix des cas d'usage IA à fort ROI, des modèles et de l'architecture adaptée.",
        },
      ],
    },
  },
};
