"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2, Mail, Send } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || TURNSTILE_TEST_SITE_KEY;

interface ContactModalProps {
  children: ReactNode;
  defaultOpen?: boolean;
}

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  message?: string;
}

export function ContactModal({ children, defaultOpen }: ContactModalProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [openCount, setOpenCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [messageLength, setMessageLength] = useState(0);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const formId = useId();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setOpenCount((c) => c + 1);
      setToken(null);
      setErrors({});
      setMessageLength(0);
    }
  }

  function validate(payload: { email: string; message: string }): FormErrors {
    const next: FormErrors = {};
    if (!payload.email.trim()) {
      next.email = "Ton email est requis pour qu'on puisse te répondre.";
    } else if (!EMAIL_REGEX.test(payload.email.trim())) {
      next.email = "Cet email n'a pas l'air valide.";
    }
    const trimmed = payload.message.trim();
    if (trimmed.length < MESSAGE_MIN) {
      next.message = `Ton message doit faire au moins ${MESSAGE_MIN} caractères (${trimmed.length} actuellement).`;
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
      website: (formData.get("website") as string) || "",
      turnstileToken: token || undefined,
    };

    const nextErrors = validate({
      email: payload.email,
      message: payload.message,
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
      setMessageLength(0);
      setOpen(false);
      turnstileRef.current?.reset();
      setToken(null);
    } catch {
      toast.error("Connexion interrompue. Réessaie dans quelques minutes.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Me contacter
          </DialogTitle>
          <DialogDescription>
            Décris ton projet en deux lignes, je te réponds en journée.
          </DialogDescription>
        </DialogHeader>

        <form
          id={formId}
          onSubmit={handleSubmit}
          className="space-y-4"
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

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-name`}>Prénom (optionnel)</Label>
            <Input
              id={`${formId}-name`}
              name="name"
              type="text"
              autoComplete="given-name"
              maxLength={120}
              disabled={submitting}
            />
          </div>

          <div className="grid gap-2">
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

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`${formId}-message`}>Ton message</Label>
              <span
                className={`text-xs ${
                  messageLength > MESSAGE_MAX
                    ? "text-destructive"
                    : messageLength > 0 && messageLength < MESSAGE_MIN
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {messageLength}/{MESSAGE_MAX} ·{" "}
                {messageLength < MESSAGE_MIN ? `min ${MESSAGE_MIN}` : "OK"}
              </span>
            </div>
            <Textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={5}
              maxLength={MESSAGE_MAX}
              placeholder="Contexte du projet, échéance, budget approximatif…"
              disabled={submitting}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? `${formId}-message-error` : undefined
              }
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
            {errors.message ? (
              <p
                id={`${formId}-message-error`}
                className="text-xs text-destructive"
              >
                {errors.message}
              </p>
            ) : null}
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
