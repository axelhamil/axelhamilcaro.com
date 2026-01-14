"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-background">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-primary">
          Une erreur est survenue
        </h1>
        <p className="text-primary/60">
          Nous nous excusons pour ce désagrément.
        </p>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}
