import { AUTHOR, SITE_URL } from "@/app/_config/site.constants";

export const AUTHOR_NAME = AUTHOR.name;

export function authorPerson() {
  return {
    "@type": "Person" as const,
    name: AUTHOR.name,
    url: SITE_URL,
  };
}
