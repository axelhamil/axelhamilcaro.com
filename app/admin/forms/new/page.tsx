export const dynamic = "force-dynamic";

import { templateService } from "@/src/backend/templates/template.service";
import { FormEditor } from "@/src/features/admin-forms/components/form-editor/form-editor";

export default async function NewFormPage() {
  const templates = await templateService.list();

  return <FormEditor templates={templates} />;
}
