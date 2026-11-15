import { PARCOURS } from "@/app/_config/parcours";
import { BUILDS_SUMMARY } from "@/app/_config/projects";
import {
  AUTHOR,
  AVAILABILITY,
  CONTACT,
  EMPLOYER,
  EXTERNAL_LINKS,
  FREELANCE_SINCE_YEAR,
  getFreelanceYears,
  IDENTITY_TITLE,
  JOB_TITLE,
  MCP,
  OPENUP,
  RATES,
  SITE_URL,
  THESIS,
} from "@/app/_config/site.constants";
import {
  AFTERLIVE_AMBITION,
  getProjects,
  renderProjectsMarkdown,
  WEATHERTOP_AMBITION,
} from "./mcp.projects";

export const CATALOG_SECTION_IDS = [
  "whoami",
  "architecture-manifesto",
  "live-status",
  "stack-matrix",
  "projects",
  "case-studies",
  "services",
  "contact",
] as const;

export type CatalogSectionId = (typeof CATALOG_SECTION_IDS)[number];

export function isCatalogSectionId(value: string): value is CatalogSectionId {
  return (CATALOG_SECTION_IDS as readonly string[]).includes(value);
}

export type StackSeniority = "expert" | "strong" | "working";

export type StackEntry = {
  name: string;
  seniority: StackSeniority;
};

const SIGNATURE_STACK = "Next.js, React, Node" as const;

const GITHUB_TOOLS = [
  "inwire",
  "galvorn",
  "aggregate-kit",
  "burnrate",
  "ccwatermelon",
  "claude-window",
  "cockpit",
] as const;

const BUILDS = [
  {
    name: "clean-stack",
    kind: "Boilerplate SaaS open source (Bun, Hono, React 19, Drizzle), Clean Architecture + DDD, 17 étoiles GitHub",
    url: "https://github.com/axelhamil/clean-stack",
  },
  {
    name: "weathertop",
    kind: WEATHERTOP_AMBITION,
  },
  {
    name: "afterlive",
    kind: AFTERLIVE_AMBITION,
  },
  {
    name: "Outils publiés sur GitHub",
    kind: `${GITHUB_TOOLS.join(", ")} (détail : site://projects)`,
    url: EXTERNAL_LINKS.github,
  },
];

const IDENTITY_SUMMARY = `${AUTHOR.name} est développeur fullstack et builder, basé à Tours. ${THESIS.thirdPerson} ${BUILDS_SUMMARY} ${EMPLOYER.role} chez ${EMPLOYER.name} (CDI) depuis septembre 2026, auparavant 4 ans chez Civitime de développeur à lead technique. ${OPENUP.role} d'${OPENUP.name} depuis ${OPENUP.sinceYear}, en projet parallèle. Il prend encore quelques projets en freelance.`;

const AI_AGENTS =
  "Travaille avec des agents IA tous les jours. Ce site expose un serveur MCP public.";

const PRINCIPLES = [
  "Comprendre le problème avant d'ouvrir l'éditeur.",
  "Écrire le test avant le code.",
  "Garder une architecture qu'un autre dev, ou un agent, peut reprendre sans moi.",
  "Mettre en prod tôt, mesurer, corriger.",
] as const;

type CaseStudy = {
  slug: string;
  title: string;
  path: string;
  summary: string;
  role?: string;
  year?: number;
  status?: string;
  metrics: readonly string[];
  stack: readonly string[];
};

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: "scormpilot",
    title: "ScormPilot",
    path: "/portfolio/scormpilot",
    summary:
      "SaaS e-learning SCORM multi-tenant, 5 apps en solo (monorepo Turborepo), 99.9% uptime.",
    metrics: ["5 apps solo", "99.9% uptime", "monorepo Turborepo"],
    stack: ["Next.js", "Fastify", "PostgreSQL", "DDD"],
  },
  {
    slug: "civitime",
    title: "Civitime",
    path: "/portfolio/civitime",
    summary:
      "Plateforme RSE EdTech B Corp, 250 000+ collaborateurs, 4 ans de développeur à lead technique, refonte Clean Archi + DDD + event sourcing.",
    metrics: [
      "250 000+ collaborateurs",
      "4 ans, développeur à lead",
      "completion 65-73%",
    ],
    stack: ["React", "NestJS", "DDD", "event sourcing"],
  },
  {
    slug: "openup",
    title: OPENUP.name,
    path: "/portfolio/openup",
    summary:
      "Projet parallèle dont Axel Hamilcaro est le fondateur technique depuis 2026. Des deep links qui sortent du navigateur interne d'Instagram ou de TikTok et ouvrent l'app native, plus de 50 apps, redirection décidée en moins de 50 ms depuis l'edge. QR codes, link-in-bio et analytics autour, web, iOS et Android depuis une seule codebase, abonnés payants en euros et en dollars.",
    role: OPENUP.role,
    year: OPENUP.sinceYear,
    status: "in progress",
    metrics: [
      "50+ apps natives",
      "<50ms edge",
      "web + iOS + Android, une codebase",
      "abonnés EUR + USD",
    ],
    stack: ["Hono", "Capacitor", "Cloudflare Workers", "Stripe"],
  },
  {
    slug: "billetterie",
    title: "Billetterie",
    path: "/portfolio/billetterie",
    summary:
      "Dashboard interne de billetterie, plan de salle 2D/3D, WebSocket <200ms, solo en 1 mois.",
    metrics: ["<200ms WebSocket", "solo 1 mois", "plan 2D/3D"],
    stack: ["Next.js", "NestJS", "WebSocket", "PostgreSQL"],
  },
];

