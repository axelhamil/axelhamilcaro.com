export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Axel Hamilcaro",
    givenName: "Axel",
    familyName: "Hamilcaro",
    url: "https://axelhamilcaro.com",
    image: "https://axelhamilcaro.com/profil_pp.jpeg",
    jobTitle: "Développeur Full-Stack TypeScript",
    description:
      "Développeur Full-Stack freelance spécialisé TypeScript, Next.js, React et Node.js. Je conçois des applications web et SaaS robustes, scalables et orientées produit pour startups et entreprises en France.",
    sameAs: [
      "https://www.linkedin.com/in/axelhamilcaro/",
      "https://github.com/axelhamil",
      "https://www.malt.fr/profile/axelhamilcaro",
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
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    nationality: {
      "@type": "Country",
      name: "France",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Axel Hamilcaro - Développeur Full-Stack TypeScript",
    alternateName: "Axel Hamilcaro Portfolio",
    url: "https://axelhamilcaro.com",
    description:
      "Portfolio d'Axel Hamilcaro, développeur Full-Stack freelance basé à Paris. Expertise TypeScript, Next.js, React, Node.js pour applications web et SaaS.",
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
    name: "Axel Hamilcaro - Développeur Full-Stack Freelance",
    description:
      "Services de développement web Full-Stack freelance à Paris : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
    url: "https://axelhamilcaro.com",
    image: "https://axelhamilcaro.com/profil_pp.jpeg",
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
      {
        "@type": "City",
        name: "Paris",
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
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://axelhamilcaro.com",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
