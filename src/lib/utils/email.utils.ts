import { z } from "zod";

export const emailSchema = z.email("Email invalide");

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return emailSchema.safeParse(value).success;
}

export function getEmailDomain(email: string): string {
  return email.split("@")[1];
}
