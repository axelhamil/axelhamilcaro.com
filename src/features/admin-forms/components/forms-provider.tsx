"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useForms } from "@/src/entities/form/api";

type Form = ReturnType<typeof useForms>["forms"][number];

interface FormsContextValue {
  forms: Form[];
  filteredForms: Form[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  deleteForm: (id: string) => Promise<void>;
}

const FormsContext = createContext<FormsContextValue | null>(null);

export function FormsProvider({ children }: { children: ReactNode }) {
  const { forms, isLoading, deleteForm } = useForms();
  const [search, setSearch] = useState("");

  const filteredForms = useMemo(
    () =>
      forms.filter(
        (form) =>
          form.title.toLowerCase().includes(search.toLowerCase()) ||
          form.slug.toLowerCase().includes(search.toLowerCase()),
      ),
    [forms, search],
  );

  return (
    <FormsContext.Provider
      value={{ forms, filteredForms, isLoading, search, setSearch, deleteForm }}
    >
      {children}
    </FormsContext.Provider>
  );
}

export function useFormsContext() {
  const ctx = useContext(FormsContext);
  if (!ctx) {
    throw new Error("useFormsContext must be used inside FormsProvider");
  }
  return ctx;
}
