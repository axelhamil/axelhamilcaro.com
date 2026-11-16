export const FEATURE_IDS = [
  "auth",
  "multi_tenant",
  "payments",
  "back_office",
  "realtime",
  "notifications",
  "file_upload",
  "search",
  "third_party_integration",
  "mobile_app",
  "data_import",
  "dashboard_analytics",
  "content_management",
  "booking_scheduling",
  "ai_feature",
  "public_api",
] as const;

export type FeatureId = (typeof FEATURE_IDS)[number];

export const SIZES = ["simple", "standard", "complex"] as const;

export type Size = (typeof SIZES)[number];

export type DayTriple = { low: number; likely: number; high: number };

type FeatureEntry = {
  label: string;
  question: string;
  sizes: Record<Size, DayTriple>;
};

const triple = (low: number, likely: number, high: number): DayTriple => ({
  low,
  likely,
  high,
});

export const FEATURE_GRID: Record<FeatureId, FeatureEntry> = {
  auth: {
    label: "Authentication",
    question:
      "How do users sign in, and do they need different roles or permissions?",
    sizes: {
      simple: triple(0.25, 1, 2),
      standard: triple(1.5, 3, 5),
      complex: triple(4, 7, 12),
    },
  },
  multi_tenant: {
    label: "Multi-tenant accounts",
    question:
      "Will several organizations share the product, each seeing only its own data?",
    sizes: {
      simple: triple(2, 3, 5),
      standard: triple(4, 7, 11),
      complex: triple(8, 14, 22),
    },
  },
  payments: {
    label: "Payments",
    question:
      "Do users pay once, by subscription, or does money flow between several parties?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(4, 7, 12),
      complex: triple(8, 15, 25),
    },
  },
  back_office: {
    label: "Back office",
    question:
      "What does the team need to manage behind the scenes, and how many kinds of records?",
    sizes: {
      simple: triple(2, 4, 6),
      standard: triple(5, 9, 15),
      complex: triple(10, 18, 30),
    },
  },
  realtime: {
    label: "Real-time updates",
    question:
      "Do users need to see changes made by others instantly, without refreshing?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(3, 6, 10),
      complex: triple(8, 14, 22),
    },
  },
  notifications: {
    label: "Notifications",
    question:
      "Which events should alert users, and through which channels: email, push or SMS?",
    sizes: {
      simple: triple(1, 2, 3),
      standard: triple(2.5, 5, 8),
      complex: triple(6, 10, 16),
    },
  },
  file_upload: {
    label: "File upload",
    question:
      "What kind of files do users upload, and must they be processed or previewed?",
    sizes: {
      simple: triple(1, 2, 3),
      standard: triple(2.5, 4, 7),
      complex: triple(5, 9, 15),
    },
  },
  search: {
    label: "Search",
    question:
      "What do users search for, and do they need filters, sorting or typo tolerance?",
    sizes: {
      simple: triple(1, 2, 3),
      standard: triple(3, 5, 9),
      complex: triple(6, 11, 18),
    },
  },
  third_party_integration: {
    label: "Third-party integration",
    question:
      "Which outside tools must the product talk to, and in which direction?",
    sizes: {
      simple: triple(1, 2, 4),
      standard: triple(3, 6, 10),
      complex: triple(7, 12, 20),
    },
  },
  mobile_app: {
    label: "Mobile app",
    question:
      "Must the mobile app be published on the stores, and does it work offline?",
    sizes: {
      simple: triple(5, 8, 12),
      standard: triple(10, 16, 26),
      complex: triple(18, 30, 48),
    },
  },
  data_import: {
    label: "Data import",
    question:
      "Where does the existing data come from, and how clean and large is it?",
    sizes: {
      simple: triple(1, 2, 3),
      standard: triple(3, 5, 9),
      complex: triple(6, 11, 18),
    },
  },
  dashboard_analytics: {
    label: "Dashboard and analytics",
    question: "Which figures must the dashboard show, and who looks at them?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(4, 7, 12),
      complex: triple(8, 14, 24),
    },
  },
  content_management: {
    label: "Content management",
    question:
      "Who edits the content, and does it need drafts, approval or several languages?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(3, 6, 10),
      complex: triple(6, 11, 18),
    },
  },
  booking_scheduling: {
    label: "Booking and scheduling",
    question:
      "What is booked, and are there limited spots, time slots or cancellations to handle?",
    sizes: {
      simple: triple(2, 4, 6),
      standard: triple(5, 9, 15),
      complex: triple(10, 18, 30),
    },
  },
  ai_feature: {
    label: "AI feature",
    question:
      "What should the AI do for the user, and what happens when its answer is wrong?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(4, 7, 12),
      complex: triple(8, 15, 26),
    },
  },
  public_api: {
    label: "Public API",
    question:
      "Who will use the API from outside, and what must they be able to do with it?",
    sizes: {
      simple: triple(1.5, 3, 5),
      standard: triple(3, 6, 10),
      complex: triple(6, 11, 18),
    },
  },
};

export const FOUNDATION: readonly {
  id: "setup" | "deployment" | "acceptance";
  label: string;
  days: DayTriple;
}[] = [
  { id: "setup", label: "Project setup", days: triple(1, 2, 3) },
  { id: "deployment", label: "Deployment", days: triple(1, 2, 3.5) },
  { id: "acceptance", label: "Acceptance testing", days: triple(1.5, 3, 5) },
];

export const CODEBASE_AUDIT: DayTriple = triple(2, 4, 8);

export const GRID_STATUS = "draft, to be validated by Axel";

export const PERT_Z = 1.28;

export const BRIEF_STAGE_QUESTIONS = 5;

export const WIDENING = { lowStep: 0.1, highStep: 0.2 };
