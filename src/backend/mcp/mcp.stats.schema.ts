import { z } from "zod";
import { MCP_TRAFFIC_SCOPES } from "./mcp.origin";

export const MCP_STATS_PERIODS = [1, 7, 30] as const;
export const MCP_EVENTS_FILTER_MAX = 256;

const periodSchema = z.coerce
  .number()
  .pipe(z.literal(MCP_STATS_PERIODS))
  .catch(7);

const optionalText = z
  .string()
  .trim()
  .max(MCP_EVENTS_FILTER_MAX)
  .optional()
  .transform((value) => value || undefined);

const trafficSchema = z.enum(MCP_TRAFFIC_SCOPES).catch("agents");

export const mcpOverviewQuerySchema = z.object({
  days: periodSchema,
  traffic: trafficSchema,
});

export const mcpEventsQuerySchema = z.object({
  days: periodSchema,
  traffic: trafficSchema,
  method: optionalText,
  status: z.enum(["ok", "error"]).optional().catch(undefined),
  origin: optionalText,
  visit: optionalText,
  cursor: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}\|[0-9a-f-]{36}$/i)
    .optional()
    .catch(undefined),
  limit: z.coerce.number().int().min(10).max(100).catch(50),
});

export type McpEventsQuery = z.infer<typeof mcpEventsQuerySchema>;
