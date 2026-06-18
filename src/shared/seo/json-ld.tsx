import {
  EXTERNAL_LINKS,
  PROFILE_IMAGE,
  SITE_URL,
} from "@/app/_config/site.constants";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Axel Hamilcaro",
    givenName: "Axel",
    familyName: "Hamilcaro",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: "Développeur Full-Stack TypeScript",
    description:
      "Développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Spécialisé TypeScript, Next.js, React, Node.js, architecture Clean / DDD et lead tech temps partiel. Lead technique 4 ans Civitime, 10+ projets livrés en autonomie depuis 2021.",
    email: "mailto:contact@axelhamilcaro.com",
    knowsLanguage: ["fr-FR", "en"],
    sameAs: [
      EXTERNAL_LINKS.linkedin,
      EXTERNAL_LINKS.github,
      EXTERNAL_LINKS.malt,
    ],
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
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
      "Multi-tenancy SaaS",
      "Event Sourcing",
      "CQRS",
      "Turborepo",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tours",
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
      name: "Remote — France",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Axel Hamilcaro - Développeur Full-Stack TypeScript",
    alternateName: "Axel Hamilcaro Portfolio",
    url: SITE_URL,
    description:
      "Portfolio d'Axel Hamilcaro, développeur freelance Next.js, React et Node.js basé en Touraine, intervient à 100% en remote sur la France. Expertise SaaS B2B multi-tenant, Clean Architecture et lead tech.",
    inLanguage: "fr-FR",
    copyrightYear: new Date().getFullYear(),
    about: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Axel Hamilcaro - Développeur Full-Stack Freelance",
    description:
      "Services de développement web Full-Stack freelance, basé en Touraine, intervient à 100% en remote sur la France : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, lead tech temps partiel, conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    priceRange: "€€€",
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
    ],
    serviceType: [
      "Développement Web Full-Stack",
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
          itemOffered: {
            "@type": "Service",
            name: "TMA — Tierce Maintenance Applicative",
            description:
              "Maintenance applicative web et mobile au forfait mensuel sans engagement : PRO 350€/mois (5h incluses) ou PREMIUM 800€/mois (10h, monitoring proactif)",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Bryan Kaneb",
          jobTitle: "Développeur web freelance",
        },
        datePublished: "2025-12-19",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "J'ai fait appel à Axel pour un projet React/Node et la collaboration s'est très bien passée. Axel a une vraie solidité technique, il structure bien son code, pose les bonnes questions en amont et livre un travail propre. Au-delà des compétences pures, c'est sa fiabilité qui m'a marqué, il respecte ses engagements et sait anticiper les problèmes avant qu'ils n'arrivent. La communication était simple et directe, ce qui facilite grandement le suivi du projet. C'est un profil sur lequel on peut s'appuyer. Je le recommande vivement pour vos projets de développements web ou mobile.",
        publisher: {
          "@type": "Organization",
          name: "Malt",
          url: "https://www.malt.fr",
        },
      },
    ],
  };

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
    </>
  );
}
