"use client";

import { Eye, FileText, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormData } from "./types";

interface EmailTabProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string | boolean) => void;
}

function EmailPreview({ formData }: { formData: FormData }) {
  const previewFirstName = "Thomas";
  const parsedBody = formData.emailBody.replace(
    /\{\{firstName\}\}/g,
    previewFirstName,
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        <Eye className="h-4 w-4 text-[var(--admin-accent)]" />
        <span className="text-sm font-medium text-[var(--admin-text)]">
          Aperçu
        </span>
      </div>

      <div className="flex-1 rounded-lg border border-[var(--admin-border)] bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-xs text-gray-500">
            De: Axel Hamilcaro &lt;contact@axelhamilcaro.com&gt;
          </p>
          <p className="text-xs text-gray-500">
            À: {previewFirstName.toLowerCase()}@exemple.com
          </p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {formData.emailSubject
              ? formData.emailSubject.replace(
                  /\{\{firstName\}\}/g,
                  previewFirstName,
                )
              : "Sujet de l'email..."}
          </p>
        </div>

        <div className="p-6" style={{ fontFamily: "system-ui, sans-serif" }}>
          <div
            style={{
              maxWidth: "480px",
              margin: "0 auto",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                borderBottom: "3px solid #ff4d00",
                paddingBottom: "16px",
                marginBottom: "24px",
              }}
            >
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#0a0a0a",
                  margin: 0,
                  letterSpacing: "-0.025em",
                }}
              >
                Salut {previewFirstName} 👋
              </h1>
            </div>

            <div
              style={{
                fontSize: "15px",
                lineHeight: "1.7",
                color: "#374151",
                whiteSpace: "pre-wrap",
              }}
            >
              {parsedBody || (
                <span className="text-gray-400 italic">
                  Le contenu de ton email apparaîtra ici...
                </span>
              )}
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                marginTop: "32px",
                paddingTop: "24px",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  color: "#9ca3af",
                  margin: 0,
                }}
              >
                Axel Hamilcaro
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#d1d5db",
                  margin: "4px 0 0 0",
                }}
              >
                axelhamilcaro.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmailTab({ formData, onChange }: EmailTabProps) {
  const hasEmailConfig = formData.emailSubject && formData.emailBody;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="space-y-5">
        <div className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-elevated)] p-4">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-[var(--admin-accent)]" />
            <div>
              <p className="text-sm font-medium text-[var(--admin-text)]">
                Email de confirmation
              </p>
              <p className="text-xs text-[var(--admin-text-muted)]">
                Envoyé automatiquement au lead après soumission. Utilise{" "}
                {"{{firstName}}"} pour personnaliser.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="emailSubject"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            Sujet de l&apos;email
          </Label>
          <Input
            id="emailSubject"
            value={formData.emailSubject}
            onChange={(e) => onChange("emailSubject", e.target.value)}
            placeholder="Voici ta ressource, {{firstName}} !"
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="emailBody"
            className="text-sm font-medium text-[var(--admin-text)]"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contenu de l&apos;email
            </div>
          </Label>
          <Textarea
            id="emailBody"
            value={formData.emailBody}
            onChange={(e) => onChange("emailBody", e.target.value)}
            placeholder="Merci pour ton inscription !&#10;&#10;Voici ce que tu vas recevoir..."
            rows={6}
            className="border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-accent)] focus:ring-[var(--admin-accent-muted)]"
          />
          <p className="text-xs text-[var(--admin-text-muted)]">
            Tu peux utiliser {"{{firstName}}"} pour personnaliser le message.
          </p>
        </div>

        {!hasEmailConfig && (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-600">
              Configure au moins le sujet et le contenu pour que l&apos;email
              soit envoyé.
            </p>
          </div>
        )}

        {hasEmailConfig && (
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-sm text-green-600">
              L&apos;email sera envoyé automatiquement à chaque soumission.
            </p>
          </div>
        )}
      </div>

      <EmailPreview formData={formData} />
    </div>
  );
}
