"use client";

import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "./color-picker";
import { ImageUpload } from "./image-upload";
import type { BadgeStyle, FormData } from "./types";

interface ContentTabProps {
  formData: FormData;
  slugInput: string;
  computedSlug: string;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  onSlugInputChange: (value: string) => void;
  slugError: string | null;
}

export function ContentTab({
  formData,
  slugInput,
  computedSlug,
  onChange,
  onSlugInputChange,
  slugError,
}: ContentTabProps) {
  const isSlugValid = computedSlug && !slugError;
  const showSlugPreview = slugInput && slugInput !== computedSlug;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="slug"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Slug (URL)
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--admin-text-muted)]">/f/</span>
          <div className="relative flex-1">
            <Input
              id="slug"
              value={slugInput}
              onChange={(e) => onSlugInputChange(e.target.value)}
              placeholder="Mon Super Formulaire !"
              required
              className={`pr-10 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)] ${
                slugError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : ""
              } ${isSlugValid ? "border-green-500 focus:border-green-500 focus:ring-green-500/20" : ""}`}
            />
            {isSlugValid && (
              <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
            )}
            {slugError && (
              <AlertCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
            )}
          </div>
        </div>
        {slugError && <p className="text-xs text-red-500">{slugError}</p>}
        {showSlugPreview && !slugError && (
          <div className="flex items-center gap-2 text-xs text-[var(--admin-text-muted)]">
            <span className="opacity-60">{slugInput}</span>
            <ArrowRight className="h-3 w-3" />
            <code className="rounded bg-[var(--admin-bg-elevated)] px-1.5 py-0.5 font-mono text-[var(--admin-accent)]">
              {computedSlug}
            </code>
          </div>
        )}
        {isSlugValid && (
          <p className="text-xs text-green-600">
            URL finale : <span className="font-mono">/f/{computedSlug}</span>
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="cardImage"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Image de la carte
        </Label>
        <ImageUpload
          id="cardImage"
          value={formData.cardImage}
          onChange={(url) => onChange("cardImage", url)}
        />
      </div>

      <div className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-elevated)] p-4">
        <Label className="text-sm font-medium text-[var(--admin-text)]">
          Badge
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="badgeText"
              className="text-xs text-[var(--admin-text-muted)]"
            >
              Texte
            </Label>
            <Input
              id="badgeText"
              value={formData.badgeText}
              onChange={(e) => onChange("badgeText", e.target.value)}
              placeholder="Offre limitée"
              className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="badgeStyle"
              className="text-xs text-[var(--admin-text-muted)]"
            >
              Style
            </Label>
            <Select
              value={formData.badgeStyle}
              onValueChange={(value: BadgeStyle) =>
                onChange("badgeStyle", value)
              }
            >
              <SelectTrigger
                id="badgeStyle"
                className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
                <SelectItem value="filled">Rempli</SelectItem>
                <SelectItem value="outline">Contour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="badgeColor"
            className="text-xs text-[var(--admin-text-muted)]"
          >
            Couleur
          </Label>
          <ColorPicker
            id="badgeColor"
            value={formData.badgeColor}
            onChange={(value) => onChange("badgeColor", value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="title"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Titre
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="Inscris-toi maintenant"
          required
          className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Description
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Reçois les dernières actualités..."
          rows={3}
          className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
        />
      </div>

      <div className="space-y-4 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-elevated)] p-4">
        <Label className="text-sm font-medium text-[var(--admin-text)]">
          Bouton
        </Label>
        <div className="space-y-2">
          <Label
            htmlFor="buttonText"
            className="text-xs text-[var(--admin-text-muted)]"
          >
            Texte principal
          </Label>
          <Input
            id="buttonText"
            value={formData.buttonText}
            onChange={(e) => onChange("buttonText", e.target.value)}
            placeholder="Je veux recevoir les ressources"
            required
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="buttonSubtext"
            className="text-xs text-[var(--admin-text-muted)]"
          >
            Sous-texte (optionnel)
          </Label>
          <Input
            id="buttonSubtext"
            value={formData.buttonSubtext}
            onChange={(e) => onChange("buttonSubtext", e.target.value)}
            placeholder="(Profites-en pendant que c'est gratuit)"
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
          />
        </div>
      </div>
    </div>
  );
}
