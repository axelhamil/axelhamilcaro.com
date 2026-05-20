"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2, Mail, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { type FormEvent, type ReactNode, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  BUDGET_RANGES,
  type BudgetRangeValue,
  PROJECT_TYPES,
  type ProjectTypeValue,
} from "@/src/backend/contact/contact.config";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;

interface ContactModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

const MESSAGE_MIN = 80;
const MESSAGE_MAX = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGE_PLACEHOLDER =
  "Ex : scale-up SaaS Next.js, lenteurs sur le dashboard depuis 2 mois, besoin d'un audit perf + plan d'action. Démarrage sous 3 semaines.";

const MESSAGE_HELPER =
  "Plus c'est concret (stack, contexte, besoin, échéance), plus ma réponse l'est.";

interface FormErrors {
  email?: string;
  message?: string;
  projectType?: string;
  budget?: string;
}

export function ContactModal({ children, defaultOpen }: ContactModalProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [openCount, setOpenCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const [projectType, setProjectType] = useState<ProjectTypeValue | "">("");
  const [budget, setBudget] = useState<BudgetRangeValue | "">("");
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const formId = useId();

  function resetForm() {
    setMessageLength(0);
    setProjectType("");
    setBudget("");
    setErrors({});
    setToken(null);
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setOpenCount((c) => c + 1);
      resetForm();
    }
  }

  function validate(payload: {
    email: string;
    message: string;
    projectType: string;
    budget: string;
  }): FormErrors {
    const next: FormErrors = {};
    if (!payload.email.trim()) {
      next.email = "Ton email est requis pour qu'on puisse te répondre.";
    } else if (!EMAIL_REGEX.test(payload.email.trim())) {
      next.email = "Cet email n'a pas l'air valide.";
    }
    if (!payload.projectType) {
      next.projectType = "Sélectionne le type de projet.";
    }
    if (!payload.budget) {
      next.budget = "Sélectionne une fourchette de budget.";
    }
    const trimmed = payload.message.trim();
    if (trimmed.length < MESSAGE_MIN) {
      next.message = `Décris ton projet en au moins ${MESSAGE_MIN} caractères (${trimmed.length} actuellement).`;
    } else if (trimmed.length > MESSAGE_MAX) {
      next.message = `Ton message dépasse ${MESSAGE_MAX} caractères. Découpe-le ou écris-moi en plusieurs fois.`;
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string) || undefined,
      email: (formData.get("email") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
      projectType,
      budget,
      sourcePath: pathname || undefined,
      website: (formData.get("website") as string) || "",
      turnstileToken: token || undefined,
    };

    const nextErrors = validate({
      email: payload.email,
      message: payload.message,
      projectType: payload.projectType,
      budget: payload.budget,
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      toast.error("Vérifie les champs en rouge avant d'envoyer.");
      return;
    }
    setErrors({});

    if (!token) {
      toast.error("Merci de valider le captcha");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error(
          "Envoi impossible pour le moment. Réessaie dans quelques minutes.",
        );
        return;
      }

      toast.success("Message envoyé. Je te réponds en journée.");
      form.reset();
      resetForm();
      setOpen(false);
      turnstileRef.current?.reset();
    } catch {
      toast.error("Connexion interrompue. Réessaie dans quelques minutes.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Discutons de ton projet
          </DialogTitle>
          <DialogDescription>
            Quelques infos rapides pour que je te réponde vite et précis.
            Réponse en journée.
          </DialogDescription>
        </DialogHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor={`${formId}-website`}>
              Ne pas remplir
              <input
                id={`${formId}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2 min-w-0">
              <Label htmlFor={`${formId}-projectType`}>Type de projet</Label>
              <Select
                value={projectType}
                onValueChange={(v) => {
                  setProjectType(v as ProjectTypeValue);
                  if (errors.projectType)
                    setErrors((e) => ({ ...e, projectType: undefined }));
                }}
                disabled={submitting}
              >
                <SelectTrigger
                  id={`${formId}-projectType`}
                  aria-invalid={errors.projectType ? true : undefined}
                  className={`w-full ${
                    errors.projectType
                      ? "border-destructive focus-visible:ring-destructive/40"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Choisis un type..." />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType ? (
                <p className="text-xs text-destructive">{errors.projectType}</p>
              ) : null}
            </div>

            <div className="grid gap-2 min-w-0">
              <Label htmlFor={`${formId}-budget`}>Budget approximatif</Label>
              <Select
                value={budget}
                onValueChange={(v) => {
                  setBudget(v as BudgetRangeValue);
                  if (errors.budget)
                    setErrors((e) => ({ ...e, budget: undefined }));
                }}
                disabled={submitting}
              >
                <SelectTrigger
                  id={`${formId}-budget`}
                  aria-invalid={errors.budget ? true : undefined}
                  className={`w-full ${
                    errors.budget
                      ? "border-destructive focus-visible:ring-destructive/40"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Choisis une fourchette..." />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget ? (
                <p className="text-xs text-destructive">{errors.budget}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={`${formId}-message`}>Ton message</Label>
              <span
                className={`text-xs tabular-nums shrink-0 ${
                  messageLength > MESSAGE_MAX ||
                  (messageLength > 0 && messageLength < MESSAGE_MIN)
                    ? "text-destructive"
                    : messageLength >= MESSAGE_MIN
                      ? "text-accent"
                      : "text-muted-foreground"
                }`}
              >
                {messageLength < MESSAGE_MIN
                  ? `${messageLength} / ${MESSAGE_MIN} min`
                  : `${messageLength} / ${MESSAGE_MAX}`}
              </span>
            </div>
            <Textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder={MESSAGE_PLACEHOLDER}
              disabled={submitting}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={`${formId}-message-helper${errors.message ? ` ${formId}-message-error` : ""}`}
              onChange={(e) => {
                setMessageLength(e.currentTarget.value.length);
                if (errors.message)
                  setErrors((err) => ({ ...err, message: undefined }));
              }}
              className={
                errors.message
                  ? "border-destructive focus-visible:ring-destructive/40"
                  : undefined
              }
            />
            <p
              id={`${formId}-message-helper`}
              className="text-xs text-muted-foreground leading-relaxed"
            >
              {MESSAGE_HELPER}
            </p>
            {errors.message ? (
              <p
                id={`${formId}-message-error`}
                className="text-xs text-destructive"
              >
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2 min-w-0">
              <Label
                htmlFor={`${formId}-name`}
                className="flex items-center gap-2"
              >
                Prénom
                <span className="text-xs font-normal text-muted-foreground">
                  optionnel
                </span>
              </Label>
              <Input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="given-name"
                maxLength={120}
                placeholder="John Doe"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2 min-w-0">
              <Label htmlFor={`${formId}-email`}>Email</Label>
              <Input
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="toi@exemple.com"
                disabled={submitting}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? `${formId}-email-error` : undefined
                }
                onChange={() => {
                  if (errors.email)
                    setErrors((e) => ({ ...e, email: undefined }));
                }}
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive/40"
                    : undefined
                }
              />
              {errors.email ? (
                <p
                  id={`${formId}-email-error`}
                  className="text-xs text-destructive"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          {open ? (
            <div className="min-h-[70px] flex justify-center">
              <Turnstile
                key={openCount}
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={setToken}
                onError={() => setToken(null)}
                onExpire={() => setToken(null)}
                options={{ theme: "auto", size: "normal" }}
              />
            </div>
          ) : null}
        </form>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="submit"
            form={formId}
            disabled={submitting || !token}
            className="bg-accent text-white hover:bg-accent/90"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
