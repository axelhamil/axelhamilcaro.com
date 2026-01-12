export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { formTemplates } from "@/app/_lib/db/schema";
import { desc } from "drizzle-orm";
import { FormEditor } from "../_components/form-editor";

async function getTemplates() {
  return db.select().from(formTemplates).orderBy(desc(formTemplates.createdAt));
}

export default async function NewFormPage() {
  const templates = await getTemplates();

  return <FormEditor templates={templates} />;
}
