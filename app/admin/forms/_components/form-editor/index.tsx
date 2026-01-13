"use client";

import type { Form, FormTemplate } from "@/app/_lib/db/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { FileText, Loader2, Palette, Save } from "lucide-react";
import { BackgroundTab } from "./background-tab";
import { ContentTab } from "./content-tab";
import { useFormEditor } from "./hooks/use-form-editor";
import { PreviewPanel } from "./preview-panel";

interface FormEditorProps {
  form?: Form;
  templates?: FormTemplate[];
}

export function FormEditor({ form, templates = [] }: FormEditorProps) {
  const {
    formData,
    isEditing,
    isSaving,
    isSavingTemplate,
    templateName,
    gradientMode,
    gradientConfig,
    slugError,
    setTemplateName,
    setGradientMode,
    handleChange,
    handleGradientConfigChange,
    handleGradientCssChange,
    loadTemplate,
    handleSaveTemplate,
    handleSubmit,
    getBackgroundStyle,
  } = useFormEditor(form, templates);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[var(--admin-bg-subtle)] border border-[var(--admin-border)] rounded-lg p-1">
              <TabsTrigger
                value="content"
                className="flex items-center gap-2 rounded-md data-[state=active]:bg-[var(--admin-bg-elevated)] data-[state=active]:text-[var(--admin-text)] text-[var(--admin-text-muted)]"
              >
                <FileText className="h-4 w-4" />
                Contenu
              </TabsTrigger>
              <TabsTrigger
                value="background"
                className="flex items-center gap-2 rounded-md data-[state=active]:bg-[var(--admin-bg-elevated)] data-[state=active]:text-[var(--admin-text)] text-[var(--admin-text-muted)]"
              >
                <Palette className="h-4 w-4" />
                Fond
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="content"
              className="mt-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
            >
              <ContentTab
                formData={formData}
                onChange={handleChange}
                slugError={slugError}
              />
            </TabsContent>

            <TabsContent
              value="background"
              className="mt-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
            >
              <BackgroundTab
                formData={formData}
                gradientMode={gradientMode}
                gradientConfig={gradientConfig}
                onChange={handleChange}
                onGradientModeChange={setGradientMode}
                onGradientConfigChange={handleGradientConfigChange}
                onGradientCssChange={handleGradientCssChange}
              />
            </TabsContent>
          </Tabs>

          <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4">
            <Label className="text-sm font-medium text-[var(--admin-text)]">
              Sauvegarder comme template
            </Label>
            <div className="mt-2 flex gap-2">
              <Input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Nom du template"
                className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)]"
              />
              <button
                type="button"
                onClick={handleSaveTemplate}
                disabled={!templateName.trim() || isSavingTemplate}
                className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 py-2 text-sm font-medium text-[var(--admin-text-muted)] transition-colors hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSavingTemplate ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sauvegarder"
                )}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PreviewPanel
            formData={formData}
            backgroundStyle={getBackgroundStyle()}
          />
        </motion.div>
      </div>
    </form>
  );
}
