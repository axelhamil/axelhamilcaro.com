"use client";

import { motion, Reorder } from "framer-motion";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  Github,
  Globe,
  GripVertical,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Loader2,
  Mail,
  Music2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTreeLinks } from "@/app/_hooks/swr";

const iconOptions = [
  { value: "link", label: "Lien", icon: LinkIcon },
  { value: "calendar", label: "Calendrier", icon: Calendar },
  { value: "github", label: "GitHub", icon: Github },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "briefcase", label: "Travail", icon: Briefcase },
  { value: "globe", label: "Web", icon: Globe },
  { value: "mail", label: "Email", icon: Mail },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "tiktok", label: "TikTok", icon: Music2 },
];

function getIconComponent(iconName: string) {
  const found = iconOptions.find((opt) => opt.value === iconName);
  return found?.icon || LinkIcon;
}

interface EditingLink {
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

export function TreeLinksClient() {
  const { links, isLoading, createLink, updateLink, deleteLink, reorderLinks } =
    useTreeLinks();
  const [editingLink, setEditingLink] = useState<EditingLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleReorder = async (newOrder: typeof links) => {
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

  const startEdit = (link: (typeof links)[0]) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            Liens Tree
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Gère les liens de ta page /tree
          </p>
        </div>
        <button
          type="button"
          onClick={startCreate}
          className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)]"
        >
          <Plus className="h-4 w-4" />
          Nouveau lien
        </button>
      </motion.div>

      {(editingLink || isCreating) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-[var(--admin-text)]">
              {isCreating ? "Nouveau lien" : "Modifier le lien"}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--admin-text)]">
                Titre
              </label>
              <input
                value={editingLink?.title || ""}
                onChange={(e) =>
                  setEditingLink(
                    (prev) => prev && { ...prev, title: e.target.value },
                  )
                }
                className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-[var(--admin-text)]"
                placeholder="Prendre rendez-vous"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--admin-text)]">
                URL
              </label>
              <input
                value={editingLink?.url || ""}
                onChange={(e) =>
                  setEditingLink(
                    (prev) => prev && { ...prev, url: e.target.value },
                  )
                }
                className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-[var(--admin-text)]"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-[var(--admin-text)]">
                Description
              </label>
              <input
                value={editingLink?.description || ""}
                onChange={(e) =>
                  setEditingLink(
                    (prev) => prev && { ...prev, description: e.target.value },
                  )
                }
                className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-[var(--admin-text)]"
                placeholder="30 min pour discuter..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--admin-text)]">
                Icône
              </label>
              <select
                value={editingLink?.icon || "link"}
                onChange={(e) =>
                  setEditingLink(
                    (prev) => prev && { ...prev, icon: e.target.value },
                  )
                }
                className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-[var(--admin-text)]"
              >
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingLink?.featured || false}
                  onChange={(e) =>
                    setEditingLink(
                      (prev) => prev && { ...prev, featured: e.target.checked },
                    )
                  }
                  className="rounded border-[var(--admin-border)]"
                />
                <span className="text-sm text-[var(--admin-text)]">
                  Mis en avant
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingLink?.isActive ?? true}
                  onChange={(e) =>
                    setEditingLink(
                      (prev) => prev && { ...prev, isActive: e.target.checked },
                    )
                  }
                  className="rounded border-[var(--admin-border)]"
                />
                <span className="text-sm text-[var(--admin-text)]">Actif</span>
              </label>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
        </motion.div>
      )}

      <Reorder.Group
        axis="y"
        values={links}
        onReorder={handleReorder}
        className="space-y-2"
      >
        {links.map((link) => {
          const IconComponent = getIconComponent(link.icon);
          return (
            <Reorder.Item
              key={link.id}
              value={link}
              className="flex items-center gap-3 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-3 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5 text-[var(--admin-text-subtle)] shrink-0" />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-bg-elevated)] shrink-0">
                <IconComponent className="h-5 w-5 text-[var(--admin-accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--admin-text)] truncate">
                    {link.title}
                  </span>
                  {link.featured && (
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" />
                  )}
                  {!link.isActive && (
                    <span className="text-xs text-[var(--admin-text-subtle)] bg-[var(--admin-bg-elevated)] px-2 py-0.5 rounded">
                      Inactif
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--admin-text-muted)] truncate">
                  {link.url}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => startEdit(link)}
                  className="p-2 text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)]"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(link.id)}
                  disabled={deletingId === link.id}
                  className="p-2 text-[var(--admin-text-muted)] hover:text-red-500"
                >
                  {deletingId === link.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {links.length === 0 && !isCreating && (
        <div className="text-center py-12 text-[var(--admin-text-muted)]">
          Aucun lien. Clique sur "Nouveau lien" pour commencer.
        </div>
      )}
    </div>
  );
}
