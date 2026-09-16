export const SITE_URL = "https://axelhamilcaro.com";

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

export const FREELANCE_SINCE_YEAR = 2024;

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
  tma: { proMonthlyEur: 350, premiumMonthlyEur: 800 },
} as const;

export const JOB_TITLE =
  "Développeur Web Fullstack | Next.js | React | Node" as const;
