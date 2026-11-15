import { PARCOURS } from "./parcours";

export const SITE_URL = "https://axelhamilcaro.com";

export const PERSON_ID = `${SITE_URL}/#person`;

export const PALETTE = {
  noir: "#0d0d0d",
  papier: "#f3f0e6",
  jaune: "#ffdd00",
  gris: "#8a867c",
} as const;

export const MCP = {
  url: `${SITE_URL}/mcp`,
  manifestPath: "/.well-known/mcp.json",
  manifestUrl: `${SITE_URL}/.well-known/mcp.json`,
  catalogUrl: `${SITE_URL}/.well-known/mcp/catalog.json`,
  aiCatalogPath: "/.well-known/ai-catalog.json",
  aiCatalogUrl: `${SITE_URL}/.well-known/ai-catalog.json`,
  serverCardUrl: `${SITE_URL}/mcp/server-card`,
  llmsPath: "/llms.txt",
  llmsUrl: `${SITE_URL}/llms.txt`,
} as const;

export const EXTERNAL_LINKS = {
  calendly: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
  linkedin: "https://www.linkedin.com/in/axelhamilcaro/",
  github: "https://github.com/axelhamil",
  malt: "https://www.malt.fr/profile/axelhamilcaro",
  googleBusiness: "https://www.google.com/search?kgmid=/g/11nqct9z28",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/axelhmlcr/",
  tiktok: "https://www.tiktok.com/@axelhmlcr",
} as const;

export const CONTACT = {
  email: "contact@axelhamilcaro.com",
  mailto: "mailto:contact@axelhamilcaro.com",
  noreply: "noreply@axelhamilcaro.com",
} as const;

export const PROFILE_IMAGE = `${SITE_URL}/axel-hamilcaro-developpeur-fullstack.jpeg`;

export const AUTHOR = {
  name: "Axel Hamilcaro",
  imagePath: "/axel-hamilcaro-developpeur-fullstack.jpeg",
} as const;

export const LEGAL_ENTITY = {
  legalName: "HAMILCARO AXEL",
  status: "Entrepreneur individuel (EI), micro-entreprise",
  siren: "939 291 415",
  siret: "939 291 415 00015",
  rcs: "939 291 415 R.C.S. Paris (immatriculé le 20/01/2025)",
  apeActivity: "Programmation informatique",
  vatStatus: "TVA non applicable, art. 293 B du CGI",
  address: "60 rue François Ier, 75008 Paris, France",
} as const;

export const FREELANCE_SINCE_YEAR = Number(PARCOURS.compte.debut.iso);

export const getFreelanceYears = (): number =>
  Math.max(1, new Date().getFullYear() - FREELANCE_SINCE_YEAR);

export const AVAILABILITY = {
  status: "available",
  location: "Tours, Centre-Val de Loire",
  remote: "France",
  startWindow: "1 to 3 weeks",
  quoteSla: "24h",
} as const;

export const RATES = {
  dailyHtEur: 500,
  tma: { proMonthlyEur: 350, premiumMonthlyEur: 800, overflowHourlyEur: 80 },
} as const;

export const JOB_TITLE = "Développeur fullstack et builder" as const;

export const IDENTITY_TITLE = `${AUTHOR.name}, développeur fullstack et builder`;

export const THESIS = {
  firstPerson:
    "Je construis les API et les outils de fondation sur lesquels d'autres bâtissent leurs produits, plutôt que des SaaS qui consomment ces API. Mon pari pour 2026 et 2027 : fournir l'outil et la donnée, pas l'application finale.",
  thirdPerson:
    "Il construit les API et les outils de fondation sur lesquels d'autres bâtissent leurs produits, plutôt que des SaaS qui consomment ces API. Son pari pour 2026 et 2027 : fournir l'outil et la donnée, pas l'application finale.",
} as const;

export const OPENUP = {
  name: PARCOURS.openup.organisation,
  url: "https://openup.to",
  role: PARCOURS.openup.role,
  sinceYear: Number(PARCOURS.openup.debut.iso),
} as const;

export const EMPLOYER = {
  name: PARCOURS.eskimoz.organisation,
  role: PARCOURS.eskimoz.role,
  contract: PARCOURS.eskimoz.contrat,
  since: PARCOURS.eskimoz.debut.iso,
} as const;
