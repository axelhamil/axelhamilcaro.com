import type { FeatureId } from "./mcp.estimation.grid";
import {
  type EstimateInput,
  estimateInputSchema,
} from "./mcp.estimation.schema";

export type ReferenceProject = {
  slug: string;
  name: string;
  summary: string;
  realDuration: string;
  input: EstimateInput;
};

export type ReferenceSummary = {
  name: string;
  summary: string;
  realDuration: string;
};

const ONE_TO_THREE_MONTHS = "between 1 and 3 months";

export const REFERENCE_PROJECTS: readonly ReferenceProject[] = [
  {
    slug: "billetterie",
    name: "Billetterie",
    summary:
      "Internal ticketing dashboard with a 2D/3D seating plan and WebSocket sync under 200 ms.",
    realDuration: "1 month, solo",
    input: estimateInputSchema.parse({
      lots: [
        {
          name: "Core",
          features: [
            { id: "booking_scheduling", size: "complex" },
            { id: "realtime", size: "standard" },
            { id: "auth", size: "standard" },
            { id: "back_office", size: "standard" },
            { id: "dashboard_analytics", size: "standard" },
          ],
        },
      ],
    }),
  },
  {
    slug: "scormpilot",
    name: "ScormPilot",
    summary: "Multi-tenant SCORM e-learning SaaS, 5 apps built solo.",
    realDuration: ONE_TO_THREE_MONTHS,
    input: estimateInputSchema.parse({
      lots: [
        {
          name: "Core",
          features: [
            { id: "auth", size: "standard" },
            { id: "multi_tenant", size: "standard" },
            { id: "back_office", size: "standard" },
            { id: "file_upload", size: "complex" },
            { id: "third_party_integration", size: "standard" },
            { id: "public_api", size: "simple" },
            { id: "dashboard_analytics", size: "simple" },
          ],
        },
      ],
    }),
  },
  {
    slug: "homecafe",
    name: "HomeCafé",
    summary: "Wellbeing app on web and mobile.",
    realDuration: ONE_TO_THREE_MONTHS,
    input: estimateInputSchema.parse({
      platforms: ["web", "mobile"],
      lots: [
        {
          name: "Core",
          features: [
            { id: "auth", size: "standard" },
            { id: "payments", size: "standard" },
            { id: "notifications", size: "standard" },
            { id: "mobile_app", size: "standard" },
            { id: "content_management", size: "standard" },
            { id: "back_office", size: "simple" },
          ],
        },
      ],
    }),
  },
  {
    slug: "mentortroc",
    name: "MentorTroc",
    summary:
      "Communities and real-time messaging added to a platform already in production.",
    realDuration: ONE_TO_THREE_MONTHS,
    input: estimateInputSchema.parse({
      existing: "codebase_to_resume",
      lots: [
        {
          name: "Core",
          features: [
            { id: "realtime", size: "complex" },
            { id: "notifications", size: "standard" },
            { id: "search", size: "standard" },
            { id: "auth", size: "simple" },
            { id: "file_upload", size: "simple" },
          ],
        },
      ],
    }),
  },
];

const featureIdsOf = (input: EstimateInput) =>
  new Set(input.lots.flatMap((lot) => lot.features.map((f) => f.id)));

const toSummary = ({
  name,
  summary,
  realDuration,
}: ReferenceProject): ReferenceSummary => ({ name, summary, realDuration });

export const getReferences = () =>
  REFERENCE_PROJECTS.map(({ slug, name, summary, realDuration }) => ({
    slug,
    name,
    summary,
    realDuration,
  }));

export const referencesFor = (featureIds: FeatureId[]): ReferenceSummary[] => {
  const requested = new Set(featureIds);

  return REFERENCE_PROJECTS.map((reference, index) => ({
    reference,
    index,
    shared: [...featureIdsOf(reference.input)].filter((id) => requested.has(id))
      .length,
  }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, 2)
    .map((entry) => toSummary(entry.reference));
};
