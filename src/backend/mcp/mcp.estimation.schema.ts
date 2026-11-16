import { z } from "zod";
import { FEATURE_IDS, SIZES } from "./mcp.estimation.grid";

export const PROJECT_KINDS = [
  "application",
  "showcase_site",
  "staffing",
] as const;

export const PLATFORMS = ["web", "mobile"] as const;

export const EXISTING = ["none", "codebase_to_resume"] as const;

export const featureSelectionSchema = z.object({
  id: z
    .enum(FEATURE_IDS)
    .describe("Catalog feature id, as listed in the estimation grid"),
  size: z
    .enum(SIZES)
    .describe(
      "simple: the plain version; standard: the usual business version; complex: many rules, edge cases or volume",
    ),
});

export const lotSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(80)
    .describe("Short name of the delivery lot, for example Core or V2"),
  features: z
    .array(featureSelectionSchema)
    .min(1)
    .max(20)
    .describe("Catalog features delivered in this lot, each with a size"),
});

const platformsSchema = z.array(z.enum(PLATFORMS)).min(1);

const existingSchema = z.enum(EXISTING);

const EXISTING_DESCRIPTION =
  "none: built from scratch; codebase_to_resume: an existing codebase must be audited and taken over";

export const estimateInputSchema = z.object({
  projectKind: z
    .enum(PROJECT_KINDS)
    .default("application")
    .describe(
      "application: a product built from features; showcase_site: a marketing website; staffing: joining an existing team",
    ),
  lots: z
    .array(lotSchema)
    .max(6)
    .default([])
    .describe("Delivery lots in order, the first one being the first release"),
  unlisted: z
    .array(z.string().min(1).max(200))
    .max(10)
    .default([])
    .describe(
      "Needs that match no catalog feature, in the client's words; Axel prices them himself",
    ),
  platforms: platformsSchema
    .default(["web"])
    .describe("Target platforms of the product"),
  existing: existingSchema.default("none").describe(EXISTING_DESCRIPTION),
  openQuestions: z
    .number()
    .int()
    .min(0)
    .max(10)
    .default(5)
    .describe(
      "How many discovery questions are still unanswered; more open questions widen the range",
    ),
  budgetEur: z
    .number()
    .positive()
    .max(10_000_000)
    .optional()
    .describe(
      "Budget the client has in mind, in euros excluding tax, if shared",
    ),
  format: z
    .enum(["markdown", "json"])
    .default("markdown")
    .describe("Output format of the estimate"),
});

export type EstimateInput = z.infer<typeof estimateInputSchema>;

export const estimateToolInputSchema = estimateInputSchema.extend({
  platforms: platformsSchema
    .optional()
    .describe("Target platforms of the product, web when omitted"),
  existing: existingSchema
    .optional()
    .describe(`${EXISTING_DESCRIPTION}; none when omitted`),
});

export type EstimateToolInput = z.infer<typeof estimateToolInputSchema>;
