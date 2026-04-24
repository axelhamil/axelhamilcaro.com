export type BlogPostingData = {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
};

export function buildBlogPostingSchema(data: BlogPostingData) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.headline,
    description: data.description,
    url: data.url,
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    author: {
      "@type": "Person",
      name: data.author,
      url: "https://axelhamilcaro.com",
    },
    publisher: {
      "@type": "Person",
      name: "Axel Hamilcaro",
      url: "https://axelhamilcaro.com",
    },
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
