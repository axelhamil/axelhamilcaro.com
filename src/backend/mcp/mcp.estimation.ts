import { RATES, SITE_URL } from "@/app/_config/site.constants";
import { NOT_BINDING_QUOTE } from "./mcp.constants";
import {
  BRIEF_STAGE_QUESTIONS,
  CODEBASE_AUDIT,
  type DayTriple,
  FEATURE_GRID,
  type FeatureId,
  FOUNDATION,
  GRID_STATUS,
  PERT_Z,
  type Size,
  WIDENING,
} from "./mcp.estimation.grid";
import type { EstimateInput } from "./mcp.estimation.schema";
import { type ReferenceSummary, referencesFor } from "./mcp.references";

export type DayRange = { low: number; probable: number; high: number };

export type LotEstimate = {
  name: string;
  days: DayRange;
  eur: DayRange;
  features: { id: FeatureId; label: string; size: Size; days: DayRange }[];
};

export type BudgetVerdict = {
  budgetEur: number;
  status: "covers_high" | "covers_probable" | "covers_low_only" | "below_range";
  message: string;
  split?: { lots: string[]; probableEur: number };
};

export type OutOfScopeResult = {
  status: "out_of_scope";
  reason: "showcase_site" | "staffing";
  message: string;
  pointers: string[];
};

export type EstimatedResult = {
  status: "estimated";
  disclaimer: string;
  rateHtEur: number;
  gridStatus: string;
  lots: LotEstimate[];
  foundation: { items: { id: string; label: string }[]; days: DayRange };
  total: { days: DayRange; eur: DayRange; stage: "brief" | "refined" };
  budget?: BudgetVerdict;
  toQuote: string[];
  hypotheses: string[];
  exclusions: string[];
  topQuestions: string[];
  references: ReferenceSummary[];
};

export type EstimateResult = OutOfScopeResult | EstimatedResult;

type Band = { mean: number; variance: number; sumLow: number; sumHigh: number };

const SERVICES_URL = `${SITE_URL}/services`;

const MOBILE_NOT_SIZED = "Mobile app requested but not sized";

const OUT_OF_SCOPE_MESSAGES: Record<OutOfScopeResult["reason"], string> = {
  showcase_site:
    "Axel does not take showcase website projects. His services page lists what he builds; another provider is a better fit for a marketing website.",
  staffing:
    "Axel does not join teams as staff augmentation. His services page lists how he works; another provider is a better fit for staffing.",
};

const EXCLUSIONS = [
  "App stores fees and submissions",
  "Hosting and third-party subscriptions, always in the client's name",
  "Maintenance after delivery",
  "VAT",
];

const BASE_HYPOTHESES = [
  `Estimation grid status: ${GRID_STATUS}`,
  "The interface is included in each feature",
  "One full-time developer",
  "Acceptance testing is counted once, in the foundation",
  "At brief stage the estimate is an order of magnitude, not a quote",
];

const pert = (t: DayTriple) => (t.low + 4 * t.likely + t.high) / 6;

const sd = (t: DayTriple) => (t.high - t.low) / 6;

const aggregate = (triples: DayTriple[]): Band => ({
  mean: triples.reduce((sum, t) => sum + pert(t), 0),
  variance: triples.reduce((sum, t) => sum + sd(t) ** 2, 0),
  sumLow: triples.reduce((sum, t) => sum + t.low, 0),
  sumHigh: triples.reduce((sum, t) => sum + t.high, 0),
});

const combine = (bands: Band[]): Band => ({
  mean: bands.reduce((sum, b) => sum + b.mean, 0),
  variance: bands.reduce((sum, b) => sum + b.variance, 0),
  sumLow: bands.reduce((sum, b) => sum + b.sumLow, 0),
  sumHigh: bands.reduce((sum, b) => sum + b.sumHigh, 0),
});

const pertRange = (band: Band): DayRange => {
  const sigma = Math.sqrt(band.variance);

  return {
    low: Math.max(band.sumLow, band.mean - PERT_Z * sigma),
    probable: band.mean,
    high: Math.min(band.sumHigh, band.mean + PERT_Z * sigma),
  };
};

const widen = (raw: DayRange, openQuestions: number): DayRange => {
  const q = Math.min(openQuestions, BRIEF_STAGE_QUESTIONS);

  return {
    low: Math.min(raw.low, raw.probable * (1 - WIDENING.lowStep * q)),
    probable: raw.probable,
    high: Math.max(raw.high, raw.probable * (1 + WIDENING.highStep * q)),
  };
};

const tenth = (days: number) => Math.round(days * 10) / 10;

const roundTenths = (range: DayRange): DayRange => ({
  low: tenth(range.low),
  probable: tenth(range.probable),
  high: tenth(range.high),
});

const toEur = (days: number) => Math.round((days * RATES.dailyHtEur) / 10) * 10;

const eurRange = (range: DayRange): DayRange => ({
  low: toEur(range.low),
  probable: toEur(range.probable),
  high: toEur(range.high),
});

const budgetStatus = (
  budgetEur: number,
  eur: DayRange,
): BudgetVerdict["status"] => {
  if (budgetEur >= eur.high) return "covers_high";

  if (budgetEur >= eur.probable) return "covers_probable";

  if (budgetEur >= eur.low) return "covers_low_only";

  return "below_range";
};

