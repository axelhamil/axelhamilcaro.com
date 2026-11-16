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

export const MCP_TOOL_INPUT_SCHEMAS = {
  list_projects: projectsInputSchema,
  audit_architecture_brief: briefInputSchema,
  estimate_project: estimateInputSchema,
};
