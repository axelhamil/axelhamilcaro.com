import { z } from "zod";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "./mcp.projects";

const briefInputSchema = z.object({
  need: z.string().min(1).max(4000),
  stack: z.string().max(2000).optional(),
  constraints: z.string().max(2000).optional(),
});

const proposalInputSchema = z
  .object({
    briefId: z.string().uuid().optional(),
    need: z.string().min(1).max(4000).optional(),
    stack: z.string().max(2000).optional(),
    constraints: z.string().max(2000).optional(),
    format: z.enum(["markdown", "json"]).default("markdown"),
  })
  .refine((value) => value.briefId || value.need, {
    message: "Provide briefId or need",
  });

const projectsInputSchema = z.object({
  category: z.enum(PROJECT_CATEGORIES).optional(),
  status: z.enum(PROJECT_STATUSES).optional(),
  format: z.enum(["markdown", "json"]).default("markdown"),
});

export const MCP_TOOL_INPUT_SCHEMAS = {
  list_projects: projectsInputSchema,
  audit_architecture_brief: briefInputSchema,
  generate_custom_proposal: proposalInputSchema,
};
