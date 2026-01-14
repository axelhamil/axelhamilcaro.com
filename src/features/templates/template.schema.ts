import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  config: z.record(z.string(), z.unknown()),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
