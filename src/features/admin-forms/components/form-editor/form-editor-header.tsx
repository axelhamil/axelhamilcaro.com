"use client";

import { motion } from "framer-motion";
import { Loader2, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useFormEditorContext } from "./form-editor-provider";

export function FormEditorHeader() {
  const {
    isEditing,
    isSaving,
    formData,
    templates,
    handleChange,
    loadTemplate,
  } = useFormEditorContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            {isEditing ? "Modifier le formulaire" : "Nouveau formulaire"}
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            {isEditing
              ? "Modifie les paramètres de ton formulaire"
              : "Crée un nouveau formulaire de capture"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <Label
              htmlFor="isActive"
              className="text-sm text-[var(--admin-text)]"
            >
              Actif
            </Label>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Enregistrer
              </>
            )}
          </button>
        </div>
      </motion.div>

      {templates.length > 0 && !isEditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <Label className="text-sm font-medium text-[var(--admin-text)]">
            Charger un template
          </Label>
          <Select onValueChange={loadTemplate}>
            <SelectTrigger className="mt-2 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]">
              <SelectValue placeholder="Sélectionne un template" />
            </SelectTrigger>
            <SelectContent className="border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      )}
    </>
  );
}
