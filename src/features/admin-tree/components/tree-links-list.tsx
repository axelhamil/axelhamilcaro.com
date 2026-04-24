"use client";

import { Reorder } from "framer-motion";
import {
  ExternalLink,
  GripVertical,
  Loader2,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { getIconComponent } from "@/src/features/admin-tree/components/tree-icon-options";
import { useTreeLinksContext } from "@/src/features/admin-tree/components/tree-links-provider";

export function TreeLinksList() {
  const {
    links,
    isLoading,
    isCreating,
    deletingId,
    startEdit,
    handleDelete,
    handleReorder,
  } = useTreeLinksContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (links.length === 0 && !isCreating) {
    return (
      <div className="text-center py-12 text-[var(--admin-text-muted)]">
        Aucun lien. Clique sur "Nouveau lien" pour commencer.
      </div>
    );
  }

  return (
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
            <div
              className="flex items-center gap-1 shrink-0"
              onPointerDownCapture={(e) => e.stopPropagation()}
            >
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
  );
}
