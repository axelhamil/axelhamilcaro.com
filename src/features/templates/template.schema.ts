import { z } from "zod";

const fieldSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["text", "email", "textarea", "select", "checkbox", "number"]),
  label: z.string().max(200).optional(),
  placeholder: z.string().max(200).optional(),
  required: z.boolean().optional(),
  options: z.array(z.string().max(100)).max(50).optional(),
});

const configSchema = z.object({
  fields: z.array(fieldSchema).max(20).optional(),
  submitText: z.string().max(100).optional(),
  successMessage: z.string().max(500).optional(),
  theme: z.enum(["light", "dark", "auto"]).optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(100),
  config: configSchema,
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
