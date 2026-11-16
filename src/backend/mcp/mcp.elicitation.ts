import {
  acceptedContent,
  CLIENT_CAPABILITIES_META_KEY,
  type InputRequiredResult,
  inputRequired,
  type PrimitiveSchemaDefinition,
  type ServerContext,
} from "@modelcontextprotocol/server";
import { z } from "zod";
import {
  type EstimateInput,
  type EstimateToolInput,
  estimateInputSchema,
} from "./mcp.estimation.schema";

export type ElicitationContext = {
  mcpReq: Pick<ServerContext["mcpReq"], "envelope" | "inputResponses">;
};

type ContextField = "budgetEur" | "existing" | "platforms";

const CONTEXT_KEY = "context";

const capabilitiesEnvelopeSchema = z.object({
  [CLIENT_CAPABILITIES_META_KEY]: z.object({
    elicitation: z.object({}).loose(),
  }),
});

const contextAnswersSchema = z.object({
  budgetEur: z.number().positive().max(10_000_000).optional(),
  existing: z.boolean().optional(),
  platforms: z.enum(["web", "web_and_mobile"]).optional(),
});

const CONTEXT_PROPERTIES = {
  budgetEur: {
    type: "number",
    title: "Budget",
    description: "Budget in mind, in euros excluding tax",
    minimum: 1,
  },
  existing: {
    type: "boolean",
    title: "Existing project",
    description: "Is there an existing codebase to take over?",
  },
  platforms: {
    type: "string",
    title: "Platforms",
    description: "Web only, or web and mobile",
    oneOf: [
      { const: "web", title: "Web only" },
      { const: "web_and_mobile", title: "Web and mobile" },
    ],
  },
} satisfies Record<ContextField, PrimitiveSchemaDefinition>;

export function clientDeclaresElicitation(ctx: ElicitationContext): boolean {
  return capabilitiesEnvelopeSchema.safeParse(ctx.mcpReq.envelope).success;
}

export function missingContextFields(input: EstimateToolInput): ContextField[] {
  const missing: ContextField[] = [];

  if (input.budgetEur === undefined) missing.push("budgetEur");
  if (input.existing === undefined) missing.push("existing");
  if (input.platforms === undefined) missing.push("platforms");

  return missing;
}

function hasInputResponses(ctx: ElicitationContext) {
  return Object.keys(ctx.mcpReq.inputResponses ?? {}).length > 0;
}

export function contextToAsk(
  input: EstimateToolInput,
  ctx: ElicitationContext,
): ContextField[] {
  if (!clientDeclaresElicitation(ctx) || hasInputResponses(ctx)) return [];

  return missingContextFields(input);
}

export function buildContextElicitation(
  missing: ContextField[],
): InputRequiredResult {
  const questions =
    missing.length === 1
      ? "1 quick question"
      : `${missing.length} quick questions`;

  return inputRequired({
    inputRequests: {
      [CONTEXT_KEY]: inputRequired.elicit({
        message: `Optional, ${questions} to tighten the estimate`,
        requestedSchema: {
          type: "object",
          properties: Object.fromEntries(
            missing.map((field) => [field, CONTEXT_PROPERTIES[field]]),
          ),
        },
      }),
    },
  });
}

const PLATFORM_ANSWERS = {
  web: ["web"],
  web_and_mobile: ["web", "mobile"],
} as const;

function existingFrom(answer: boolean | undefined) {
  if (answer === undefined) return undefined;

  return answer ? "codebase_to_resume" : "none";
}

export function applyContextAnswers(
  input: EstimateToolInput,
  ctx: ElicitationContext,
): EstimateInput {
  const answers = acceptedContent(
    ctx.mcpReq.inputResponses,
    CONTEXT_KEY,
    contextAnswersSchema,
  );
  return estimateInputSchema.parse({
    ...input,
    budgetEur: input.budgetEur ?? answers?.budgetEur,
    existing: input.existing ?? existingFrom(answers?.existing),
    platforms:
      input.platforms ??
      (answers?.platforms && PLATFORM_ANSWERS[answers.platforms]),
  });
}
