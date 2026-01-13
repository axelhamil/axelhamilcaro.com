"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import type { FormData } from "./types";

interface ContentTabProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
  slugError: string | null;
}

export function ContentTab({ formData, onChange, slugError }: ContentTabProps) {
  const isSlugValid = formData.slug && !slugError;

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
              value={formData.slug}
              onChange={(e) => onChange("slug", e.target.value)}
              placeholder="mon-formulaire"
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
        {isSlugValid && (
          <p className="text-xs text-green-600">URL : /f/{formData.slug}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="cardImage"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Image de la carte (URL)
        </Label>
        <Input
          id="cardImage"
          value={formData.cardImage}
          onChange={(e) => onChange("cardImage", e.target.value)}
          placeholder="https://..."
          className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="badgeText"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Badge
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
            htmlFor="badgeColor"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Couleur du badge
          </Label>
          <div className="flex gap-2">
            <Input
              type="color"
              id="badgeColor"
              value={formData.badgeColor}
              onChange={(e) => onChange("badgeColor", e.target.value)}
              className="h-10 w-14 cursor-pointer border-[var(--admin-border)] bg-[var(--admin-bg)] p-1"
            />
            <Input
              value={formData.badgeColor}
              onChange={(e) => onChange("badgeColor", e.target.value)}
              placeholder="#ff4d00"
              className="flex-1 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
            />
          </div>
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

      <div className="space-y-2">
        <Label
          htmlFor="buttonText"
          className="text-sm font-medium text-[var(--admin-text)]"
        >
          Texte du bouton
        </Label>
        <Input
          id="buttonText"
          value={formData.buttonText}
          onChange={(e) => onChange("buttonText", e.target.value)}
          placeholder="Envoyer"
          required
          className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
        />
      </div>
    </div>
  );
}
