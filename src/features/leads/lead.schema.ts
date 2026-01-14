import { z } from "zod";

export const submitLeadSchema = z.object({
  firstName: z
    .string()
    .min(1, "Le prénom est requis")
    .max(100, "Le prénom est trop long")
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .max(100, "Le nom est trop long")
    .transform((val) => val.trim())
    .nullish(),
  email: z.email("Email invalide"),
});

export const updateLeadSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  status: z
    .enum(["new", "contacted", "qualified", "converted", "lost"])
    .optional(),
  notes: z.string().nullish(),
});

export type SubmitLeadInput = z.infer<typeof submitLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
