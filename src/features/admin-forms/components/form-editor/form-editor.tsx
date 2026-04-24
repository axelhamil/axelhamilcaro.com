"use client";

import { FormEditorBody } from "./form-editor-body";
import { FormEditorHeader } from "./form-editor-header";
import {
  FormEditorProvider,
  useFormEditorContext,
} from "./form-editor-provider";
import type { FormEditorProps } from "./types";

function FormEditorInner() {
  const { handleSubmit } = useFormEditorContext();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormEditorHeader />
      <FormEditorBody />
    </form>
  );
}

export function FormEditor({ form, templates }: FormEditorProps) {
  return (
    <FormEditorProvider form={form} templates={templates}>
      <FormEditorInner />
    </FormEditorProvider>
  );
}
