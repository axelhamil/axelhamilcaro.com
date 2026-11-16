import { BUILDS_SUMMARY } from "@/app/_config/projects";
import {
  AUTHOR,
  CONTACT,
  EMPLOYER,
  EXTERNAL_LINKS,
  IDENTITY_TITLE,
  JOB_TITLE,
  OPENUP,
  PERSON_ID,
  PROFILE_IMAGE,
  SITE_URL,
  SOCIAL_LINKS,
  THESIS,
} from "@/app/_config/site.constants";
import { JsonLdScript } from "./json-ld-script";
import { buildMcpApiNode, MCP_API_ID } from "./schemas/mcp-api";

export const WEBSITE_ID = `${SITE_URL}/#website`;
const OPENUP_ID = `${OPENUP.url}/#organization`;
const EMPLOYER_ID = `${SITE_URL}/#employer`;

export const PERSON_DESCRIPTION = `Axel Hamilcaro est développeur fullstack et builder, basé à Tours, en Centre-Val de Loire. ${THESIS.thirdPerson} ${BUILDS_SUMMARY} Il a passé 4 ans chez Civitime, de développeur à lead technique. Il est aussi le fondateur technique d'OpenUp depuis 2026 et prend encore quelques projets en freelance.`;

const KNOWS_ABOUT = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Bun",
  "Hono",
  "PostgreSQL",
  "Drizzle ORM",
  "Clean Architecture",
  "Domain-Driven Design",
  "SaaS B2B multi-tenant",
  "Développement avec des agents IA",
  "Model Context Protocol",
  "Outils pour Claude Code",
  "Open source",
  "Cloudflare Workers",
  "Deep linking",
];

const PERSON_SAME_AS = [
  EXTERNAL_LINKS.linkedin,
  EXTERNAL_LINKS.github,
  EXTERNAL_LINKS.malt,
  EXTERNAL_LINKS.googleBusiness,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.tiktok,
];

const PERSON_NODE = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  givenName: "Axel",
  familyName: "Hamilcaro",
  url: SITE_URL,
  image: PROFILE_IMAGE,
  jobTitle: JOB_TITLE,
  description: PERSON_DESCRIPTION,
  email: CONTACT.mailto,
  knowsLanguage: ["fr-FR", "en"],
  knowsAbout: KNOWS_ABOUT,
  worksFor: {
    "@type": "Organization",
    "@id": EMPLOYER_ID,
    name: EMPLOYER.name,
  },
  affiliation: { "@id": OPENUP_ID },
  subjectOf: { "@id": MCP_API_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tours",
    addressRegion: "Centre-Val de Loire",
    addressCountry: "FR",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Wild Code School",
    url: "https://www.wildcodeschool.com/",
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Concepteur Développeur d'applications Web & Mobile (Bac+3/4)",
    credentialCategory: "degree",
  },
  sameAs: PERSON_SAME_AS,
};

const PERSON_NODE_WITHOUT_EMPLOYER = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: SITE_URL,
  jobTitle: JOB_TITLE,
  sameAs: PERSON_SAME_AS,
};

function buildGlobalGraph(person: object) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "Organization",
        "@id": OPENUP_ID,
        name: OPENUP.name,
        url: OPENUP.url,
        sameAs: [OPENUP.url],
        description:
          "OpenUp génère des deep links qui sortent du navigateur interne d'Instagram ou de TikTok et ouvrent l'app native, pour plus de 50 apps.",
        foundingDate: String(OPENUP.sinceYear),
        founder: { "@id": PERSON_ID },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: AUTHOR.name,
        alternateName: IDENTITY_TITLE,
        url: SITE_URL,
        description:
          "Site d'Axel Hamilcaro, développeur fullstack et builder : ses builds open source, ses études de cas, son blog, ses services en freelance et un serveur MCP public.",
        inLanguage: "fr-FR",
        about: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
      buildMcpApiNode(),
    ],
  };
}

export const GLOBAL_JSON_LD = buildGlobalGraph(PERSON_NODE);

const GLOBAL_JSON_LD_WITHOUT_EMPLOYER = buildGlobalGraph(
  PERSON_NODE_WITHOUT_EMPLOYER,
);

export function JsonLd() {
  return <JsonLdScript data={GLOBAL_JSON_LD} />;
}

export function JsonLdWithoutEmployer() {
  return <JsonLdScript data={GLOBAL_JSON_LD_WITHOUT_EMPLOYER} />;
}
