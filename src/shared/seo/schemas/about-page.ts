import { authorPerson } from "./author";

export type AboutPageData = {
  url: string;
  name: string;
  description: string;
};

export function buildAboutPageSchema(data: AboutPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: data.url,
    name: data.name,
    description: data.description,
    mainEntity: authorPerson(),
    inLanguage: "fr-FR",
  };
}
