import { z } from "zod";

export const createFormSchema = z.object({
  slug: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullish(),
  backgroundType: z.enum(["color", "gradient", "image"]).default("color"),
  backgroundColor: z.string().nullish(),
  backgroundGradient: z.string().nullish(),
  backgroundImage: z.url().nullish(),
  cardImage: z.url().nullish(),
  badgeText: z.string().nullish(),
  badgeColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .nullish(),
  badgeStyle: z.enum(["filled", "outline"]).nullish(),
  buttonText: z.string().default("Envoyer"),
  buttonSubtext: z.string().nullish(),
  emailSubject: z.string().nullish(),
  emailBody: z.string().nullish(),
  emailCtaText: z.string().nullish(),
  emailCtaUrl: z.url().nullish(),
  isActive: z.boolean().default(true),
});

export const updateFormSchema = createFormSchema.partial();

export type CreateFormInput = z.infer<typeof createFormSchema>;
export type UpdateFormInput = z.infer<typeof updateFormSchema>;
