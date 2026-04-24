export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { formService } from "@/src/backend/forms/form.service";
import { templateService } from "@/src/backend/templates/template.service";
import { NotFoundError } from "@/src/core/errors/domain.error";
import { FormEditor } from "@/src/features/admin-forms/components/form-editor/form-editor";

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const [form, templates] = await Promise.all([
      formService.getById(id),
      templateService.list(),
    ]);

    return <FormEditor form={form} templates={templates} />;
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}
