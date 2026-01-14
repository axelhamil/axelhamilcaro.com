"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SiteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Site error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-primary">Oops !</h1>
        <p className="text-primary/60">
          Une erreur inattendue s&apos;est produite.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-4 py-2 border border-primary/20 text-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
