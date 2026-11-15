"use client";

import { AlertTriangle, ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Form } from "@/drizzle/schema";
import { formBadgeStyle } from "@/src/features/form-public/lib/form-theme";
import { Button } from "@/src/shared/ui/portfolio/button";

interface FormCardProps {
  form: Form;
}

interface SuccessStateProps {
  firstName: string;
}

function SuccessState({ firstName }: SuccessStateProps) {
  return (
    <section className="etiquette etiquette-carte etiquette-jaune form-carte form-succes relative mx-auto w-full max-w-lg items-start gap-5">
      <p
        aria-hidden="true"
        className="tampon tampon-droite absolute -top-5 -right-3"
      >
        <span className="tampon-haut">Reçu</span>{" "}
        <span className="tampon-bas">Merci</span>
      </p>
      <h1 className="heading-display form-h1">Merci {firstName} !</h1>
      <p className="para para-lg ink-secondary">J'ai bien reçu ta demande.</p>
      <p className="etiquette etiquette-sm label-mono gap-2">
        <Mail className="w-4 h-4" aria-hidden="true" />
        Pense à vérifier tes spams
      </p>
    </section>
  );
}

export function FormCard({ form }: FormCardProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fieldId = useId();
  const errorId = `${fieldId}-erreur`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/submit/${form.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessState firstName={firstName} />;
  }

  const describedBy = error ? errorId : undefined;

  return (
    <article
      className={`etiquette etiquette-carte form-carte mx-auto w-full p-0 ${
        form.cardImage
          ? "max-w-4xl lg:grid lg:grid-cols-[45%_minmax(0,1fr)]"
          : "max-w-lg"
      }`}
    >
      {form.cardImage ? (
        <figure className="form-visuel relative min-h-72 lg:min-h-full">
          <Image
            src={form.cardImage}
            alt={form.title || "Image du formulaire"}
            fill
            sizes="(max-width: 1024px) 100vw, 400px"
            className="object-cover"
          />
        </figure>
      ) : null}

      <div className="form-contenu relative flex flex-col gap-8 p-6 sm:p-10">
        {form.badgeText ? (
          <p
            className="tampon tampon-droite self-start"
            data-badge={formBadgeStyle(form)}
          >
            <span className="tampon-haut">{form.badgeText}</span>
          </p>
        ) : null}

        <header className="page-entete flex flex-col gap-4">
          <h1 className="heading-display form-h1">{form.title}</h1>
          {form.description ? (
            <p className="para para-lg ink-secondary">{form.description}</p>
          ) : null}
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-prenom`}>Prénom</Label>
            <Input
              id={`${fieldId}-prenom`}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSubmitting}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-email`}>Email</Label>
            <Input
              id={`${fieldId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy}
            />
          </div>

          {error ? (
            <p
              id={errorId}
              role="alert"
              className="form-erreur flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className="w-full flex-col"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                Envoi en cours...
              </span>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  {form.buttonText}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </span>
                {form.buttonSubtext ? (
                  <span className="btn-note">{form.buttonSubtext}</span>
                ) : null}
              </>
            )}
          </Button>
        </form>

        <p className="form-confidentiel flex items-center gap-2">
          <Lock className="w-4 h-4 shrink-0" aria-hidden="true" />
          Je garde tes données confidentielles.
        </p>
      </div>
    </article>
  );
}
