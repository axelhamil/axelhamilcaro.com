import {
  AUTHOR,
  AVAILABILITY,
  CONTACT,
  EXTERNAL_LINKS,
  FREELANCE_SINCE_YEAR,
  getFreelanceYears,
  JOB_TITLE,
  RATES,
  SITE_URL,
} from "@/app/_config/site.constants";

export type CatalogSectionId =
  | "whoami"
  | "architecture-manifesto"
  | "live-status"
  | "stack-matrix"
  | "case-studies"
  | "services"
  | "contact";

export type StackSeniority = "expert" | "strong" | "working";

export type StackEntry = {
  name: string;
  seniority: StackSeniority;
};

const SIGNATURE_STACK = "Next.js, React, Node" as const;

const CASE_STUDIES = [
  {
    slug: "scormpilot",
    title: "ScormPilot",
    path: "/portfolio/scormpilot",
    summary: "SaaS e-learning SCORM multi-tenant, 5 apps en solo.",
  },
  {
    slug: "civitime",
    title: "Civitime",
    path: "/portfolio/civitime",
    summary: "Plateforme RSE EdTech B Corp, de développeur à lead technique.",
  },
  {
    slug: "openup",
    title: "OpenUp",
    path: "/portfolio/openup",
    summary: "SaaS de gestion de liens tout-en-un, iOS, Android et PWA.",
  },
  {
    slug: "billetterie",
    title: "Billetterie",
    path: "/portfolio/billetterie",
    summary:
      "Dashboard interne de billetterie, plan de salle 2D/3D, WebSocket.",
  },
] as const;

export function getCareer() {
  return {
    education: {
      school: "Wild Code School",
      year: 2020,
      diploma: "Concepteur Développeur",
    },
    civitime: {
      from: "January 2021",
      to: "December 2024",
      progression: "developer to lead",
      company: "Civitime",
      kind: "EdTech B Corp",
      product: "RSE platform",
      architecture: "Clean Archi + DDD + event sourcing",
    },
    freelanceSince: FREELANCE_SINCE_YEAR,
  };
}

export function getWhoami() {
  return {
    name: AUTHOR.name,
    jobTitle: JOB_TITLE,
    location: AVAILABILITY.location,
    remote: AVAILABILITY.remote,
    stack: SIGNATURE_STACK,
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
    typescript: "TypeScript strict",
    architecture:
      "Clean Architecture + DDD quand le produit le mérite. Pragmatique quand il faut juste livrer vite. Pas de sur-ingénierie pour le plaisir.",
    values: [
      {
        title: "Code propre, pas dogmatique",
        text: "Clean Architecture + DDD quand le produit le mérite. Pragmatique quand il faut juste livrer vite. Pas de sur-ingénierie pour le plaisir.",
      },
      {
        title: "Vision produit avant la technique",
        text: "Je pose les bonnes questions sur le métier avant de coder. Le code doit servir un objectif business clair, sinon il ne sert à rien.",
      },
      {
        title: "Livraison fiable",
        text: 'Je tiens mes engagements. Pas de surprise sur les délais, pas de dette technique cachée, pas de "ça marchait sur mon poste".',
      },
      {
        title: "Communication directe",
        text: "Je travaille en async, je documente, je préviens dès qu'un blocage apparaît. Pas besoin de me chasser pour avoir un statut.",
      },
    ],
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
    `- Location: ${whoami.location}`,
    `- Remote: ${whoami.remote}`,
    `- Stack: ${whoami.stack}`,
    `- Freelance since: ${whoami.freelanceSince} (${whoami.freelanceYears} years)`,
    `- TJM: ${whoami.dailyRateHtEur}€ HT/day`,
    `- Quote SLA: ${whoami.quoteSla}`,
    `- Start window: ${whoami.startWindow}`,
    `- Email: ${whoami.email}`,
    "",
    "## Career",
    "",
    `${career.education.school} ${career.education.year} (${career.education.diploma}) → ${career.civitime.company} ${career.civitime.from}–${career.civitime.to}, ${career.civitime.progression}. ${career.civitime.company} = ${career.civitime.kind}, ${career.civitime.product}, ${career.civitime.architecture}. Freelance since ${career.freelanceSince}.`,
  ].join("\n");
}

function renderManifestoMarkdown() {
  const manifesto = getManifesto();

  return [
    "# Architecture manifesto",
    "",
    `- ${manifesto.typescript}`,
    `- ${manifesto.architecture}`,
    "",
    ...manifesto.values.flatMap((value) => [
      `## ${value.title}`,
      "",
      value.text,
      "",
    ]),
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
      study.summary,
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
