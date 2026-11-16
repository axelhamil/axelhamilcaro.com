import { emailService } from "@/src/backend/email/email.service";
import { formRepository } from "@/src/backend/forms/form.repository";
import {
  type CreateLeadData,
  leadRepository,
} from "@/src/backend/leads/lead.repository";
import { normalizeEmail } from "@/src/lib/utils/email.utils";
import {
  briefRetentionCutoff,
  MCP_CLIP,
  MCP_INQUIRY_SLUG,
} from "./mcp.constants";
import {
  type DayRange,
  type EstimateResult,
  estimateProject,
} from "./mcp.estimation";
import { logMcpFailure } from "./mcp.log";
import type { SendProjectBriefInput } from "./mcp.tools.schema";

const BRIEF_FORM_TITLE = "MCP project brief";
const BRIEF_SOURCE = "mcp";
const ANONYMOUS = "Anonymous";

export type BriefDeps = {
  ensureForm(): Promise<{ id: string; title: string; slug: string }>;
  upsertLead(
    data: CreateLeadData & { notes: string },
    options: { separator: string; maxLength: number },
  ): Promise<{ created: boolean }>;
  purgeOlderThan(formId: string, cutoff: Date): Promise<unknown>;
  notify(data: {
    formTitle: string;
    formSlug: string;
    firstName: string;
    email: string;
    source: string;
    notes: string;
  }): Promise<{ success: boolean }>;
  now(): Date;
};

const range = (values: DayRange, unit: string) =>
  `${values.low}${unit} / ${values.probable}${unit} / ${values.high}${unit}`;

const toQuoteLines = (toQuote: string[]) =>
  toQuote.length > 0 ? [`To quote by Axel: ${toQuote.join("; ")}`] : [];

function renderEstimateLines(estimate: EstimateResult) {
  if (estimate.status === "out_of_scope")
    return [`Estimate: out of scope (${estimate.reason}). ${estimate.message}`];

  if (estimate.lots.length === 0)
    return [
      "Estimate: none, no catalog feature",
      ...toQuoteLines(estimate.toQuote),
    ];

  const lines = [
    "Lots:",
    ...estimate.lots.map(
      (lot) =>
        `- ${lot.name}: ${lot.features.map((feature) => `${feature.label} (${feature.size})`).join(", ")}`,
    ),
    "Estimate recomputed by the server (low / probable / high):",
    `- Days: ${range(estimate.total.days, "")}`,
    `- Euros HT: ${range(estimate.total.eur, "€")}`,
    ...toQuoteLines(estimate.toQuote),
  ];

  if (estimate.budget)
    lines.push(
      `Budget: ${estimate.budget.budgetEur}€ HT. ${estimate.budget.message}`,
    );

  return lines;
}

export function renderBriefNotes(
  input: SendProjectBriefInput,
  estimate: EstimateResult,
) {
  const lines = [
    `Need: ${input.need}`,
    ...(input.company ? [`Company: ${input.company}`] : []),
    ...renderEstimateLines(estimate),
    ...(input.answers ? [`Answers: ${input.answers}`] : []),
  ];

  return lines.join("\n").slice(0, MCP_CLIP.notes);
}

export function cleanName(name: string | undefined) {
  return (name ?? "")
    .replace(/\p{C}+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function tryNotify(
  deps: BriefDeps,
  data: Parameters<BriefDeps["notify"]>[0],
) {
  try {
    const result = await deps.notify(data);
    if (!result.success)
      logMcpFailure("mcp.brief", "brief notification rejected");

    return result.success;
  } catch (error) {
    logMcpFailure("mcp.brief", "brief notification failed", error);
    return false;
  }
}

function estimateBrief(input: SendProjectBriefInput) {
  return estimateProject({
    projectKind: input.projectKind,
    lots: input.lots,
    unlisted: input.unlisted,
    platforms: input.platforms,
    existing: input.existing,
    openQuestions: input.openQuestions,
    budgetEur: input.budgetEur,
    format: "markdown",
  });
}

export function createProjectBriefService(deps: BriefDeps) {
  return {
    async send(input: SendProjectBriefInput) {
      const form = await deps.ensureForm();

      const now = deps.now();

      await deps
        .purgeOlderThan(form.id, briefRetentionCutoff(now))
        .catch((error: unknown) =>
          logMcpFailure("mcp.brief", "brief retention purge failed", error),
        );

      const email = normalizeEmail(input.email);
      const firstName = cleanName(input.name) || ANONYMOUS;
      const notes = renderBriefNotes(input, estimateBrief(input));
      const { created } = await deps.upsertLead(
        { formId: form.id, firstName, email, source: BRIEF_SOURCE, notes },
        {
          separator: `\n\n--- Brief of ${now.toISOString()} ---\n`,
          maxLength: MCP_CLIP.notes,
        },
      );

      const notified = await tryNotify(deps, {
        formTitle: form.title,
        formSlug: form.slug,
        firstName,
        email,
        source: BRIEF_SOURCE,
        notes,
      });

      return { status: "recorded" as const, created, notified };
    },
  };
}

async function ensureBriefForm() {
  const existing = await formRepository.findBySlug(MCP_INQUIRY_SLUG);
  if (existing) return existing;

  return formRepository.create({
    slug: MCP_INQUIRY_SLUG,
    title: BRIEF_FORM_TITLE,
    isActive: false,
  });
}

export const projectBriefService = createProjectBriefService({
  ensureForm: ensureBriefForm,
  upsertLead: (data, options) =>
    leadRepository.upsertAppendingNotes(data, options),
  purgeOlderThan: (formId, cutoff) =>
    leadRepository.deleteOlderThan(formId, cutoff),
  notify: (data) => emailService.sendAdminNotification(data),
  now: () => new Date(),
});
