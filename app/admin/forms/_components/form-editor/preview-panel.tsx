"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CSSProperties } from "react";
import type { FormData } from "./types";

interface PreviewPanelProps {
  formData: FormData;
  backgroundStyle: CSSProperties;
}

export function PreviewPanel({ formData, backgroundStyle }: PreviewPanelProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[var(--admin-text)]">Aperçu</h2>
      <div
        className="flex min-h-[500px] items-center justify-center rounded-xl border border-[var(--admin-border)] p-4"
        style={backgroundStyle}
      >
        <div className="w-full max-w-lg rounded-xl border bg-white/95 backdrop-blur-sm shadow-xl">
          <div className="flex gap-6 p-6">
            {formData.cardImage && (
              <div className="hidden w-32 shrink-0 md:block">
                <img
                  src={formData.cardImage}
                  alt=""
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              {formData.badgeText && (
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
                  style={{ backgroundColor: formData.badgeColor }}
                >
                  {formData.badgeText}
                </span>
              )}
              {formData.title && (
                <h1 className="text-2xl font-bold text-gray-900">
                  {formData.title}
                </h1>
              )}
              {formData.description && (
                <p className="text-sm text-gray-600">{formData.description}</p>
              )}
              <div className="space-y-3">
                <Input
                  placeholder="Prénom"
                  disabled
                  className="bg-gray-50 border-gray-200"
                />
                <Input
                  placeholder="Email"
                  disabled
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  className="w-full"
                  disabled
                  style={{ backgroundColor: formData.badgeColor }}
                >
                  {formData.buttonText || "Envoyer"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
