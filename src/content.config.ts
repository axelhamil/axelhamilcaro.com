import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    role: z.string(),
    period: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    order: z.number().default(99),
    logo: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    url: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, portfolio };
