import { z } from "zod";

export const slugSchema = z
  .string()
  .min(2, "Le slug doit faire au moins 2 caractères")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Le slug ne peut contenir que des lettres, chiffres et tirets",
  );

export function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .replace(/-+/g, "-");
}

export function isValidSlug(value: string): boolean {
  return slugSchema.safeParse(value).success;
}
