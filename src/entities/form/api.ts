import useSWR from "swr";
import { fetcher } from "@/src/shared/api/swr-config";

interface Form {
  id: string;
  slug: string;
  title: string;
  isActive: boolean | null;
  leadsCount: number;
  createdAtFormatted: string;
}

export function useForms() {
  const { data, error, isLoading, mutate } = useSWR<Form[]>(
    "/api/forms",
    fetcher,
  );

  const deleteForm = async (formId: string) => {
    if (!data) return;

    const optimisticData = data.filter((form) => form.id !== formId);

    await mutate(
      async () => {
        const res = await fetch(`/api/forms/${formId}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete form");
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
    forms: data ?? [],
    isLoading,
    error,
    deleteForm,
    refresh: () => mutate(),
  };
}
