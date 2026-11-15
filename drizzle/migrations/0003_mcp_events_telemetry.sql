ALTER TABLE "mcp_events" ALTER COLUMN "ok" SET DEFAULT true;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "session_id" text;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "visitor_hash" text;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "tool_arguments" jsonb;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "error_message" text;--> statement-breakpoint
ALTER TABLE "mcp_events" ADD COLUMN "referer" text;