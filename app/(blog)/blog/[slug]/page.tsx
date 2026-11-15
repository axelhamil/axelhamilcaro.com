import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import { AUTHOR, SITE_URL } from "@/app/_config/site.constants";
import { useMDXComponents } from "@/mdx-components";
import { ArticleNavigation } from "@/src/features/blog/components/article-navigation";
import { BlogAuthorBio } from "@/src/features/blog/components/blog-author-bio";
import { BlogByline } from "@/src/features/blog/components/blog-byline";
import { BlogPostCta } from "@/src/features/blog/components/blog-post-cta";
import { MobileTableOfContents } from "@/src/features/blog/components/mobile-table-of-contents";
import { TableOfContents } from "@/src/features/blog/components/table-of-contents";
import {
  extractHeadings,
  getAllPosts,
  getPostBySlug,
} from "@/src/features/blog/lib/blog";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildBlogPostingSchema } from "@/src/shared/seo/schemas/blog-posting";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";
import {
  articleTransitionName,
  SharedElement,
} from "@/src/shared/ui/navigation/shared-element";
import { Button } from "@/src/shared/ui/portfolio/button";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

const BRAND_SUFFIX = ` · ${AUTHOR.name}`;
const TITLE_MAX = 60;

const articleTitle = (title: string) =>
  title.length + BRAND_SUFFIX.length <= TITLE_MAX ? title : { absolute: title };

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;
  const image = {
    url: post.image ?? `/blog/${slug}/og`,
    width: 1200,
    height: 630,
    alt: post.title,
  };

  return {
    title: articleTitle(post.seoTitle ?? post.title),
    description: post.excerpt,
    keywords: [...post.tags, AUTHOR.name, "blog", post.category],
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: AUTHOR.name,
      locale: "fr_FR",
      type: "article",
      publishedTime: post.date,
      authors: [AUTHOR.name],
      modifiedTime: post.dateModified ?? post.date,
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const mdxComponents = useMDXComponents();

  const modifiedDate =
    post.dateModified && post.dateModified !== post.date
      ? post.dateModified
      : null;

  const wordCount = post.content.trim().split(/\s+/).length;

  const isTranslation = Boolean(post.originalAuthor);

  const blogPostingJsonLd = buildBlogPostingSchema({
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    image: post.image ?? `${SITE_URL}/blog/${slug}/og`,
    author: post.originalAuthor ?? AUTHOR.name,
    authorUrl: post.originalAuthorUrl,
    translator: isTranslation ? AUTHOR.name : undefined,
    keywords: post.tags,
    articleSection: post.category,
    wordCount,
  });

  const breadcrumbJsonLd = buildBreadcrumbListSchema([
    { name: "Accueil", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ]);

  const faqJsonLd =
    post.faq && post.faq.length > 0 ? buildFaqPageSchema(post.faq) : null;

  return (
    <main>
      <JsonLdScript data={blogPostingJsonLd} />
      <JsonLdScript data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLdScript data={faqJsonLd} />}
      <header className="article-cadre article-entete flex flex-col gap-6 py-10 sm:py-16">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <p className="etiquette etiquette-sm etiquette-fond-jaune label-mono">
            {post.category}
          </p>
          <p className="meta-mono">
            <time dateTime={post.date}>{formatLongDate(post.date)}</time>
            <span>{post.readingTime}</span>
            {modifiedDate && (
              <span>
                Mis à jour le{" "}
                <time dateTime={modifiedDate}>
                  {formatLongDate(modifiedDate)}
                </time>
              </span>
            )}
          </p>
        </div>

        <SharedElement name={articleTransitionName(post.slug)}>
          <h1 className="article-titre heading-display">{post.title}</h1>
        </SharedElement>

        <p className="article-chapo">{post.subtitle}</p>

        <BlogByline
          variant="header"
          originalAuthor={post.originalAuthor}
          originalAuthorUrl={post.originalAuthorUrl}
        />

        <div className="flex flex-wrap items-center gap-4">
          {post.pdfUrl && (
            <Button href={post.pdfUrl} variant="secondary" size="sm">
              Document original (PDF) &rarr;
            </Button>
          )}
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="tag-mono">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className="hachures pleine-largeur" aria-hidden="true" />

      <div className="article-cadre article-grille py-10 sm:py-14">
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>

        <div className="flex flex-col gap-12 sm:gap-16 min-w-0">
          <MobileTableOfContents headings={headings} />

          <article className="article-corps">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  remarkRehypeOptions: {
                    footnoteLabel: "Notes",
                    footnoteBackLabel: (referenceIndex) =>
                      `↩ Retour à la référence ${referenceIndex + 1}`,
                  },
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeUnwrapImages,
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          light: "github-light-high-contrast",
                          dark: "github-dark",
                        },
                        keepBackground: false,
                        defaultLang: { block: "plaintext" },
                      },
                    ],
                  ],
                },
              }}
            />
          </article>

          <BlogAuthorBio
            label={isTranslation ? "À propos du traducteur" : undefined}
          />

          <BlogPostCta />

          <ArticleNavigation currentSlug={slug} />

          <Button href="/blog" variant="ghost" size="sm" className="self-start">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Tous les articles du blog
          </Button>
        </div>
      </div>
    </main>
  );
}
