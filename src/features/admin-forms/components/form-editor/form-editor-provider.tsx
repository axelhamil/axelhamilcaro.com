"use client";

import { createContext, type ReactNode, useContext } from "react";
import { useFormEditor } from "./hooks/use-form-editor";
import type { FormEditorProps } from "./types";

type FormEditorContextValue = ReturnType<typeof useFormEditor>;

const FormEditorContext = createContext<FormEditorContextValue | null>(null);

interface FormEditorProviderProps extends FormEditorProps {
  children: ReactNode;
}

export function FormEditorProvider({
  form,
  templates = [],
  children,
}: FormEditorProviderProps) {
  const value = useFormEditor(form, templates);

  return (
    <FormEditorContext.Provider value={value}>
      {children}
    </FormEditorContext.Provider>
  );
}

export function useFormEditorContext(): FormEditorContextValue {
  const ctx = useContext(FormEditorContext);
  if (!ctx) {
    throw new Error(
      "useFormEditorContext must be used inside FormEditorProvider",
    );
  }
  return ctx;
}
