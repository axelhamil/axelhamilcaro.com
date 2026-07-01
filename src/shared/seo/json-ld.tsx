import {
  AUTHOR,
  EXTERNAL_LINKS,
  PROFILE_IMAGE,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/app/_config/site.constants";

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
    jobTitle: "Développeur Web Fullstack | Next.js | React | Node",
    description:
      "Axel Hamilcaro est développeur web fullstack (Next.js, React, Node), freelance basé en Touraine et intervenant à 100% en remote sur la France. Il conçoit des SaaS B2B multi-tenant et des applications web sur mesure en TypeScript, avec une architecture Clean / DDD. Lead technique 4 ans chez Civitime (de développeur à lead), 10+ projets livrés en freelance depuis 2024. TJM 500€ HT/jour.",
    email: "mailto:contact@axelhamilcaro.com",
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
      name: "Remote, France",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Axel Hamilcaro, Développeur Web Fullstack | Next.js | React | Node",
    alternateName: "Axel Hamilcaro Portfolio",
    url: SITE_URL,
    description:
      "Portfolio d'Axel Hamilcaro, développeur web fullstack Next.js, React et Node, basé en Touraine, 100% remote France. Expertise SaaS B2B multi-tenant, Clean Architecture et lead tech.",
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
    name: "Axel Hamilcaro, Développeur Web Fullstack | Next.js | React | Node",
    description:
      "Services de développement web fullstack freelance, basé en Touraine, intervient à 100% en remote sur la France : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, lead tech temps partiel, conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
    url: SITE_URL,
    image: PROFILE_IMAGE,
    priceRange: "€€€",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: "93929141500015",
    },
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
    ],
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
            name: "TMA (tierce maintenance applicative)",
            description:
              "Maintenance applicative web et mobile au forfait mensuel sans engagement : PRO 350€/mois (5h incluses) ou PREMIUM 800€/mois (10h, monitoring proactif)",
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
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Raphael Le Cras",
          jobTitle: "Fondateur d'OpenUp",
        },
        datePublished: "2026-06-30",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "Axel est le développeur derrière OpenUp depuis le lancement, et travailler avec lui est un vrai plus. Sur ce projet (désactivation automatique des liens lors d'un downgrade de plan et système de modération/bannissement de comptes), le travail a été propre et livré dans les délais. Il a également pris le temps de mettre à jour l'application et de corriger un bug d'une fonctionnalité. Je lui confie la partie technique de mon produit en confiance et je continue à travailler avec lui. Je ne peux que le recommander de nouveau.",
        publisher: {
          "@type": "Organization",
          name: "Malt",
          url: "https://www.malt.fr",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Raphael Le Cras",
          jobTitle: "Fondateur d'OpenUp",
        },
        datePublished: "2026-07-01",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
        reviewBody:
          "J'ai eu besoin d'un changement urgent d'une fonctionnalité sur le plan gratuit de mon app, et Axel l'a modifié dans l'après-midi même de ma demande. Très réactif et la demande a été réalisée correctement.",
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
