import { AVAILABILITY, RATES } from "@/app/_config/site.constants";
import type { ArchitectureBrief } from "./mcp.audit";
import { getServices, getWhoami } from "./mcp.catalog";
import { NOT_BINDING_QUOTE } from "./mcp.constants";

export type ProposalInput = {
  need: string;
  stack?: string;
  constraints?: string;
  analysis: ArchitectureBrief;
  briefId?: string;
};

export function buildProposal(input: ProposalInput) {
  const whoami = getWhoami();

  return {
    disclaimer: NOT_BINDING_QUOTE,
    briefId: input.briefId ?? null,
    identity: {
      name: whoami.name,
      jobTitle: whoami.jobTitle,
      dailyHtEur: RATES.dailyHtEur,
      quoteSla: AVAILABILITY.quoteSla,
      startWindow: AVAILABILITY.startWindow,
    },
    scope: {
      in: input.analysis.contexts,
      adapters: input.analysis.adapters,
    },
    outOfScope: input.analysis.avoidOnShortMvp,
    timelines: {
      mvp: "4 to 8 weeks",
      fractional: "1 to 3 days per week",
      tma: {
        proMonthlyEur: RATES.tma.proMonthlyEur,
        premiumMonthlyEur: RATES.tma.premiumMonthlyEur,
      },
    },
    services: getServices().map((service) => service.title),
    nextStep: "email contact@axelhamilcaro.com",
  };
}

export function renderProposalMarkdown(input: ProposalInput): string {
  const proposal = buildProposal(input);

  return [
    "# Intervention outline",
    "",
    NOT_BINDING_QUOTE,
    "",
    proposal.briefId ? `briefId: ${proposal.briefId}` : "",
    "",
    `TJM: ${RATES.dailyHtEur}€ HT/day`,
    `Quote SLA: ${AVAILABILITY.quoteSla}`,
    `Start window: ${AVAILABILITY.startWindow}`,
    "",
    "## In scope (draft)",
    "",
    ...proposal.scope.in.map((item) => `- ${item}`),
    "",
    "## Out of scope (draft)",
    "",
    ...proposal.outOfScope.map((item) => `- ${item}`),
    "",
    "## Typical timelines",
    "",
    `- MVP: ${proposal.timelines.mvp}`,
    `- Fractional lead: ${proposal.timelines.fractional}`,
    `- TMA PRO: ${proposal.timelines.tma.proMonthlyEur}€/month`,
    `- TMA PREMIUM: ${proposal.timelines.tma.premiumMonthlyEur}€/month`,
    "",
    `Next: ${proposal.nextStep}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}
