"use client";

import { useEffect } from "react";
import { Button } from "@/src/shared/ui/portfolio/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="trame min-h-screen px-4 flex items-center justify-center">
      <div className="flex flex-col items-start gap-6 max-w-xl">
        <h1 className="heading-display title-xl">Une erreur est survenue</h1>
        <p className="para para-lg ink-secondary">
          Cette page n'a pas pu s'afficher. Réessayez, ça suffit le plus
          souvent.
        </p>
        <Button type="button" onClick={reset}>
          Réessayer
        </Button>
      </div>
    </div>
  );
}
