CREATE TABLE "mcp_briefs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payload" jsonb NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "mcp_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" text NOT NULL,
	"name" text,
	"client_name" text,
	"client_version" text,
	"user_agent" text,
	"ok" boolean DEFAULT true NOT NULL,
	"duration_ms" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX "idx_mcp_events_created_at" ON "mcp_events" USING btree ("created_at");
