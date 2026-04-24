"use client";

import { Loader2 } from "lucide-react";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function AnalyticsLoading({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useAnalyticsContext();

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (!data && !isLoading) {
    return (
      <div className="text-center py-20 text-[var(--admin-text-muted)]">
        Erreur de chargement des données
      </div>
    );
  }

  return <>{children}</>;
}
