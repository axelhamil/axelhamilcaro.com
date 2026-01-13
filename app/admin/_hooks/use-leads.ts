import useSWR from "swr";
import { fetcher } from "../_lib/swr-config";

export type LeadStatus = "new" | "contacted" | "qualified" | "converted";

export interface Lead {
  id: string;
  firstName: string | null;
  email: string;
  status: LeadStatus | null;
  notes: string | null;
  score: number | null;
  source: string | null;
  formId: string;
  formTitle: string;
  formSlug: string;
  createdAtFormatted: string;
}

interface Form {
  id: string;
  title: string;
}

interface LeadsResponse {
  leads: Lead[];
  forms: Form[];
}

export function useLeads(formId?: string) {
  const url = formId ? `/api/leads?formId=${formId}` : "/api/leads";

  const { data, error, isLoading, mutate } = useSWR<LeadsResponse>(
    url,
    fetcher,
  );

  const deleteLead = async (leadId: string) => {
    if (!data) return;

    const optimisticData: LeadsResponse = {
      ...data,
      leads: data.leads.filter((lead) => lead.id !== leadId),
    };

    await mutate(
      async () => {
        const res = await fetch(`/api/leads?id=${leadId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete lead");
        return optimisticData;
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const updateLead = async (
    leadId: string,
    updates: { status?: LeadStatus; notes?: string },
  ) => {
    if (!data) return;

    const optimisticData: LeadsResponse = {
      ...data,
      leads: data.leads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updates } : lead,
      ),
    };

    await mutate(
      async () => {
        const res = await fetch(`/api/leads?id=${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Failed to update lead");
        return optimisticData;
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  return {
    leads: data?.leads ?? [],
    forms: data?.forms ?? [],
    isLoading,
    error,
    deleteLead,
    updateLead,
    refresh: () => mutate(),
  };
}
