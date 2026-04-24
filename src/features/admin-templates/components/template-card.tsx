"use client";

import { motion } from "framer-motion";
import { FileCode } from "lucide-react";
import { DeleteTemplateButton } from "@/src/features/admin-templates/components/delete-template-button";
import type { Template } from "@/src/features/admin-templates/components/templates-provider";

const item = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export function TemplateCard({ template }: { template: Template }) {
  return (
    <motion.div
      variants={item}
      className="group relative overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5 transition-all hover:border-[var(--admin-border-hover)] hover:shadow-lg hover:shadow-black/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--admin-accent)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-bg-elevated)]">
              <FileCode className="h-5 w-5 text-[var(--admin-accent)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--admin-text)]">
                {template.name}
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">
                {template.createdAtFormatted}
              </p>
            </div>
          </div>
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <DeleteTemplateButton templateId={template.id} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {template.title && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Titre:</span>
              <span className="text-[var(--admin-text)]">{template.title}</span>
            </div>
          )}
          {template.badgeText && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Badge:</span>
              <span className="admin-badge admin-badge-accent">
                {template.badgeText}
              </span>
            </div>
          )}
          {template.buttonText && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Bouton:</span>
              <span className="rounded bg-[var(--admin-bg-elevated)] px-2 py-0.5 text-xs text-[var(--admin-text)]">
                {template.buttonText}
              </span>
            </div>
          )}
          {!template.title && !template.badgeText && !template.buttonText && (
            <p className="text-sm text-[var(--admin-text-subtle)]">
              Configuration vide
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
