import type { Metadata } from "next";
import { AUTHOR, PERSON_ID, SITE_URL } from "@/app/_config/site.constants";
import { ArticleCard } from "@/src/features/blog/components/article-card";
import { getAllPosts } from "@/src/features/blog/lib/blog";
import { WEBSITE_ID } from "@/src/shared/seo/json-ld";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";

const RIBBON_ITEMS = [
  "Articles",
  "Guides",
  "Traductions",
  "Études de cas",
  "Prix d'une app web",
  "MVP SaaS",
  "Claude Code",
  "Fractional CTO",
  "Reprise de projet",
  "TMA",
  "Therac-25",
  "Sécurité logicielle",
  "Freelance",
] as const;

const BLOG_DESCRIPTION =
  "Articles, guides et traductions d'Axel Hamilcaro, développeur fullstack et builder : prix d'une application web ou d'un MVP SaaS, limites de Claude Code, TMA, lead tech fractional et la traduction du Therac-25.";

const BLOG_META_DESCRIPTION =
  "Je suis Axel Hamilcaro, développeur fullstack. Une app web sur mesure coûte 5 000 à 30 000 € HT, un MVP SaaS 15 000 à 35 000 €. Plus Claude Code et la TMA.";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog : prix d'app, MVP SaaS, Claude Code",
  description: BLOG_META_DESCRIPTION,
  path: "/blog",
  keywords: [
    "blog développeur",
    "prix application web",
    "MVP SaaS",
    "Claude Code",
    "Therac-25",
    "tierce maintenance applicative",
    AUTHOR.name,
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog d'Axel Hamilcaro",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
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
    <main className="blog-liste mx-auto max-w-6xl pb-16 sm:pb-24">
      <JsonLdScript data={collectionJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      <header className="blog-entete flex flex-col gap-6 py-12 sm:py-20">
        <p className="surtitre">Blog</p>
        <h1 className="blog-titre heading-display">
          Prix d'une app web, Claude Code, TMA : <br />
          <span className="marqueur">ce que je publie</span>
        </h1>
        <p className="blog-chapo">
          Je suis Axel Hamilcaro, développeur fullstack et builder. J'écris sur
          ce que coûte un projet web, sur Claude Code et la TMA, et j'ai traduit
          le chapitre de Nancy Leveson sur le Therac-25.
        </p>
      </header>

      <Ribbon items={RIBBON_ITEMS} hachures className="pleine-largeur" />

      <ul className="fiches grille-cartes mt-12 sm:mt-16">
        {posts.map((post, index) => (
          <li key={post.slug} className={index === 0 ? "col-span-full" : ""}>
            <ArticleCard
              post={post}
              featured={index === 0}
              stamp={
                index === 0
                  ? `N° ${String(posts.length).padStart(3, "0")}`
                  : undefined
              }
            />
          </li>
        ))}
      </ul>
    </main>
  );
}
