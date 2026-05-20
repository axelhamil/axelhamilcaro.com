import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  contact: defineAction({
    accept: "json",
    input: z.object({
      name: z.string().trim().max(120).optional(),
      email: z.string().email("Email invalide"),
      message: z.string().trim().min(80, "Message trop court").max(5000),
      projectType: z.string().min(1, "Type de projet requis"),
      budget: z.string().min(1, "Budget requis"),
      sourcePath: z.string().optional(),
      turnstileToken: z.string().optional(),
      website: z.string().optional(),
    }),
    handler: async (input, _context) => {
      if (input.website && input.website.length > 0) {
        return { success: true };
      }

      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Endpoint non câblé. À reprendre depuis branche `nextjs`.",
      });
    },
  }),
};
