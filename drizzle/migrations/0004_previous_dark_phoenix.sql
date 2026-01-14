ALTER TABLE "leads" ADD COLUMN "score" integer DEFAULT 50;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "source" text;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "status" text DEFAULT 'new';--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "page_views" ADD COLUMN "duration_ms" integer;--> statement-breakpoint
ALTER TABLE "page_views" ADD COLUMN "is_bounce" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "page_views" ADD COLUMN "utm_source" text;--> statement-breakpoint
ALTER TABLE "page_views" ADD COLUMN "utm_medium" text;--> statement-breakpoint
ALTER TABLE "page_views" ADD COLUMN "utm_campaign" text;