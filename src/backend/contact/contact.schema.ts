import { z } from "zod";
import { BUDGET_RANGES, PROJECT_TYPES } from "./contact.config";

const projectTypeValues = PROJECT_TYPES.map((t) => t.value) as [
  string,
  ...string[],
];
const budgetValues = BUDGET_RANGES.map((b) => b.value) as [string, ...string[]];

export const contactSubmitSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.email("Email invalide"),
  message: z
    .string()
    .trim()
    .min(
      80,
      "Décris ton projet en au moins 80 caractères (contexte, stack, besoin)",
    )
    .max(5000),
  projectType: z.enum(projectTypeValues),
  budget: z.enum(budgetValues),
  sourcePath: z.string().trim().max(200).optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactSubmitInput = z.infer<typeof contactSubmitSchema>;
