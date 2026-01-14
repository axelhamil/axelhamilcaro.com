export const dynamic = "force-dynamic";

import { templateService } from "@/src/features/templates/template.service";
import { FormEditor } from "../_components/form-editor";

export default async function NewFormPage() {
  const templates = await templateService.list();

  return <FormEditor templates={templates} />;
}
