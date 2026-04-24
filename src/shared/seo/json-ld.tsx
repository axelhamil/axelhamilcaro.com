import {
  EXTERNAL_LINKS,
  PROFILE_IMAGE,
  SITE_URL,
} from "@/app/_config/site.constants";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Axel Hamilcaro",
    givenName: "Axel",
    familyName: "Hamilcaro",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    jobTitle: "Développeur Full-Stack TypeScript",
    description:
      "Développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Spécialisé TypeScript, Next.js, React, Node.js et intégration IA. Lead technique 4 ans Civitime, 10+ projets livrés en autonomie depuis 2021.",
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
      "React Native",
      "Expo",
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
    name: "Axel Hamilcaro - Développeur Full-Stack TypeScript",
    alternateName: "Axel Hamilcaro Portfolio",
    url: SITE_URL,
    description:
      "Portfolio d'Axel Hamilcaro, développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Expertise TypeScript, Next.js, React, Node.js pour applications web et SaaS.",
    author: {
      "@type": "Person",
      name: "Axel Hamilcaro",
    },
    inLanguage: "fr-FR",
    copyrightYear: new Date().getFullYear(),
    creator: {
      "@type": "Person",
      name: "Axel Hamilcaro",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Axel Hamilcaro - Développeur Full-Stack Freelance",
    description:
      "Services de développement web Full-Stack freelance, basé en Touraine, intervient à 100% en remote sur la France : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, intégration IA (RAG, agents), conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    priceRange: "€€€",
    provider: {
      "@type": "Person",
      name: "Axel Hamilcaro",
    },
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
          itemOffered: {
            "@type": "Service",
            name: "Développement d'Application Web",
            description:
              "Création d'applications web sur mesure avec React, Next.js et TypeScript",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement SaaS",
            description:
              "Conception et développement de produits SaaS scalables",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Conseil et Architecture",
            description:
              "Accompagnement technique et conception d'architecture logicielle",
          },
        },
      ],
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
