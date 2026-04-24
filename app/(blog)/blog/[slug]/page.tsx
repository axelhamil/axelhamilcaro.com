import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import { SITE_URL } from "@/app/_config/site.constants";
import { Badge } from "@/components/ui/badge";
import { useMDXComponents } from "@/mdx-components";
import { ArticleNavigation } from "@/src/features/blog/components/article-navigation";
import { MobileTableOfContents } from "@/src/features/blog/components/mobile-table-of-contents";
import { TableOfContents } from "@/src/features/blog/components/table-of-contents";
import {
  extractHeadings,
  getAllPosts,
  getPostBySlug,
} from "@/src/features/blog/lib/blog";
import { buildBlogPostingSchema } from "@/src/shared/seo/schemas/blog-posting";
import { Button } from "@/src/shared/ui/portfolio/button";
import { Heading1 } from "@/src/shared/ui/typography/heading1";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} | Blog | Axel Hamilcaro`,
    description: post.excerpt,
    keywords: [...post.tags, "Axel Hamilcaro", "blog", post.category],
    authors: [{ name: "Axel Hamilcaro", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Axel Hamilcaro",
      locale: "fr_FR",
      type: "article",
      publishedTime: post.date,
      authors: ["Axel Hamilcaro"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const mdxComponents = useMDXComponents();

  const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = post.content.trim().split(/\s+/).length;

  const blogPostingJsonLd = buildBlogPostingSchema({
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: post.date,
    author: "Axel Hamilcaro",
    keywords: post.tags,
    articleSection: post.category,
    wordCount,
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-primary-background">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
            <span className="text-sm font-medium text-accent uppercase tracking-widest">
              {post.category}
            </span>
            <span className="text-border">|</span>
            <time dateTime={post.date} className="text-sm text-muted">
              {formattedDate}
            </time>
            <span className="text-border">|</span>
            <span className="text-sm text-muted">{post.readingTime}</span>
          </div>

          <Heading1 size="xl" style={{ fontFamily: "var(--font-display)" }}>
            {post.title}
          </Heading1>

          <Paragraph variant="secondary" size="lg" className="mt-2">
            {post.subtitle}
          </Paragraph>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {post.pdfUrl && (
              <Button href={post.pdfUrl} variant="secondary" size="sm">
                Document original (PDF) &rarr;
              </Button>
            )}
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-4">
        <MobileTableOfContents headings={headings} />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-0 pb-8 lg:pt-0 lg:pb-16 lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>

        <div>
          <article className="prose prose-zinc prose-sm sm:prose-base max-w-none first:prose-headings:mt-0 prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:border prose-img:border-border prose-blockquote:border-l-accent prose-blockquote:text-secondary prose-table:text-sm prose-th:text-left prose-th:font-semibold">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    rehypeUnwrapImages,
                    [
                      rehypePrettyCode,
                      {
                        theme: "github-dark",
                        keepBackground: true,
                      },
                    ],
                  ],
                },
              }}
            />
          </article>

          <ArticleNavigation currentSlug={slug} />
        </div>
      </div>
    </main>
  );
}
