import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/_lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
