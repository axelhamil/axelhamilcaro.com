import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type BackgroundType = "color" | "gradient" | "image";

export const forms = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  backgroundType: text("background_type").notNull().default("color"),
  backgroundColor: text("background_color").default("#1e1e2e"),
  backgroundGradient: text("background_gradient"),
  backgroundImage: text("background_image"),
  cardImage: text("card_image"),
  badgeText: text("badge_text"),
  title: text("title").notNull(),
  description: text("description"),
  buttonText: text("button_text").notNull().default("Envoyer"),
  buttonSubtext: text("button_subtext"),
  badgeColor: text("badge_color").default("#ff4d00"),
  badgeStyle: text("badge_style").default("filled"),
  isActive: boolean("is_active").default(true),
  emailSubject: text("email_subject"),
  emailBody: text("email_body"),
  emailCtaText: text("email_cta_text"),
  emailCtaUrl: text("email_cta_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const formTemplates = pgTable("form_templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  config: jsonb("config").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    formId: uuid("form_id")
      .notNull()
      .references(() => forms.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    email: text("email").notNull(),
    score: integer("score").default(50),
    source: text("source"),
    status: text("status").default("new"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_leads_form_id").on(table.formId),
    index("idx_leads_created_at").on(table.createdAt),
    uniqueIndex("idx_leads_form_email").on(table.formId, table.email),
  ],
);

// Tree links - pour la page /tree
export const treeLinks = pgTable("tree_links", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  description: text("description"),
  icon: text("icon").notNull().default("link"),
  featured: boolean("featured").default(false),
  isActive: boolean("is_active").default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Analytics - vues de pages
export const pageViews = pgTable(
  "page_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    path: text("path").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    country: text("country"),
    city: text("city"),
    device: text("device"),
    browser: text("browser"),
    os: text("os"),
    sessionId: text("session_id"),
    durationMs: integer("duration_ms"),
    isBounce: boolean("is_bounce").default(true),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_page_views_created_at").on(table.createdAt),
    index("idx_page_views_session").on(table.sessionId),
  ],
);

export const loginAttempts = pgTable("login_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  githubId: text("github_id").notNull(),
  githubUsername: text("github_username"),
  githubEmail: text("github_email"),
  githubAvatar: text("github_avatar"),
  githubName: text("github_name"),
  githubCompany: text("github_company"),
  githubLocation: text("github_location"),
  githubBlog: text("github_blog"),
  githubTwitter: text("github_twitter"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Analytics - clics sur les liens
export const linkClicks = pgTable(
  "link_clicks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    linkId: uuid("link_id").references(() => treeLinks.id, {
      onDelete: "cascade",
    }),
    path: text("path").notNull(),
    targetUrl: text("target_url").notNull(),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    country: text("country"),
    sessionId: text("session_id"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_link_clicks_link_created").on(table.linkId, table.createdAt),
  ],
);

export type User = typeof users.$inferSelect;
export type Form = typeof forms.$inferSelect;
export type FormInsert = typeof forms.$inferInsert;
export type FormTemplate = typeof formTemplates.$inferSelect;
export type FormTemplateInsert = typeof formTemplates.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type LeadInsert = typeof leads.$inferInsert;
export type TreeLink = typeof treeLinks.$inferSelect;
export type TreeLinkInsert = typeof treeLinks.$inferInsert;
export type PageView = typeof pageViews.$inferSelect;
export type PageViewInsert = typeof pageViews.$inferInsert;
export type LinkClick = typeof linkClicks.$inferSelect;
export type LinkClickInsert = typeof linkClicks.$inferInsert;
export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type LoginAttemptInsert = typeof loginAttempts.$inferInsert;
