"use client";

import { FileText, Loader2, Mail, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackgroundTab } from "./background-tab";
import { ContentTab } from "./content-tab";
import { EmailTab } from "./email-tab";
import { useFormEditorContext } from "./form-editor-provider";

export function FormEditorTabs() {
  const {
    formData,
    slugInput,
    computedSlug,
    slugError,
    gradientMode,
    gradientConfig,
    templateName,
    isSavingTemplate,
    handleChange,
    handleSlugInputChange,
    setGradientMode,
    handleGradientConfigChange,
    handleGradientCssChange,
    setTemplateName,
    handleSaveTemplate,
  } = useFormEditorContext();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[var(--admin-bg-subtle)] border border-[var(--admin-border)] rounded-lg p-1">
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
          <TabsTrigger
            value="email"
            className="flex items-center gap-2 rounded-md data-[state=active]:bg-[var(--admin-bg-elevated)] data-[state=active]:text-[var(--admin-text)] text-[var(--admin-text-muted)]"
          >
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="content"
          className="mt-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <ContentTab
            formData={formData}
            slugInput={slugInput}
            computedSlug={computedSlug}
            onChange={handleChange}
            onSlugInputChange={handleSlugInputChange}
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

        <TabsContent
          value="email"
          className="mt-4 rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <EmailTab formData={formData} onChange={handleChange} />
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
    </div>
  );
}
