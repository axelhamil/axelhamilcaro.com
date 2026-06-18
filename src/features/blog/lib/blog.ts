import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const blogPostFrontmatterSchema = z.object({
  title: z.string().min(1).max(65, "titre trop long pour le SEO (max 65)"),
  subtitle: z.string().min(1).max(200),
  date: z.string().regex(ISO_DATE, "date attendue au format AAAA-MM-JJ"),
  dateModified: z
    .string()
    .regex(ISO_DATE, "dateModified attendue au format AAAA-MM-JJ")
    .optional(),
  excerpt: z
    .string()
    .min(110, "meta description trop courte pour le SEO (min 110)")
    .max(160, "meta description trop longue pour le SEO (max 160)"),
  tags: z.array(z.string().min(1)).min(1, "au moins un tag est requis"),
  category: z.string().min(1),
  pdfUrl: z.url().optional(),
  image: z.string().min(1).optional(),
  faq: z.array(faqItemSchema).min(1).optional(),
  originalAuthor: z.string().min(1).optional(),
  originalAuthorUrl: z.url().optional(),
});

type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

function parseFrontmatter(source: string, data: unknown): BlogPostFrontmatter {
  const result = blogPostFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "(racine)"}: ${issue.message}`)
      .join(" · ");
    throw new Error(`Frontmatter invalide dans ${source} → ${issues}`);
  }
  return result.data;
}

interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  readingTime: string;
}

interface BlogPostWithContent extends BlogPost {
  content: string;
}

function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = parseFrontmatter(filename, data);
      const stats = readingTime(content);

      return {
        ...frontmatter,
        slug,
        readingTime: stats.text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function getPostBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = parseFrontmatter(`${slug}.mdx`, data);
  const stats = readingTime(content);

  return {
    ...frontmatter,
    slug,
    readingTime: stats.text,
    content,
  };
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = content.split("\n");
  const headings: Heading[] = [];

  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2],
        id: slugger.slug(match[2]),
      });
    }
  }

  return headings;
}

function getAdjacentPosts(currentSlug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === currentSlug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export type { BlogPost, BlogPostWithContent, Heading };
export { getAllPosts, getPostBySlug, extractHeadings, getAdjacentPosts };
