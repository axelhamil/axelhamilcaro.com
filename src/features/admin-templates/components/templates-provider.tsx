"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

export interface Template {
  id: string;
  name: string;
  title: string | null;
  badgeText: string | null;
  buttonText: string | null;
  createdAtFormatted: string;
}

interface TemplatesContextValue {
  templates: Template[];
  filteredTemplates: Template[];
  search: string;
  setSearch: (value: string) => void;
}

const TemplatesContext = createContext<TemplatesContextValue | null>(null);

export function TemplatesProvider({
  templates,
  children,
}: {
  templates: Template[];
  children: ReactNode;
}) {
  const [search, setSearch] = useState("");

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <TemplatesContext.Provider
      value={{ templates, filteredTemplates, search, setSearch }}
    >
      {children}
    </TemplatesContext.Provider>
  );
}

export function useTemplates() {
  const ctx = useContext(TemplatesContext);
  if (!ctx) {
    throw new Error("useTemplates must be used inside TemplatesProvider");
  }
  return ctx;
}
