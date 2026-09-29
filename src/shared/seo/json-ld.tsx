import {
  MALT_APPRAISALS,
  MALT_RECOMMENDATIONS,
  MALT_REVIEWS_SOURCE,
  type MaltAppraisal,
} from "@/app/_config/malt-reviews";
import {
  AUTHOR,
  EXTERNAL_LINKS,
  JOB_TITLE,
  MCP,
  PROFILE_IMAGE,
  RATES,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/app/_config/site.constants";
import { AREA_SERVED } from "./schemas/area-served";
import { buildMcpApiSchema } from "./schemas/mcp-api";

const DAILY_RATE_EUR = String(RATES.dailyHtEur);
const TMA_PRO_MONTHLY_EUR = String(RATES.tma.proMonthlyEur);
const TMA_PREMIUM_MONTHLY_EUR = String(RATES.tma.premiumMonthlyEur);

const dailyRateSpecification = {
  "@type": "UnitPriceSpecification",
  price: DAILY_RATE_EUR,
  priceCurrency: "EUR",
  unitCode: "DAY",
  unitText: "jour",
  valueAddedTaxIncluded: false,
};

const tmaPriceSpecification = [
  {
    "@type": "UnitPriceSpecification",
    name: "PRO",
    price: TMA_PRO_MONTHLY_EUR,
    priceCurrency: "EUR",
    billingDuration: "P1M",
    unitText: "mois",
    valueAddedTaxIncluded: false,
  },
  {
    "@type": "UnitPriceSpecification",
    name: "PREMIUM",
    price: TMA_PREMIUM_MONTHLY_EUR,
    priceCurrency: "EUR",
    billingDuration: "P1M",
    unitText: "mois",
    valueAddedTaxIncluded: false,
  },
];

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR.name,
    givenName: "Axel",
    familyName: "Hamilcaro",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: JOB_TITLE,
    description: `Axel Hamilcaro est développeur fullstack (TypeScript, Next.js, React, Node.js), freelance basé à Tours, en Centre-Val de Loire, et intervenant à 100% en remote sur la France. Il conçoit des SaaS B2B multi-tenant et des applications web sur mesure en TypeScript, avec une architecture Clean / DDD. 4 ans chez Civitime, de développeur à lead technique, 10+ projets livrés en freelance depuis 2024. TJM ${DAILY_RATE_EUR}€ HT/jour.`,
    email: "mailto:contact@axelhamilcaro.com",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "MCP",
      value: MCP.url,
    },
    subjectOf: { "@id": `${SITE_URL}/#mcp` },
    knowsLanguage: ["fr-FR", "en"],
    sameAs: [
      EXTERNAL_LINKS.linkedin,
      EXTERNAL_LINKS.github,
      EXTERNAL_LINKS.malt,
      EXTERNAL_LINKS.googleBusiness,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.tiktok,
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "SaaS B2B",
      "Multi-tenancy SaaS",
      "JavaScript",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST API",
      "Clean Architecture",
      "Domain-Driven Design",
      "SaaS Development",
      "Web Development",
      "Vercel",
      "Docker",
      "Capacitor",
      "Stripe",
      "NestJS",
      "Fastify",
      "RAG",
      "Vercel AI SDK",
      "Event Sourcing",
      "CQRS",
      "Turborepo",
    ],
    worksFor: { "@id": `${SITE_URL}/#service` },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tours",
      addressRegion: "Centre-Val de Loire",
      addressCountry: "FR",
    },
    nationality: {
      "@type": "Country",
      name: "France",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Wild Code School",
      url: "https://www.wildcodeschool.com/",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Concepteur Développeur d'applications Web & Mobile (Bac+3/4)",
        credentialCategory: "degree",
      },
    ],
    workLocation: {
      "@type": "Place",
      name: "Remote, France",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${AUTHOR.name}, ${JOB_TITLE}`,
    alternateName: "Axel Hamilcaro Portfolio",
    url: SITE_URL,
    description:
      "Portfolio d'Axel Hamilcaro, développeur fullstack TypeScript, Next.js, React et Node.js, basé à Tours, en Centre-Val de Loire, 100% remote France. Expertise SaaS B2B multi-tenant, Clean Architecture et lead tech.",
    inLanguage: "fr-FR",
    copyrightYear: new Date().getFullYear(),
    about: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const MALT_ORGANIZATION = {
    "@type": "Organization",
    "@id": "https://www.malt.fr/#organization",
    name: "Malt",
    url: "https://www.malt.fr",
  };

  const reviewAuthor = (reviewer: MaltAppraisal["reviewer"]) => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#${reviewer.id}`,
    name: reviewer.name,
    jobTitle: reviewer.jobTitle,
    worksFor: { "@type": "Organization", name: reviewer.company },
  });

  const serviceReviews = [
    ...MALT_APPRAISALS.map((appraisal) => ({
      "@type": "Review",
      author: reviewAuthor(appraisal.reviewer),
      datePublished: appraisal.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(appraisal.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: appraisal.body,
      url: MALT_REVIEWS_SOURCE,
      publisher: MALT_ORGANIZATION,
    })),
    ...MALT_RECOMMENDATIONS.map((recommendation) => ({
      "@type": "Review",
      author: reviewAuthor(recommendation.reviewer),
      datePublished: recommendation.date,
      reviewBody: recommendation.body,
      url: MALT_REVIEWS_SOURCE,
      publisher: MALT_ORGANIZATION,
    })),
  ];

  const averageRating =
    MALT_APPRAISALS.reduce((sum, appraisal) => sum + appraisal.rating, 0) /
    MALT_APPRAISALS.length;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: `${AUTHOR.name}, ${JOB_TITLE}`,
    legalName: "HAMILCARO AXEL",
    description:
      "Services de développement web fullstack freelance, basé à Tours, en Centre-Val de Loire, intervient à 100% en remote sur la France : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, lead tech temps partiel, conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    priceRange: `${DAILY_RATE_EUR} EUR HT/jour, TMA de ${TMA_PRO_MONTHLY_EUR} à ${TMA_PREMIUM_MONTHLY_EUR} EUR HT/mois`,
    currenciesAccepted: "EUR",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: "93929141500015",
    },
    provider: { "@id": `${SITE_URL}/#person` },
    sameAs: [EXTERNAL_LINKS.malt],
    areaServed: AREA_SERVED,
    serviceType: [
      "Développement Web Fullstack",
      "Création d'Applications Web",
      "Développement SaaS",
      "Développement d'API",
      "Conseil Technique",
      "Architecture Logicielle",
      "Refonte de Site Web",
      "Maintenance et Support",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de développement web",
      itemListElement: [
        {
          "@type": "Offer",
          url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
          priceSpecification: dailyRateSpecification,
          itemOffered: {
            "@type": "Service",
            name: "Développement d'Application Web",
            description:
              "Création d'applications web sur mesure avec React, Next.js et TypeScript",
          },
        },
        {
          "@type": "Offer",
          url: `${SITE_URL}/services/developpement-saas`,
          priceSpecification: dailyRateSpecification,
          itemOffered: {
            "@type": "Service",
            name: "Développement SaaS",
            description:
              "Conception et développement de produits SaaS scalables",
          },
        },
        {
          "@type": "Offer",
          url: `${SITE_URL}/services/lead-tech-fractional`,
          priceSpecification: dailyRateSpecification,
          itemOffered: {
            "@type": "Service",
            name: "Conseil et Architecture",
            description:
              "Accompagnement technique et conception d'architecture logicielle, lead tech temps partiel",
          },
        },
        {
          "@type": "Offer",
          url: `${SITE_URL}/tma`,
          priceSpecification: tmaPriceSpecification,
          itemOffered: {
            "@type": "Service",
            name: "TMA (tierce maintenance applicative)",
            description: `Maintenance applicative web et mobile au forfait mensuel sans engagement : PRO ${TMA_PRO_MONTHLY_EUR}€/mois (5h incluses) ou PREMIUM ${TMA_PREMIUM_MONTHLY_EUR}€/mois (10h, monitoring proactif)`,
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      ratingCount: MALT_APPRAISALS.length,
      reviewCount: MALT_APPRAISALS.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: serviceReviews,
  };

  const mcpApiSchema = buildMcpApiSchema();

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(mcpApiSchema),
        }}
      />
    </>
  );
}
