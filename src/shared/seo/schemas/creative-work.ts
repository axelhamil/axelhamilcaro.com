import { authorPerson } from "./author";

export type CreativeWorkData = {
  name: string;
  description: string;
  url: string;
  dateCreated: string;
  keywords: string[];
  image?: string;
  applicationCategory?: string;
};

export function buildCreativeWorkSchema(data: CreativeWorkData) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.name,
    description: data.description,
    url: data.url,
    dateCreated: data.dateCreated,
    keywords: data.keywords.join(", "),
    ...(data.image && { image: data.image }),
    ...(data.applicationCategory && {
      applicationCategory: data.applicationCategory,
    }),
    creator: authorPerson(),
    inLanguage: "fr-FR",
  };
}
