"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "sonner";
import { useTreeLinks } from "@/src/entities/tree-link/api";

type TreeLink = ReturnType<typeof useTreeLinks>["links"][number];

export interface EditingLink {
  id?: string;
  title: string;
  url: string;
  description: string;
  icon: string;
  featured: boolean;
  isActive: boolean;
}

const defaultLink: EditingLink = {
  title: "",
  url: "",
  description: "",
  icon: "link",
  featured: false,
  isActive: true,
};

interface TreeLinksContextValue {
  links: TreeLink[];
  isLoading: boolean;
  editingLink: EditingLink | null;
  setEditingLink: Dispatch<SetStateAction<EditingLink | null>>;
  isCreating: boolean;
  isSaving: boolean;
  deletingId: string | null;
  startCreate: () => void;
  startEdit: (link: TreeLink) => void;
  cancelEdit: () => void;
  handleSave: () => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  handleReorder: (newOrder: TreeLink[]) => Promise<void>;
}

const TreeLinksContext = createContext<TreeLinksContextValue | null>(null);

export function TreeLinksProvider({ children }: { children: ReactNode }) {
  const { links, isLoading, createLink, updateLink, deleteLink, reorderLinks } =
    useTreeLinks();

  const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleReorder = async (newOrder: TreeLink[]) => {
    await reorderLinks(newOrder);
  };

  const handleSave = async () => {
    if (!editingLink) return;
    if (!editingLink.title.trim() || !editingLink.url.trim()) {
      toast.error("Titre et URL requis");
      return;
    }
    setIsSaving(true);
    try {
      if (editingLink.id) {
        await updateLink(editingLink.id, editingLink);
        toast.success("Lien mis à jour");
      } else {
        await createLink(editingLink);
        toast.success("Lien créé");
      }
      setEditingLink(null);
      setIsCreating(false);
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteLink(id);
      toast.success("Lien supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (link: TreeLink) => {
    setEditingLink({
      id: link.id,
      title: link.title,
      url: link.url,
      description: link.description || "",
      icon: link.icon,
      featured: link.featured || false,
      isActive: link.isActive ?? true,
    });
    setIsCreating(false);
  };

  const startCreate = () => {
    setEditingLink(defaultLink);
    setIsCreating(true);
  };

  const cancelEdit = () => {
    setEditingLink(null);
    setIsCreating(false);
  };

  return (
    <TreeLinksContext.Provider
      value={{
        links,
        isLoading,
        editingLink,
        setEditingLink,
        isCreating,
        isSaving,
        deletingId,
        startCreate,
        startEdit,
        cancelEdit,
        handleSave,
        handleDelete,
        handleReorder,
      }}
    >
      {children}
    </TreeLinksContext.Provider>
  );
}

export function useTreeLinksContext() {
  const ctx = useContext(TreeLinksContext);
  if (!ctx) {
    throw new Error(
      "useTreeLinksContext must be used inside TreeLinksProvider",
    );
  }
  return ctx;
}
