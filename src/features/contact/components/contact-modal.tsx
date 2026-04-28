"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { Loader2, Mail, Send } from "lucide-react";
import {
  type FormEvent,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
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

export function ContactModal({ children, defaultOpen }: ContactModalProps) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const [openCount, setOpenCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const formId = useId();

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setOpenCount((c) => c + 1);
      setToken(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: (formData.get("name") as string) || undefined,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      website: (formData.get("website") as string) || "",
      turnstileToken: token || undefined,
    };

    if (!token) {
      toast.error("Merci de valider le captcha");
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null);
    } finally {
      toast.success("Message envoyé. Je te réponds en journée.");
      form.reset();
      setOpen(false);
      turnstileRef.current?.reset();
      setToken(null);
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
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${formId}-message`}>Ton message</Label>
            <Textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={5}
              minLength={10}
              maxLength={5000}
              placeholder="Contexte du projet, échéance, budget approximatif…"
              disabled={submitting}
            />
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
