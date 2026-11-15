import { AUTHOR, PERSON_ID, SITE_URL } from "@/app/_config/site.constants";

export function authorPerson() {
  return {
    "@type": "Person" as const,
    "@id": PERSON_ID,
    name: AUTHOR.name,
    url: SITE_URL,
  };
}
