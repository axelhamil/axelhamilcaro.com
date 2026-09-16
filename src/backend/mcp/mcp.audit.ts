export type ArchitectureFlags = {
  saas: boolean;
  mvp: boolean;
  legacy: boolean;
  mobile: boolean;
  noMobile: boolean;
  ddd: boolean;
  billing: boolean;
  admin: boolean;
  realtime: boolean;
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
  const noMobile =
    /pas de mobile|sans mobile|no mobile|not mobile|mobile v1|v1 mobile/.test(
      haystack,
    );
  const mentionsMobile = /mobile|ios|android|capacitor/.test(haystack);

  return {
    saas: /saas|multi-tenant|multitenant/.test(haystack),
    mvp: /\bmvp\b|2 semaines|two[- ]week/.test(haystack),
    legacy: /legacy|refonte|rewrite/.test(haystack),
    mobile: mentionsMobile && !noMobile,
    noMobile,
    ddd: /\bddd\b|domain[- ]driven|event sourcing/.test(haystack),
    billing: /bill|stripe|paiement|abonnement|subscription/.test(haystack),
    admin: /admin|back-?office|backoffice/.test(haystack),
    realtime: /websocket|temps r[eé]el|realtime|temps-reel/.test(haystack),
  };
}

function coreContext(need: string) {
  const haystack = need.toLowerCase();

  if (/e-?learning|scorm|lms|formation|catalogue/.test(haystack))
    return "Learning catalog and playback";
  if (/billet|ticketing|event|salle/.test(haystack))
    return "Events, seats and checkout";
  if (/lien|link in bio|shortener/.test(haystack))
    return "Link routing and public pages";
  if (/rse|engagement/.test(haystack))
    return "Engagement campaigns and content";

  return "Core domain workflow";
}

export function analyzeArchitectureNeed(input: {
  need: string;
  stack?: string;
  constraints?: string;
}): ArchitectureBrief {
  const flags = flagsFromText(
    `${input.need} ${input.stack ?? ""} ${input.constraints ?? ""}`,
  );

  const contexts = [
    coreContext(input.need),
    flags.saas ? "Identity and tenancy" : "Identity",
  ];
  if (flags.billing) contexts.push("Billing");
  if (flags.admin) contexts.push("Admin / back-office");
  if (flags.realtime) contexts.push("Realtime sync");

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
  if (flags.noMobile)
    avoidOnShortMvp.push(
      "Native or Capacitor shell on v1; ship the web app first",
    );

  const summary = flags.saas
    ? "Treat tenancy as its own bounded context. Keep the core workflow independent of the HTTP framework. Only add billing or admin when the brief actually names them."
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
