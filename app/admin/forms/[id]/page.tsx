export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { NotFoundError } from "@/src/core/errors/domain.error";
import { formService } from "@/src/features/forms/form.service";
import { templateService } from "@/src/features/templates/template.service";
import { FormEditor } from "../_components/form-editor";

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
