import {
  AUTHOR,
  EXTERNAL_LINKS,
  LEGAL_ENTITY,
  PERSON_ID,
  PROFILE_IMAGE,
  RATES,
  SITE_URL,
} from "@/app/_config/site.constants";
import { AREA_SERVED } from "./area-served";

const SERVICE_ID = `${SITE_URL}/#service`;
const SERVICES_URL = `${SITE_URL}/services`;

export const DAILY_RATE_SPECIFICATION = {
  "@type": "UnitPriceSpecification",
  price: String(RATES.dailyHtEur),
  priceCurrency: "EUR",
  unitCode: "DAY",
  unitText: "jour",
  valueAddedTaxIncluded: false,
};

const tmaRates = [
  {
    "@type": "UnitPriceSpecification",
    name: "PRO",
    price: String(RATES.tma.proMonthlyEur),
    priceCurrency: "EUR",
    billingDuration: "P1M",
    unitText: "mois",
    valueAddedTaxIncluded: false,
  },
  {
    "@type": "UnitPriceSpecification",
    name: "PREMIUM",
    price: String(RATES.tma.premiumMonthlyEur),
    priceCurrency: "EUR",
    billingDuration: "P1M",
    unitText: "mois",
    valueAddedTaxIncluded: false,
  },
];

const OFFERS = [
  {
    path: "/services/creation-application-web",
    name: "Création d'application web de A à Z",
    description:
      "Création d'une application web ou mobile sur mesure, du cadrage à la mise en ligne, par un seul développeur.",
    price: DAILY_RATE_SPECIFICATION,
  },
  {
    path: "/services/developpeur-nextjs-freelance",
    name: "Développement web sur mesure",
    description:
      "Applications web sur mesure en Next.js, React et TypeScript : architecture, MVP, refonte.",
    price: DAILY_RATE_SPECIFICATION,
  },
  {
    path: "/services/developpement-saas",
    name: "Développement SaaS",
    description:
      "Conception et développement d'un SaaS B2B multi-tenant, de zéro jusqu'en production.",
    price: DAILY_RATE_SPECIFICATION,
  },
  {
    path: "/services/lead-tech-fractional",
    name: "Lead tech fractional",
    description:
      "Lead technique à temps partiel, 1 à 3 jours par semaine, sur 3 à 18 mois.",
    price: DAILY_RATE_SPECIFICATION,
  },
  {
    path: "/tma",
    name: "TMA (tierce maintenance applicative)",
    description: `Maintenance applicative web et mobile au forfait mensuel sans engagement : PRO ${RATES.tma.proMonthlyEur} € par mois (5 h) ou PREMIUM ${RATES.tma.premiumMonthlyEur} € par mois (10 h, monitoring proactif).`,
    price: tmaRates,
  },
] as const;

export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: `${AUTHOR.name}, développeur fullstack freelance`,
    legalName: LEGAL_ENTITY.legalName,
    description:
      "Missions freelance d'Axel Hamilcaro, développeur fullstack basé à Tours et en remote sur la France : création d'application web, développement sur mesure, SaaS B2B, lead tech à temps partiel et TMA au mois.",
    url: SERVICES_URL,
    image: PROFILE_IMAGE,
    priceRange: `${RATES.dailyHtEur} € HT par jour, TMA de ${RATES.tma.proMonthlyEur} à ${RATES.tma.premiumMonthlyEur} € HT par mois`,
    currenciesAccepted: "EUR",
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: LEGAL_ENTITY.siret.replaceAll(" ", ""),
    },
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    sameAs: [EXTERNAL_LINKS.malt],
    areaServed: AREA_SERVED,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tours",
      addressRegion: "Centre-Val de Loire",
      addressCountry: "FR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Missions freelance",
      itemListElement: OFFERS.map((offer) => ({
        "@type": "Offer",
        url: `${SITE_URL}${offer.path}`,
        priceSpecification: offer.price,
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
          provider: { "@id": SERVICE_ID },
        },
      })),
    },
  };
}
