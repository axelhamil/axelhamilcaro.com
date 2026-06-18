import { AUTHOR, SITE_URL } from "@/app/_config/site.constants";

export type BlogPostingData = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
  translator?: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
};

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_OWNER = AUTHOR.name;

function personRef(name: string, url?: string) {
  if (name === SITE_OWNER) {
    return { "@type": "Person", "@id": PERSON_ID, name, url: SITE_URL };
  }
  return { "@type": "Person", name, ...(url && { url }) };
}

export function buildBlogPostingSchema(data: BlogPostingData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.headline,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    author: personRef(data.author, data.authorUrl),
    ...(data.translator && { translator: personRef(data.translator) }),
    publisher: personRef(SITE_OWNER),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data.url,
    },
    ...(data.image && { image: data.image }),
    ...(data.keywords && { keywords: data.keywords.join(", ") }),
    ...(data.articleSection && { articleSection: data.articleSection }),
    ...(data.wordCount && { wordCount: data.wordCount }),
    inLanguage: "fr-FR",
  };
}
