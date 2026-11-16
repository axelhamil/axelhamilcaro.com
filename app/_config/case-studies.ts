interface CasePosterContent {
  name: string;
  lines: readonly [string, string];
  highlights: readonly string[];
  ribbon: readonly string[];
  status: string;
  year: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  role: string;
  status: "En cours" | "Expédié";
  year: string;
  description: string;
  tech: readonly string[];
  href: string;
  poster: CasePosterContent;
}

export const OPENUP_CASE: CaseStudy = {
  slug: "openup",
  title: "OpenUp",
  role: "Fondateur technique, en parallèle",
  status: "En cours",
  year: "2026",
  description:
    "Un lien partagé sur Instagram ou TikTok s'ouvre dans leur navigateur interne, où personne n'est connecté à rien. OpenUp l'ouvre directement dans l'app native, pour plus de 50 apps.",
  tech: ["Hono", "Capacitor", "Cloudflare Workers"],
  href: "/portfolio/openup",
  poster: {
    name: "OpenUp / Fondateur technique",
    lines: ["Le lien qui ouvre", "la vraie app."],
    highlights: ["50+ apps", "< 50 ms", "web + iOS + Android"],
    ribbon: [
      "Deep links",
      "Liens raccourcis",
      "QR codes dynamiques",
      "Link-in-bio",
      "Analytics",
      "Domaine personnalisé",
      "11 in-app browsers",
      "Stripe EUR + USD",
    ],
    status: "En cours",
    year: "2026",
  },
};

export const MISSION_CASES: readonly CaseStudy[] = [
  {
    slug: "scormpilot",
    title: "ScormPilot",
    role: "SaaS, conçu en solo",
    status: "Expédié",
    year: "2025",
    description:
      "J'ai conçu et développé seul une plateforme SaaS e-learning. C'est une alternative simple aux LMS rigides.",
    tech: ["Next.js", "Fastify", "PostgreSQL"],
    href: "/portfolio/scormpilot",
    poster: {
      name: "ScormPilot",
      lines: ["E-learning", "sans LMS."],
      highlights: [
        "Milliers de sessions / jour",
        "Multi-tenant",
        "SCORM 1.2 + 2004",
      ],
      ribbon: [
        "Player et runtime",
        "Multi-diffusion",
        "Dashboard analytics",
        "App Teams",
        "5 apps en solo",
        "Architecture hexagonale",
        "RGPD",
        "Hébergement européen",
      ],
      status: "Expédié",
      year: "2025 / 2026",
    },
  },
  {
    slug: "civitime",
    title: "Civitime",
    role: "4 ans, de dev à lead technique",
    status: "Expédié",
    year: "2024",
    description:
      "Une startup B Corp qui sensibilise à la RSE par des serious games. J'y ai réécrit le legacy en Clean Architecture et DDD.",
    tech: ["React", "NestJS", "SCORM"],
    href: "/portfolio/civitime",
    poster: {
      name: "Civitime",
      lines: ["250 000", "collaborateurs."],
      highlights: [
        "100+ entreprises",
        "65 à 73 % de complétion",
        "Lead technique",
      ],
      ribbon: [
        "Serious games",
        "B Corp",
        "200+ modules RSE",
        "22 langues",
        "SCORM",
        "Gamification",
        "Éditeur de scénarios",
        "Clean Architecture",
      ],
      status: "Expédié",
      year: "2021 / 2024",
    },
  },
  {
    slug: "billetterie",
    title: "Billetterie Interne",
    role: "Dashboard, mission client",
    status: "Expédié",
    year: "2025",
    description:
      "Un dashboard interne pour gérer des événements et suivre les ventes en temps réel. Le projet est sous NDA.",
    tech: ["Next.js", "NestJS", "WebSocket"],
    href: "/portfolio/billetterie",
    poster: {
      name: "Billetterie en ligne",
      lines: ["Livré", "en un mois."],
      highlights: ["< 200 ms", "Plan de salle 2D / 3D", "Multi-TVA"],
      ribbon: [
        "Dashboard temps réel",
        "WebSocket",
        "Vue 3D",
        "Seats.io",
        "Réservations",
        "NestJS",
        "PostgreSQL",
        "NDA",
      ],
      status: "Expédié",
      year: "2025",
    },
  },
];

const HOME_CLIENT_SLUGS = ["scormpilot", "billetterie"];

export const HOME_CLIENT_CASES: readonly CaseStudy[] = MISSION_CASES.filter(
  (study) => HOME_CLIENT_SLUGS.includes(study.slug),
);

export const getCaseMeta = (study: CaseStudy) =>
  `${study.role} / ${study.status} ${study.year}`;
