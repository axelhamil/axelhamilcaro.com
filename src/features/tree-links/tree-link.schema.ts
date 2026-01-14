import { z } from "zod";

export const createTreeLinkSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  url: z.string().url("URL invalide"),
  description: z.string().optional(),
  icon: z.string().default("link"),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().optional(),
});

export const updateTreeLinkSchema = createTreeLinkSchema.partial();

export const reorderTreeLinksSchema = z.object({
  orderedIds: z.array(z.string().uuid()),
});
