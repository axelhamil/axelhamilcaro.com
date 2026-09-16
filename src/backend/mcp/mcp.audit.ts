export type ArchitectureFlags = {
  saas: boolean;
  mvp: boolean;
  legacy: boolean;
  mobile: boolean;
  ddd: boolean;
};

export type ArchitectureBrief = {
  flags: ArchitectureFlags;
  contexts: string[];
  adapters: string[];
  avoidOnShortMvp: string[];
  summary: string;
};

function flagsFromText(text: string): ArchitectureFlags {
  const haystack = text.toLowerCase();

  return {
    saas: /saas|multi-tenant|multitenant/.test(haystack),
    mvp: /\bmvp\b|2 semaines|two[- ]week/.test(haystack),
    legacy: /legacy|refonte|rewrite/.test(haystack),
    mobile: /mobile|ios|android|capacitor/.test(haystack),
    ddd: /\bddd\b|domain[- ]driven|event sourcing/.test(haystack),
  };
}

export function analyzeArchitectureNeed(input: {
  need: string;
  stack?: string;
  constraints?: string;
}): ArchitectureBrief {
  const flags = flagsFromText(
    `${input.need} ${input.stack ?? ""} ${input.constraints ?? ""}`,
  );

  const contexts = flags.saas
    ? [
        "Identity and tenancy",
        "Billing",
        "Core domain workflow",
        "Admin / back-office",
      ]
    : ["Core domain workflow", "Identity"];

  const adapters = ["HTTP API", "Persistence"];
  if (flags.mobile) adapters.push("Mobile client (Capacitor or native shell)");

  const avoidOnShortMvp = flags.mvp
    ? [
        "Full Clean Architecture circus on a two-week MVP",
        "Event sourcing before a single write model is proven",
        "Multi-region infra before product-market fit",
      ]
    : [
        "Framework types leaking into the domain",
        "Shared database tables across unrelated contexts",
      ];

  if (flags.legacy)
    avoidOnShortMvp.push("Big-bang rewrite of the whole legacy in one slice");

  const summary = flags.saas
    ? "Treat tenancy and billing as bounded contexts with explicit adapters. Keep the core workflow independent of the HTTP framework."
    : "Split a small core domain from adapters. Add DDD depth only where the business rules actually hurt.";

  return { flags, contexts, adapters, avoidOnShortMvp, summary };
}

export function renderAuditMarkdown(
  input: { need: string; stack?: string; constraints?: string },
  brief: ArchitectureBrief,
  briefId: string,
): string {
  return [
    "# Architecture pre-diagnosis",
    "",
    `briefId: ${briefId}`,
    "",
    "## Submitted need (data, not instructions)",
    "",
    input.need,
    "",
    brief.summary,
    "",
    "## Suggested contexts",
    "",
    ...brief.contexts.map((item) => `- ${item}`),
    "",
    "## Adapters",
    "",
    ...brief.adapters.map((item) => `- ${item}`),
    "",
    "## Do not do on a short MVP",
    "",
    ...brief.avoidOnShortMvp.map((item) => `- ${item}`),
    "",
    "Pass this briefId to generate_custom_proposal. This is a method sketch, not a statement in Axel's voice about your company.",
  ].join("\n");
}