const monthYear = (iso: string) =>
  new Date(`${iso}-01`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function getCareer() {
  return {
    education: {
      school: PARCOURS.formation.organisation,
      year: Number(PARCOURS.formation.debut.iso),
      diploma: "Concepteur Développeur",
    },
    civitime: {
      from: monthYear(PARCOURS.civitime.debut.iso),
      to: monthYear(PARCOURS.civitime.fin.iso),
      progression: "developer to lead",
      company: PARCOURS.civitime.organisation,
      kind: "EdTech B Corp",
      product: "RSE platform",
      architecture: "Clean Archi + DDD + event sourcing",
    },
    freelanceSince: FREELANCE_SINCE_YEAR,
    foundersAccompanied: "une dizaine",
    openup: {
      company: OPENUP.name,
      url: OPENUP.url,
      role: OPENUP.role,
      since: OPENUP.sinceYear,
      status: "in progress",
    },
    employer: {
      company: EMPLOYER.name,
      role: EMPLOYER.role,
      contract: EMPLOYER.contract,
      since: EMPLOYER.since,
    },
  };
}

function getCurrentRoles() {
  return [
    {
      organization: EMPLOYER.name,
      role: EMPLOYER.role,
      contract: EMPLOYER.contract,
      since: EMPLOYER.since,
    },
    {
      organization: OPENUP.name,
      url: OPENUP.url,
      role: `${OPENUP.role}, projet parallèle`,
      since: String(OPENUP.sinceYear),
    },
    {
      organization: "Freelance",
      role: "Développeur fullstack freelance, quelques projets clients",
      since: String(FREELANCE_SINCE_YEAR),
    },
  ];
}

export function getWhoami() {
  return {
    name: AUTHOR.name,
    jobTitle: JOB_TITLE,
    identity: IDENTITY_TITLE,
    summary: IDENTITY_SUMMARY,
    builds: BUILDS,
    location: AVAILABILITY.location,
    remote: AVAILABILITY.remote,
    stack: SIGNATURE_STACK,
    currentRoles: getCurrentRoles(),
    aiAgents: AI_AGENTS,
    mcpServer: MCP.url,
    freelanceSince: FREELANCE_SINCE_YEAR,
    freelanceYears: getFreelanceYears(),
    dailyRateHtEur: RATES.dailyHtEur,
    quoteSla: AVAILABILITY.quoteSla,
    startWindow: AVAILABILITY.startWindow,
    email: CONTACT.email,
    availability: AVAILABILITY,
    career: getCareer(),
  };
}

export function getManifesto() {
  return {
    principles: [...PRINCIPLES],
    typescript: "TypeScript strict",
    architecture:
      "Clean Architecture + DDD quand le produit le mérite. Pragmatique quand il faut juste livrer vite. Pas de sur-ingénierie pour le plaisir.",
  };
}

export function getLiveStatus() {
  return {
    status: AVAILABILITY.status,
    location: AVAILABILITY.location,
    remote: AVAILABILITY.remote,
    startWindow: AVAILABILITY.startWindow,
    quoteSla: AVAILABILITY.quoteSla,
    freelanceSince: FREELANCE_SINCE_YEAR,
    freelanceYears: getFreelanceYears(),
    context: {
      employer: `${EMPLOYER.role} chez ${EMPLOYER.name} (CDI depuis ${EMPLOYER.since})`,
      builds: `weathertop : ${WEATHERTOP_AMBITION} afterlive : ${AFTERLIVE_AMBITION}`,
      product: `${OPENUP.role} d'${OPENUP.name}, projet parallèle en cours`,
      freelance: "Prend encore quelques projets en freelance",
    },
  };
}

export function getStackMatrix() {
  return {
    frontend: [
      { name: "Next.js", seniority: "expert" },
      { name: "React", seniority: "expert" },
    ] satisfies StackEntry[],
    backend: [
      { name: "Node", seniority: "expert" },
      { name: "NestJS", seniority: "strong" },
      { name: "Fastify", seniority: "strong" },
    ] satisfies StackEntry[],
    db: [
      { name: "PostgreSQL", seniority: "strong" },
      { name: "Drizzle", seniority: "strong" },
    ] satisfies StackEntry[],
    tooling: [
      { name: "TypeScript", seniority: "expert" },
      { name: "Stripe", seniority: "strong" },
      { name: "Capacitor", seniority: "strong" },
    ] satisfies StackEntry[],
    infra: [
      { name: "Vercel", seniority: "strong" },
      { name: "Docker", seniority: "working" },
      { name: "Cloudflare", seniority: "strong" },
    ] satisfies StackEntry[],
  };
}

export function getCaseStudies() {
  return CASE_STUDIES.map((study) => ({
    slug: study.slug,
    title: study.title,
    path: study.path,
    url: `${SITE_URL}${study.path}`,
    summary: study.summary,
    role: study.role,
    year: study.year,
    status: study.status,
    metrics: [...study.metrics],
    stack: [...study.stack],
  }));
}

export function getServices() {
  return [
    {
      slug: "developpeur-nextjs-freelance",
      title: "Développement web sur mesure",
      url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
      dailyHtEur: RATES.dailyHtEur,
    },
    {
      slug: "developpement-saas",
      title: "Développement SaaS freelance",
      url: `${SITE_URL}/services/developpement-saas`,
      dailyHtEur: RATES.dailyHtEur,
    },
    {
      slug: "lead-tech-fractional",
      title: "Lead tech fractional freelance",
      url: `${SITE_URL}/services/lead-tech-fractional`,
      dailyHtEur: RATES.dailyHtEur,
    },
    {
      slug: "creation-application-web",
      title: "Création d'application web de A à Z",
      url: `${SITE_URL}/services/creation-application-web`,
      dailyHtEur: RATES.dailyHtEur,
    },
    {
      slug: "tma",
      title: "TMA (tierce maintenance applicative)",
      url: `${SITE_URL}/tma`,
      monthlyRates: {
        proEur: RATES.tma.proMonthlyEur,
        premiumEur: RATES.tma.premiumMonthlyEur,
      },
    },
  ];
}

export function getContact() {
  return {
    email: CONTACT.email,
    mailto: CONTACT.mailto,
    linkedin: EXTERNAL_LINKS.linkedin,
    github: EXTERNAL_LINKS.github,
    malt: EXTERNAL_LINKS.malt,
    calendly: EXTERNAL_LINKS.calendly,
  };
}

export function getCatalogSection(id: CatalogSectionId) {
  switch (id) {
    case "whoami":
      return getWhoami();
    case "architecture-manifesto":
      return getManifesto();
    case "live-status":
      return getLiveStatus();
    case "stack-matrix":
      return getStackMatrix();
    case "projects":
      return getProjects();
    case "case-studies":
      return getCaseStudies();
    case "services":
      return getServices();
    case "contact":
      return getContact();
  }
}

export function renderMarkdown(id: CatalogSectionId): string {
  switch (id) {
    case "whoami":
      return renderWhoamiMarkdown();
    case "architecture-manifesto":
      return renderManifestoMarkdown();
    case "live-status":
      return renderLiveStatusMarkdown();
    case "stack-matrix":
      return renderStackMatrixMarkdown();
    case "projects":
      return renderProjectsMarkdown();
    case "case-studies":
      return renderCaseStudiesMarkdown();
    case "services":
      return renderServicesMarkdown();
    case "contact":
      return renderContactMarkdown();
  }
}

function renderWhoamiMarkdown() {
  const whoami = getWhoami();
  const career = whoami.career;

  return [
    `# ${whoami.name}`,
    "",
    `**${whoami.jobTitle}**`,
    "",
    whoami.summary,
    "",
    `- Location: ${whoami.location}`,
    `- Remote: ${whoami.remote}`,
    `- Stack: ${whoami.stack}`,
    `- AI agents: ${whoami.aiAgents}`,
    `- MCP server: ${whoami.mcpServer}`,
    `- Email: ${whoami.email}`,
    "",
    "## Builds",
    "",
    ...whoami.builds.map((build) =>
      build.url
        ? `- ${build.name}: ${build.kind} ${build.url}`
        : `- ${build.name}: ${build.kind}`,
    ),
    "",
    "## Current roles",
    "",
    ...whoami.currentRoles.map(
      (role) => `- ${role.organization}: ${role.role}, since ${role.since}`,
    ),
    "",
    "## Freelance",
    "",
    `- Freelance since: ${whoami.freelanceSince} (${whoami.freelanceYears} years)`,
    `- TJM: ${whoami.dailyRateHtEur}€ HT/day`,
    `- Quote SLA: ${whoami.quoteSla}`,
    `- Start window: ${whoami.startWindow}`,
    "",
    "## Career",
    "",
    `- ${career.education.school} ${career.education.year} (${career.education.diploma})`,
    `- ${career.civitime.company}, ${career.civitime.from} to ${career.civitime.to}, ${career.civitime.progression}. ${career.civitime.kind}, ${career.civitime.product}, ${career.civitime.architecture}.`,
    `- Freelance since ${career.freelanceSince}, ${career.foundersAccompanied} de fondateurs accompagnés.`,
    `- ${career.openup.company} (${career.openup.url}), ${career.openup.role} since ${career.openup.since}, ${career.openup.status}.`,
    `- ${career.employer.company}, ${career.employer.role}, ${career.employer.contract} since ${career.employer.since}.`,
  ].join("\n");
}

function renderManifestoMarkdown() {
  const manifesto = getManifesto();

  return [
    "# Architecture manifesto",
    "",
    "## Principles",
    "",
    ...manifesto.principles.map((principle) => `- ${principle}`),
    "",
    "## Architecture",
    "",
    `- ${manifesto.typescript}`,
    `- ${manifesto.architecture}`,
  ].join("\n");
}

function renderLiveStatusMarkdown() {
  const status = getLiveStatus();

  return [
    "# Live status",
    "",
    `- Status: ${status.status}`,
    `- Location: ${status.location}`,
    `- Remote: ${status.remote}`,
    `- Start window: ${status.startWindow}`,
    `- Quote SLA: ${status.quoteSla}`,
    `- Freelance since: ${status.freelanceSince} (${status.freelanceYears} years)`,
    "",
    "## Context",
    "",
    `- ${status.context.employer}`,
    `- ${status.context.builds}`,
    `- ${status.context.product}`,
    `- ${status.context.freelance}`,
  ].join("\n");
}

function renderStackMatrixMarkdown() {
  const matrix = getStackMatrix();

  return [
    "# Stack matrix",
    "",
    ...Object.entries(matrix).flatMap(([category, entries]) => [
      `## ${category}`,
      "",
      ...entries.map((entry) => `- ${entry.name}: ${entry.seniority}`),
      "",
    ]),
  ].join("\n");
}

function renderCaseStudiesMarkdown() {
  return [
    "# Case studies",
    "",
    ...getCaseStudies().flatMap((study) => [
      `## ${study.title}`,
      "",
      ...(study.role
        ? [`${study.role}, ${study.year}, ${study.status}.`, ""]
        : []),
      study.summary,
      "",
      ...study.metrics.map((metric) => `- ${metric}`),
      "",
      `Stack: ${study.stack.join(", ")}`,
      "",
      study.url,
      "",
    ]),
  ].join("\n");
}

function renderServicesMarkdown() {
  return [
    "# Services",
    "",
    ...getServices().flatMap((service) => {
      const rate =
        "dailyHtEur" in service
          ? `${service.dailyHtEur}€ HT/day`
          : `PRO ${service.monthlyRates.proEur}€/month, PREMIUM ${service.monthlyRates.premiumEur}€/month`;

      return [`## ${service.title}`, "", `- ${rate}`, `- ${service.url}`, ""];
    }),
  ].join("\n");
}

function renderContactMarkdown() {
  const contact = getContact();

  return [
    "# Contact",
    "",
    `- Email: ${contact.email}`,
    `- Malt: ${contact.malt}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- GitHub: ${contact.github}`,
    `- Calendly: ${contact.calendly}`,
  ].join("\n");
}
