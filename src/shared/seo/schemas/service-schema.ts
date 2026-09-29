import { AREA_SERVED } from "./area-served";
import { authorPerson } from "./author";

export type ServiceSchemaData = {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  offers: { name: string; description: string }[];
};

export function buildServiceSchema(data: ServiceSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    url: data.url,
    serviceType: data.serviceType,
    provider: authorPerson(),
    areaServed: AREA_SERVED,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: data.name,
      itemListElement: data.offers.map((offer) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name,
          description: offer.description,
        },
      })),
    },
  };
}
