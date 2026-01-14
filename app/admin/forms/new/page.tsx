export const dynamic = "force-dynamic";

import { desc } from "drizzle-orm";
import { db } from "@/drizzle";
import { formTemplates } from "@/drizzle/schema";
import { FormEditor } from "../_components/form-editor";

async function getTemplates() {
  return db.select().from(formTemplates).orderBy(desc(formTemplates.createdAt));
}

export default async function NewFormPage() {
  const templates = await getTemplates();

  return <FormEditor templates={templates} />;
}
