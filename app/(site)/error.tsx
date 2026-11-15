"use client";

import { Home, RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/src/shared/ui/portfolio/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Site error:", error);
  }, [error]);

  return (
    <section className="page-entete max-w-3xl mx-auto py-12 sm:py-16 flex flex-col gap-6 min-w-0">
      <p className="surtitre">Erreur · Envoi interrompu</p>

      <div className="etiquette etiquette-carte gap-5 mr-2">
        <p aria-hidden="true" className="tampon self-start">
          <span className="tampon-haut">Envoi</span>{" "}
          <span className="tampon-bas">Interrompu</span>
        </p>
        <h1 className="heading-display title-xl">
          Cette page n'a pas pu s'afficher.
        </h1>
        <p className="para para-lg ink-secondary">
          Une erreur s'est produite pendant le chargement. Réessayez, ça suffit
          le plus souvent. Si elle revient, repartez de l'accueil.
        </p>
        {error.digest ? (
          <p className="label-mono ink-muted">Référence {error.digest}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-4 pr-2 pb-2">
        <Button type="button" size="lg" onClick={reset}>
          <RotateCcw className="w-5 h-5" aria-hidden="true" />
          Réessayer
        </Button>
        <Button href="/" variant="secondary" size="lg">
          <Home className="w-5 h-5" aria-hidden="true" />
          Retour à l'accueil
        </Button>
      </div>
    </section>
  );
}
