import { z } from "zod";
import { estimateInputSchema } from "./mcp.estimation.schema";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "./mcp.projects";

const briefInputSchema = z.object({
  need: z.string().min(1).max(4000),
  stack: z.string().max(2000).optional(),
  constraints: z.string().max(2000).optional(),
});

const projectsInputSchema = z.object({
  category: z.enum(PROJECT_CATEGORIES).optional(),
  status: z.enum(PROJECT_STATUSES).optional(),
  format: z.enum(["markdown", "json"]).default("markdown"),
});

export const sendProjectBriefSchema = estimateInputSchema
  .omit({ format: true })
  .extend({
    consent: z
      .literal(true)
      .describe("true only after the person explicitly agreed to send"),
    email: z.email().max(254).describe("Email Axel replies to"),
    name: z.string().trim().max(100).optional(),
    company: z.string().trim().max(150).optional(),
    need: z
      .string()
      .min(1)
      .max(4000)
      .describe("The need in the person's words"),
    answers: z
      .string()
      .max(4000)
      .optional()
      .describe("Answers given during the discovery"),
  });

export type SendProjectBriefInput = z.infer<typeof sendProjectBriefSchema>;

export const MCP_TOOL_INPUT_SCHEMAS = {
  list_projects: projectsInputSchema,
  audit_architecture_brief: briefInputSchema,
  estimate_project: estimateInputSchema,
  send_project_brief: sendProjectBriefSchema,
};
