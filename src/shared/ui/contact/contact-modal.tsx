"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2, Mail, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { z } from "zod";
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
  MESSAGE_MAX,
  MESSAGE_MIN,
  PROJECT_TYPES,
  type ProjectTypeValue,
} from "@/src/backend/contact/contact.config";
import { contactSubmitSchema } from "@/src/backend/contact/contact.schema";
import { Button } from "@/src/shared/ui/portfolio/button";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;

interface ContactModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

const MESSAGE_PLACEHOLDER =
  "Ex : scale-up SaaS, lenteurs sur le dashboard depuis 2 mois, besoin d'un audit perf + plan d'action. Démarrage sous 3 semaines.";

const SELECT_TRIGGER_CLASS =
  "w-full min-w-0 *:data-[slot=select-value]:block *:data-[slot=select-value]:truncate";

function counterState(length: number) {
  if (length > MESSAGE_MAX || (length > 0 && length < MESSAGE_MIN)) {
    return "erreur";
  }

  return length >= MESSAGE_MIN ? "ok" : "neutre";
}

const MESSAGE_HELPER =
  "Plus c'est concret (stack, contexte, besoin, échéance), plus ma réponse l'est.";

interface FormErrors {
  email?: string;
  message?: string;
  projectType?: string;
  budget?: string;
}

function validate(payload: unknown): FormErrors {
  const result = contactSubmitSchema.safeParse(payload);

  if (result.success) return {};

  const { fieldErrors } = z.flattenError(result.error);

  return {
    email: fieldErrors.email?.[0],
    message: fieldErrors.message?.[0],
    projectType: fieldErrors.projectType?.[0],
    budget: fieldErrors.budget?.[0],
  };
}

export function ContactModal({ children, defaultOpen }: ContactModalProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
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

  useEffect(() => {
    function onOpen() {
      setOpen(true);
      setOpenCount((count) => count + 1);
      setMessageLength(0);
      setProjectType("");
      setBudget("");
      setErrors({});
      setToken(null);
    }

    window.addEventListener("axel:open-contact", onOpen);
    return () => window.removeEventListener("axel:open-contact", onOpen);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const field = (name: string) => {
      const value = formData.get(name);

      return typeof value === "string" ? value : "";
    };

    const payload = {
      name: field("name") || undefined,
      email: field("email"),
      message: field("message"),
      projectType,
      budget,
      sourcePath: pathname || undefined,
      website: field("website"),
      turnstileToken: token || undefined,
    };

    const nextErrors = validate(payload);

    if (Object.values(nextErrors).some(Boolean)) {
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
      <DialogContent className="contact-modale sm:max-w-lg max-h-[90svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="heading-display contact-titre flex items-center gap-3">
            <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
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
          {...({
            toolname: "contact_form",
            tooldescription:
              "Contact form for a freelance inquiry. The human must submit it.",
          } as Record<string, string>)}
        >
          <div aria-hidden="true" className="pot-de-miel">
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
                  aria-describedby={
                    errors.projectType
                      ? `${formId}-projectType-error`
                      : undefined
                  }
                  className={SELECT_TRIGGER_CLASS}
                >
                  <SelectValue placeholder="Choisis un type..." />
                </SelectTrigger>
                <SelectContent className="contact-select">
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType ? (
                <p
                  id={`${formId}-projectType-error`}
                  className="contact-erreur"
                >
                  {errors.projectType}
                </p>
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
                  aria-describedby={
                    errors.budget ? `${formId}-budget-error` : undefined
                  }
                  className={SELECT_TRIGGER_CLASS}
                >
                  <SelectValue placeholder="Choisis une fourchette..." />
                </SelectTrigger>
                <SelectContent className="contact-select">
                  {BUDGET_RANGES.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget ? (
                <p id={`${formId}-budget-error`} className="contact-erreur">
                  {errors.budget}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={`${formId}-message`}>Ton message</Label>
              <span
                className="contact-compteur shrink-0"
                data-etat={counterState(messageLength)}
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
              {...({
                toolparamdescription:
                  "Project description, stack, constraints, and timeline. Minimum 80 characters.",
              } as Record<string, string>)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={`${formId}-message-helper${errors.message ? ` ${formId}-message-error` : ""}`}
              onChange={(e) => {
                setMessageLength(e.currentTarget.value.length);
                if (errors.message)
                  setErrors((err) => ({ ...err, message: undefined }));
              }}
            />
            <p id={`${formId}-message-helper`} className="contact-aide">
              {MESSAGE_HELPER}
            </p>
            {errors.message ? (
              <p id={`${formId}-message-error`} className="contact-erreur">
                {errors.message}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2 min-w-0">
              <Label htmlFor={`${formId}-name`}>
                Prénom
                <span className="contact-optionnel">optionnel</span>
              </Label>
              <Input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="given-name"
                maxLength={120}
                placeholder="John Doe"
                disabled={submitting}
                {...({
                  toolparamdescription: "Visitor first name",
                } as Record<string, string>)}
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
                {...({
                  toolparamdescription: "Visitor email for a reply",
                } as Record<string, string>)}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? `${formId}-email-error` : undefined
                }
                onChange={() => {
                  if (errors.email)
                    setErrors((e) => ({ ...e, email: undefined }));
                }}
              />
              {errors.email ? (
                <p id={`${formId}-email-error`} className="contact-erreur">
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
                options={{
                  theme: resolvedTheme === "light" ? "light" : "dark",
                  size: "normal",
                }}
              />
            </div>
          ) : null}
        </form>

        <DialogFooter className="sm:items-center sm:justify-end gap-3">
          {token || submitting ? null : (
            <p className="contact-aide">
              Valide la vérification anti-robot pour activer l'envoi.
            </p>
          )}
          <Button
            type="submit"
            form={formId}
            disabled={submitting || !token}
            aria-busy={submitting}
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
