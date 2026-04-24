"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { type Lead, useLeads } from "@/src/entities/lead/api";

interface Form {
  id: string;
  title: string;
}

interface LeadsContextValue {
  leads: Lead[];
  filteredLeads: Lead[];
  forms: Form[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  currentFormId: string | undefined;
  currentForm: Form | undefined;
  handleFilterChange: (formId: string) => void;
  clearFilter: () => void;
  updateLead: ReturnType<typeof useLeads>["updateLead"];
  deleteLead: ReturnType<typeof useLeads>["deleteLead"];
}

const LeadsContext = createContext<LeadsContextValue | null>(null);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFormId = searchParams.get("formId") || undefined;

  const { leads, forms, isLoading, deleteLead, updateLead } =
    useLeads(currentFormId);
  const [search, setSearch] = useState("");

  const filteredLeads = useMemo(
    () =>
      leads.filter(
        (lead) =>
          (lead.firstName?.toLowerCase() || "").includes(
            search.toLowerCase(),
          ) || lead.email.toLowerCase().includes(search.toLowerCase()),
      ),
    [leads, search],
  );

  const handleFilterChange = (formId: string) => {
    if (formId === "all") {
      router.push("/admin/leads");
    } else {
      router.push(`/admin/leads?formId=${formId}`);
    }
  };

  const clearFilter = () => router.push("/admin/leads");

  const currentForm = forms.find((f) => f.id === currentFormId);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        filteredLeads,
        forms,
        isLoading,
        search,
        setSearch,
        currentFormId,
        currentForm,
        handleFilterChange,
        clearFilter,
        updateLead,
        deleteLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeadsContext() {
  const ctx = useContext(LeadsContext);
  if (!ctx) {
    throw new Error("useLeadsContext must be used inside LeadsProvider");
  }
  return ctx;
}
