import { emailService } from "@/src/backend/email/email.service";
import { formRepository } from "@/src/backend/forms/form.repository";
import {
  type CreateLeadData,
  leadRepository,
} from "@/src/backend/leads/lead.repository";
import { normalizeEmail } from "@/src/lib/utils/email.utils";
import { MCP_CLIP, MCP_INQUIRY_SLUG } from "./mcp.constants";
import {
  type DayRange,
  type EstimateResult,
  estimateProject,
} from "./mcp.estimation";
import type { SendProjectBriefInput } from "./mcp.tools.schema";

export const BRIEF_RETENTION_MONTHS = 12;

const BRIEF_FORM_TITLE = "MCP project brief";
const BRIEF_SOURCE = "mcp";
const ANONYMOUS = "Anonymous";

export type BriefDeps = {
  ensureForm(): Promise<{ id: string; title: string; slug: string }>;
  findLead(formId: string, email: string): Promise<{ id: string } | null>;
  createLead(data: CreateLeadData): Promise<unknown>;
  updateLead(id: string, notes: string): Promise<unknown>;
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

function renderEstimateLines(estimate: EstimateResult) {
  if (estimate.status === "out_of_scope")
    return [`Estimate: out of scope (${estimate.reason}). ${estimate.message}`];

  const lines = [
    "Lots:",
    ...estimate.lots.map(
      (lot) =>
        `- ${lot.name}: ${lot.features.map((feature) => `${feature.label} (${feature.size})`).join(", ")}`,
    ),
    "Estimate recomputed by the server (low / probable / high):",
    `- Days: ${range(estimate.total.days, "")}`,
    `- Euros HT: ${range(estimate.total.eur, "€")}`,
  ];

  if (estimate.toQuote.length > 0)
    lines.push(`To quote by Axel: ${estimate.toQuote.join("; ")}`);

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

function retentionCutoff(now: Date) {
  const cutoff = new Date(now);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - BRIEF_RETENTION_MONTHS);
  return cutoff;
}

async function tryNotify(
  deps: BriefDeps,
  data: Parameters<BriefDeps["notify"]>[0],
) {
  try {
    const result = await deps.notify(data);
    return result.success;
  } catch {
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

      await deps
        .purgeOlderThan(form.id, retentionCutoff(deps.now()))
        .catch(() => undefined);

      const email = normalizeEmail(input.email);
      const firstName = input.name || ANONYMOUS;
      const notes = renderBriefNotes(input, estimateBrief(input));
      const existing = await deps.findLead(form.id, email);

      if (existing) await deps.updateLead(existing.id, notes);
      else
        await deps.createLead({
          formId: form.id,
          firstName,
          email,
          source: BRIEF_SOURCE,
          notes,
        });

      const notified = await tryNotify(deps, {
        formTitle: form.title,
        formSlug: form.slug,
        firstName,
        email,
        source: BRIEF_SOURCE,
        notes,
      });

      return { status: "recorded" as const, created: !existing, notified };
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
  findLead: (formId, email) => leadRepository.findByFormAndEmail(formId, email),
  createLead: (data) => leadRepository.create(data),
  updateLead: (id, notes) => leadRepository.update(id, { notes }),
  purgeOlderThan: (formId, cutoff) =>
    leadRepository.deleteOlderThan(formId, cutoff),
  notify: (data) => emailService.sendAdminNotification(data),
  now: () => new Date(),
});
