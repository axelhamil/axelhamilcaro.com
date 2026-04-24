"use client";

import { motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";
import { iconOptions } from "@/src/features/admin-tree/components/tree-icon-options";
import { useTreeLinksContext } from "@/src/features/admin-tree/components/tree-links-provider";

export function TreeLinkEditor() {
  const {
    editingLink,
    setEditingLink,
    isCreating,
    isSaving,
    cancelEdit,
    handleSave,
  } = useTreeLinksContext();

  if (!editingLink && !isCreating) return null;

  return (
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
          <label
            htmlFor="tree-link-title"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Titre
          </label>
          <input
            id="tree-link-title"
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
          <label
            htmlFor="tree-link-url"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            URL
          </label>
          <input
            id="tree-link-url"
            value={editingLink?.url || ""}
            onChange={(e) =>
              setEditingLink((prev) => prev && { ...prev, url: e.target.value })
            }
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-[var(--admin-text)]"
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="tree-link-description"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Description
          </label>
          <input
            id="tree-link-description"
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
          <label
            htmlFor="tree-link-icon"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Icône
          </label>
          <select
            id="tree-link-icon"
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
              id="tree-link-featured"
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
              id="tree-link-active"
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
  );
}
