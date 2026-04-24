import useSWR from "swr";
import type { TreeLink } from "@/drizzle/schema";
import { fetcher } from "@/src/shared/api/swr-config";

interface EditingLink {
  id?: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  featured: boolean;
  isActive: boolean;
}

export function useTreeLinks() {
  const { data, error, isLoading, mutate } = useSWR<TreeLink[]>(
    "/api/tree-links",
    fetcher,
  );

  const createLink = async (link: EditingLink) => {
    const tempId = `temp-${Date.now()}`;
    const tempLink: TreeLink = {
      id: tempId,
      title: link.title,
      url: link.url,
      description: link.description || null,
      icon: link.icon,
      featured: link.featured,
      isActive: link.isActive,
      order: (data?.length ?? 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const optimisticData = [...(data ?? []), tempLink];

    await mutate(
      async () => {
        const res = await fetch("/api/tree-links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(link),
        });
        if (!res.ok) throw new Error("Failed to create link");
        const newLink = await res.json();
        return [...(data ?? []).filter((l) => l.id !== tempId), newLink];
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const updateLink = async (id: string, updates: EditingLink) => {
    if (!data) return;

    const optimisticData = data.map((link) =>
      link.id === id ? { ...link, ...updates, updatedAt: new Date() } : link,
    );

    await mutate(
      async () => {
        const res = await fetch(`/api/tree-links/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });
        if (!res.ok) throw new Error("Failed to update link");
        return optimisticData;
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const deleteLink = async (id: string) => {
    if (!data) return;

    const optimisticData = data.filter((link) => link.id !== id);

    await mutate(
      async () => {
        const res = await fetch(`/api/tree-links/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete link");
        return optimisticData;
      },
      {
        optimisticData,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  const reorderLinks = async (newOrder: TreeLink[]) => {
    await mutate(
      async () => {
        const res = await fetch("/api/tree-links/reorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds: newOrder.map((l) => l.id) }),
        });
        if (!res.ok) throw new Error("Failed to reorder links");
        return newOrder;
      },
      {
        optimisticData: newOrder,
        rollbackOnError: true,
        revalidate: false,
      },
    );
  };

  return {
    links: data ?? [],
    isLoading,
    error,
    createLink,
    updateLink,
    deleteLink,
    reorderLinks,
    refresh: () => mutate(),
  };
}
