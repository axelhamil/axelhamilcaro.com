import {
  EXTERNAL_LINKS,
  PROFILE_IMAGE,
  SITE_URL,
} from "@/app/_config/site.constants";

const testimonials = [
  {
    name: "Léo",
    role: "CTO @ ScormPilot",
    content:
      "Intervention rapide et qualitative sur notre stack Next.js. Axel a restructuré notre architecture frontend et ajouté des fonctionnalités clés sans casser l'existant. Pro et autonome.",
    rating: 5,
  },
  {
    name: "Anthony M.",
    role: "Product Manager @ Civitime",
    content:
      "Axel a développé plusieurs modules critiques de notre plateforme e-learning. Son code est propre, bien testé, et il pose les bonnes questions. Un renfort technique solide.",
    rating: 5,
  },
  {
    name: "Aboubacar",
    role: "Fondateur @ MentorTroc",
    content:
      "Mission réussie sur notre app Next.js. Axel a livré dans les temps, avec un code maintenable et une vraie attention aux détails UX. Je recommande.",
    rating: 5,
  },
  {
    name: "Sophie L.",
    role: "CEO @ Startup EdTech",
    content:
      "Excellent travail sur notre MVP. Axel a su comprendre nos besoins métier et proposer des solutions techniques pragmatiques. Le produit est sorti en 6 semaines.",
    rating: 5,
  },
  {
    name: "Thomas R.",
    role: "Développeur @ Agence Web",
    content:
      "J'ai suivi le mentorat d'Axel pendant 3 mois. Ses explications sur React et Clean Architecture m'ont fait progresser très vite. Pédagogue et patient.",
    rating: 5,
  },
];

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
      "Développeur Full-Stack freelance spécialisé TypeScript, Next.js, React et Node.js. Je conçois des applications web et SaaS robustes, scalables et orientées produit pour startups et entreprises en France.",
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
    url: SITE_URL,
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

  const averageRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "Axel Hamilcaro - Développeur Full-Stack Freelance",
    description:
      "Services de développement web Full-Stack freelance à Paris : création d'applications web, SaaS, APIs REST/GraphQL, architecture technique, conseil et accompagnement. Expertise TypeScript, Next.js, React, Node.js, PostgreSQL.",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toString(),
      reviewCount: testimonials.length.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
        jobTitle: testimonial.role,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: testimonial.content,
    })),
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
