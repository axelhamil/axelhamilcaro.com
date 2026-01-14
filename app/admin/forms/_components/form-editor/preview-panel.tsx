"use client";

import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import type { FormData } from "./types";

interface PreviewPanelProps {
  formData: FormData;
  backgroundStyle: CSSProperties;
}

export function PreviewPanel({ formData, backgroundStyle }: PreviewPanelProps) {
  const accentColor = formData.badgeColor || "#ff4d00";
  const hasLargeImage = !!formData.cardImage;

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-[var(--admin-text)]">Aperçu</h2>
      <div
        className="flex min-h-[500px] items-center justify-center rounded-xl border border-[var(--admin-border)] p-4"
        style={backgroundStyle}
      >
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div
              className={`${hasLargeImage ? "flex flex-col md:flex-row" : ""}`}
            >
              {hasLargeImage && (
                <div className="md:w-2/5 shrink-0">
                  <div className="h-48 md:h-full">
                    <img
                      src={formData.cardImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex-1">
                <div
                  className="h-1.5"
                  style={{ backgroundColor: accentColor }}
                />

                <div className="p-6">
                  <div className="mb-6">
                    {formData.badgeText && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-3 ${
                          formData.badgeStyle === "outline"
                            ? "bg-transparent border-2"
                            : "text-white border-2 border-transparent"
                        }`}
                        style={{
                          ...(formData.badgeStyle === "outline"
                            ? { borderColor: accentColor, color: accentColor }
                            : { backgroundColor: accentColor }),
                        }}
                      >
                        {formData.badgeText}
                      </span>
                    )}

                    {formData.title && (
                      <h1 className="text-xl font-bold text-gray-900 mb-2">
                        {formData.title}
                      </h1>
                    )}

                    {formData.description && (
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {formData.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Prénom"
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      disabled
                      className="w-full py-3.5 rounded-xl font-semibold text-white flex flex-col items-center justify-center gap-0.5 disabled:opacity-70"
                      style={{ backgroundColor: accentColor }}
                    >
                      <span className="flex items-center gap-2">
                        {formData.buttonText || "Envoyer"}
                        {!formData.buttonSubtext && (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </span>
                      {formData.buttonSubtext && (
                        <span className="text-sm opacity-80">
                          {formData.buttonSubtext}
                        </span>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 text-center text-xs text-gray-400">
                    Tes données restent confidentielles
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
