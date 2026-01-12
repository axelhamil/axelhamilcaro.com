ALTER TABLE "forms" ADD COLUMN "badge_color" text DEFAULT '#ff4d00';--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "email_subject";--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "email_body";--> statement-breakpoint
ALTER TABLE "forms" DROP COLUMN "email_to";