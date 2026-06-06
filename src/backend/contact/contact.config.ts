export const PROJECT_TYPES = [
  {
    value: "nextjs-app",
    label: "Développement / refonte d'app (SaaS, métier)",
    inScope: true,
  },
  {
    value: "tma",
    label: "TMA / évolutions d'une app existante",
    inScope: true,
  },
  {
    value: "lead-tech",
    label: "Lead tech / dev fractionnel",
    inScope: true,
  },
  {
    value: "audit",
    label: "Audit / conseil archi",
    inScope: true,
  },
  {
    value: "other",
    label: "Autre",
    inScope: false,
  },
] as const;

export type ProjectTypeValue = (typeof PROJECT_TYPES)[number]["value"];

export const BUDGET_RANGES = [
  { value: "unknown", label: "Pas encore défini" },
  { value: "xs", label: "Moins de 5 000 €" },
  { value: "s", label: "5 000 - 15 000 €" },
  { value: "m", label: "15 000 - 40 000 €" },
  { value: "l", label: "Plus de 40 000 €" },
] as const;

export type BudgetRangeValue = (typeof BUDGET_RANGES)[number]["value"];

export function getProjectType(value: ProjectTypeValue) {
  return PROJECT_TYPES.find((t) => t.value === value);
}

export function getBudgetRange(value: BudgetRangeValue) {
  return BUDGET_RANGES.find((b) => b.value === value);
}

const TYPE_BASE_SCORE: Record<ProjectTypeValue, number> = {
  "nextjs-app": 80,
  tma: 70,
  "lead-tech": 90,
  audit: 60,
  other: 15,
};

const BUDGET_MODIFIER: Record<BudgetRangeValue, number> = {
  unknown: 0,
  xs: -20,
  s: 0,
  m: 10,
  l: 20,
};

export function calculateLeadScore(
  projectType: ProjectTypeValue,
  budget: BudgetRangeValue,
): number {
  const base = TYPE_BASE_SCORE[projectType];
  const modifier = BUDGET_MODIFIER[budget];
  return Math.max(0, Math.min(100, base + modifier));
}
