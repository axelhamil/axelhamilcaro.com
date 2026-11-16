import { RATES } from "@/app/_config/site.constants";
import { NOT_BINDING_QUOTE } from "./mcp.constants";
import {
  CODEBASE_AUDIT,
  type DayTriple,
  FEATURE_GRID,
  FEATURE_IDS,
  FOUNDATION,
  GRID_STATUS,
  PERT_Z,
  SIZES,
} from "./mcp.estimation.grid";
import { getReferences } from "./mcp.references";

const METHOD_STEPS = [
  "Discovery first: Axel asks about the problem, the users and the constraints before giving any figure.",
  "Scoping into lots: the project is cut into lots that each ship and work on their own, validated one at a time.",
  "Estimate: each feature is sized from a fixed grid; project setup, deployment and acceptance testing are counted once for the whole project.",
  "Written proposal: the estimate becomes a firm proposal only after a call with Axel and a signed document.",
] as const;

const METHOD_PRINCIPLES = [
  "An estimate is an order of magnitude with a low, likely and high range, never a firm price or a delivery date.",
  "No half-day floor per small task and no margin stacked on every line: uncertainty is carried by the range.",
  "A feature outside the grid is left for Axel to price, never invented.",
  "Hosting and accounts are always opened in the client's name, so the client owns the product.",
  "Nothing is sent to Axel without the visitor's explicit consent.",
] as const;

const METHOD_OUT_OF_SCOPE = [
  "Showcase sites",
  "Staff augmentation",
  "Legacy maintenance without a rewrite",
] as const;

export function getMethod() {
  return {
    steps: [...METHOD_STEPS],
    principles: [...METHOD_PRINCIPLES],
    outOfScope: [...METHOD_OUT_OF_SCOPE],
    rate: { dailyHtEur: RATES.dailyHtEur },
    disclaimer: NOT_BINDING_QUOTE,
  };
}

export function getEstimationGrid() {
  return {
    status: GRID_STATUS,
    unit: "working days",
    rateHtEur: RATES.dailyHtEur,
    pertZ: PERT_Z,
    foundation: FOUNDATION.map(({ id, label, days }) => ({ id, label, days })),
    codebaseAudit: CODEBASE_AUDIT,
    features: FEATURE_IDS.map((id) => ({
      id,
      label: FEATURE_GRID[id].label,
      sizes: FEATURE_GRID[id].sizes,
    })),
  };
}

const formatTriple = ({ low, likely, high }: DayTriple) =>
  `${low} / ${likely} / ${high}`;

export function renderMethodMarkdown() {
  const method = getMethod();

  return [
    "# How Axel works",
    "",
    "## Steps",
    "",
    ...method.steps.map((step, index) => `${index + 1}. ${step}`),
    "",
    "## Principles",
    "",
    ...method.principles.map((principle) => `- ${principle}`),
    "",
    "## What Axel does not take",
    "",
    ...method.outOfScope.map((item) => `- ${item}`),
    "",
    `Daily rate: ${method.rate.dailyHtEur}€ HT.`,
    "",
    method.disclaimer,
  ].join("\n");
}

export function renderEstimationGridMarkdown() {
  const grid = getEstimationGrid();

  return [
    "# Estimation grid",
    "",
    `Status: ${grid.status}. Unit: ${grid.unit} (low / likely / high), ${grid.rateHtEur}€ HT per day.`,
    "",
    "## Foundation, counted once per project",
    "",
    ...grid.foundation.map(
      (item) => `- ${item.label}: ${formatTriple(item.days)}`,
    ),
    `- Codebase audit, when an existing codebase is resumed: ${formatTriple(grid.codebaseAudit)}`,
    "",
    "## Features",
    "",
    `| Feature | ${SIZES.join(" | ")} |`,
    `| --- | ${SIZES.map(() => "---").join(" | ")} |`,
    ...grid.features.map(
      (feature) =>
        `| ${feature.label} | ${SIZES.map((size) => formatTriple(feature.sizes[size])).join(" | ")} |`,
    ),
  ].join("\n");
}

export function renderReferencesMarkdown() {
  return [
    "# Reference projects",
    "",
    "Projects Axel delivered, used to calibrate the estimation grid.",
    "",
    ...getReferences().flatMap((reference) => [
      `## ${reference.name}`,
      "",
      reference.summary,
      "",
      `- Real duration: ${reference.realDuration}`,
      "",
    ]),
  ].join("\n");
}
