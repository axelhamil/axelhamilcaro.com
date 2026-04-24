import { BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { ArticleCard } from "@/src/features/blog/components/article-card";
import { getAllPosts } from "@/src/features/blog/lib/blog";
import { RevealContainer, RevealItem } from "@/src/shared/ui/effects/reveal";
import { Heading1 } from "@/src/shared/ui/typography/heading1";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const BLOG_DESCRIPTION =
  "Articles, traductions et réflexions sur le développement logiciel, la sécurité et les études de cas techniques par Axel Hamilcaro.";

export const metadata: Metadata = {
  title: "Blog — Axel Hamilcaro",
  description: BLOG_DESCRIPTION,
  keywords: [
    "blog développeur",
    "sécurité logicielle",
    "développement web",
    "TypeScript",
    "Next.js",
    "études de cas",
    "Axel Hamilcaro",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — Axel Hamilcaro",
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    siteName: "Axel Hamilcaro",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Axel Hamilcaro",
    description: BLOG_DESCRIPTION,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog — Axel Hamilcaro",
    description: BLOG_DESCRIPTION,
    url: `${SITE_URL}/blog`,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="mb-8 sm:mb-12">
        <span className="badge mb-4 inline-flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Blog
        </span>
        <Heading1 size="xl" style={{ fontFamily: "var(--font-display)" }}>
          Blog
        </Heading1>
        <Paragraph variant="secondary" size="lg" className="mt-3">
          Articles, traductions et réflexions sur le développement logiciel.
        </Paragraph>
      </header>

      <RevealContainer staggerDelay={0.1} className="flex flex-col gap-6">
        {posts.map((post, index) => (
          <RevealItem key={post.slug}>
            <ArticleCard post={post} featured={index === 0} />
          </RevealItem>
        ))}
      </RevealContainer>
    </main>
  );
}
