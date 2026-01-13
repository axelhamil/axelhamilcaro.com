CREATE TABLE "link_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"link_id" uuid,
	"path" text NOT NULL,
	"target_url" text NOT NULL,
	"referrer" text,
	"user_agent" text,
	"country" text,
	"session_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"path" text NOT NULL,
	"referrer" text,
	"user_agent" text,
	"country" text,
	"city" text,
	"device" text,
	"browser" text,
	"os" text,
	"session_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tree_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"description" text,
	"icon" text DEFAULT 'link' NOT NULL,
	"featured" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "link_clicks" ADD CONSTRAINT "link_clicks_link_id_tree_links_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."tree_links"("id") ON DELETE cascade ON UPDATE no action;