const BUDGET_MESSAGES: Record<BudgetVerdict["status"], string> = {
  covers_high: "The budget covers even the high end of the range.",
  covers_probable:
    "The budget covers the probable cost, with little room if the open questions add work.",
  covers_low_only:
    "The budget only covers the low end of the range; the scope is at risk unless it is reduced.",
  below_range:
    "The budget is below the estimated range; the scope must be reduced or split into lots.",
};

const fitBudget = (
  budgetEur: number,
  eur: DayRange,
  foundation: Band,
  lots: { name: string; band: Band }[],
): BudgetVerdict => {
  const status = budgetStatus(budgetEur, eur);
  const verdict = { budgetEur, status, message: BUDGET_MESSAGES[status] };

  if (budgetEur >= eur.probable) return verdict;

  let mean = foundation.mean;
  let split: BudgetVerdict["split"];

  for (const [index, lot] of lots.entries()) {
    mean += lot.band.mean;
    const probableEur = toEur(mean);

    if (probableEur > budgetEur) break;

    split = {
      lots: lots.slice(0, index + 1).map((l) => l.name),
      probableEur,
    };
  }

  if (!split) return verdict;

  return {
    ...verdict,
    message: `${verdict.message} The first lots (${split.lots.join(", ")}) fit within it.`,
    split,
  };
};

const topQuestions = (input: EstimateInput): string[] => {
  const widest = new Map<FeatureId, number>();

  for (const feature of input.lots.flatMap((lot) => lot.features)) {
    const t = FEATURE_GRID[feature.id].sizes[feature.size];
    const spread = t.high - t.low;

    widest.set(feature.id, Math.max(widest.get(feature.id) ?? 0, spread));
  }

  return [...widest.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => FEATURE_GRID[id].question);
};

export const estimateProject = (input: EstimateInput): EstimateResult => {
  if (input.projectKind !== "application") {
    return {
      status: "out_of_scope",
      reason: input.projectKind,
      message: OUT_OF_SCOPE_MESSAGES[input.projectKind],
      pointers: [SERVICES_URL],
    };
  }

  const lots = input.lots.map((lot) => {
    const features = lot.features.map((feature) => {
      const triple = FEATURE_GRID[feature.id].sizes[feature.size];

      return {
        id: feature.id,
        label: FEATURE_GRID[feature.id].label,
        size: feature.size,
        days: roundTenths(pertRange(aggregate([triple]))),
      };
    });
    const band = aggregate(
      lot.features.map((f) => FEATURE_GRID[f.id].sizes[f.size]),
    );
    const days = pertRange(band);

    return {
      band,
      estimate: {
        name: lot.name,
        days: roundTenths(days),
        eur: eurRange(days),
        features,
      },
    };
  });

  const foundationItems = [
    ...FOUNDATION,
    ...(input.existing === "codebase_to_resume"
      ? [
          {
            id: "codebase_audit",
            label: "Codebase audit",
            days: CODEBASE_AUDIT,
          },
        ]
      : []),
  ];
  const foundationBand = aggregate(foundationItems.map((item) => item.days));

  const totalRaw = widen(
    pertRange(combine([foundationBand, ...lots.map((lot) => lot.band)])),
    input.openQuestions,
  );
  const totalEur = eurRange(totalRaw);

  const mobileNotSized =
    input.platforms.includes("mobile") &&
    !input.lots.some((lot) => lot.features.some((f) => f.id === "mobile_app"));

  const result: EstimatedResult = {
    status: "estimated",
    disclaimer: NOT_BINDING_QUOTE,
    rateHtEur: RATES.dailyHtEur,
    gridStatus: GRID_STATUS,
    lots: lots.map((lot) => lot.estimate),
    foundation: {
      items: foundationItems.map(({ id, label }) => ({ id, label })),
      days: roundTenths(pertRange(foundationBand)),
    },
    total: {
      days: {
        low: Math.floor(totalRaw.low),
        probable: Math.round(totalRaw.probable),
        high: Math.ceil(totalRaw.high),
      },
      eur: totalEur,
      stage: input.openQuestions >= BRIEF_STAGE_QUESTIONS ? "brief" : "refined",
    },
    toQuote: [
      ...input.unlisted.map((need) => `To quote by Axel: ${need}`),
      ...(mobileNotSized ? [MOBILE_NOT_SIZED] : []),
    ],
    hypotheses: [
      ...BASE_HYPOTHESES,
      ...(mobileNotSized
        ? ["The mobile app is excluded from the total until it is sized"]
        : []),
    ],
    exclusions: EXCLUSIONS,
    topQuestions: topQuestions(input),
    references: referencesFor(
      input.lots.flatMap((lot) => lot.features.map((f) => f.id)),
    ),
  };

  if (input.budgetEur === undefined) return result;

  return {
    ...result,
    budget: fitBudget(
      input.budgetEur,
      totalEur,
      foundationBand,
      lots.map((lot) => ({ name: lot.estimate.name, band: lot.band })),
    ),
  };
};
