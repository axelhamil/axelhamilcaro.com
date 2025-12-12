export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Axel Hamilcaro",
    url: "https://axelhamilcaro.com",
    jobTitle: "Développeur Full-Stack",
    description:
      "Développeur Full-Stack TypeScript spécialisé Next.js, React et Node.js. Conception d'applications web et SaaS robustes et orientées produit.",
    sameAs: [
      "https://www.linkedin.com/in/axelhamilcaro/",
      "https://github.com/axelhamil",
    ],
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Clean Architecture",
      "Domain-Driven Design",
      "SaaS Development",
      "Web Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Axel Hamilcaro",
    url: "https://axelhamilcaro.com",
    description:
      "Site personnel d'Axel Hamilcaro, développeur Full-Stack TypeScript spécialisé dans le développement d'applications web et SaaS.",
    author: {
      "@type": "Person",
      name: "Axel Hamilcaro",
    },
    inLanguage: "fr-FR",
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Axel Hamilcaro - Développement Web & SaaS",
    description:
      "Services de développement web Full-Stack : applications web, SaaS, APIs, architecture technique. Expertise TypeScript, Next.js, React, Node.js.",
    url: "https://axelhamilcaro.com",
    provider: {
      "@type": "Person",
      name: "Axel Hamilcaro",
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: [
      "Développement Web",
      "Développement d'Applications",
      "Développement SaaS",
      "Conseil Technique",
      "Architecture Logicielle",
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
    </>
  );
}
