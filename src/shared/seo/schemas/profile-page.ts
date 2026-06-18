import { authorPerson } from "./author";

export type ProfilePageData = {
  url: string;
  name: string;
  description: string;
};

export function buildProfilePageSchema(data: ProfilePageData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${data.url}/#profilepage`,
    url: data.url,
    name: data.name,
    description: data.description,
    mainEntity: authorPerson(),
    inLanguage: "fr-FR",
  };
}
