import { z } from "zod";
import {
  BUDGET_RANGES,
  MESSAGE_MAX,
  MESSAGE_MIN,
  PROJECT_TYPES,
} from "./contact.config";

const projectTypeValues = PROJECT_TYPES.map((t) => t.value) as [
  string,
  ...string[],
];
const budgetValues = BUDGET_RANGES.map((b) => b.value) as [string, ...string[]];

export const contactSubmitSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z
    .string()
    .trim()
    .min(1, "Ton email est requis pour qu'on puisse te répondre.")
    .pipe(z.email("Cet email n'a pas l'air valide.")),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN, {
      error: (issue) =>
        `Décris ton projet en au moins ${MESSAGE_MIN} caractères (${typeof issue.input === "string" ? issue.input.length : 0} actuellement).`,
    })
    .max(
      MESSAGE_MAX,
      `Ton message dépasse ${MESSAGE_MAX} caractères. Découpe-le ou écris-moi en plusieurs fois.`,
    ),
  projectType: z.enum(projectTypeValues, {
    error: "Sélectionne le type de projet.",
  }),
  budget: z.enum(budgetValues, {
    error: "Sélectionne une fourchette de budget.",
  }),
  sourcePath: z.string().trim().max(200).optional(),
  website: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactSubmitInput = z.infer<typeof contactSubmitSchema>;
