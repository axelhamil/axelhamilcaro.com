"use client";

import type { Form } from "@/app/_lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

interface FormCardProps {
  form: Form;
}

export function FormCard({ form }: FormCardProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/submit/${form.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
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
    return (
      <Card className="w-full max-w-lg animate-in fade-in">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-2xl font-bold">Merci {firstName} !</h2>
          <p className="mt-2 text-muted-foreground">
            Ta demande a bien été envoyée.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg animate-in fade-in">
      <CardContent className="flex gap-6 p-6">
        {form.cardImage && (
          <div className="hidden w-32 shrink-0 md:block">
            <img
              src={form.cardImage}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-4">
          {form.badgeText && (
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ backgroundColor: form.badgeColor || "#ff4d00" }}
            >
              {form.badgeText}
            </span>
          )}
          <h1 className="text-2xl font-bold">{form.title}</h1>
          {form.description && (
            <p className="text-sm text-muted-foreground">{form.description}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ton prénom"
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ton@email.com"
                required
                disabled={isSubmitting}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi...
                </>
              ) : (
                form.buttonText
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
