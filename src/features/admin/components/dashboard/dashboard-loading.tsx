"use client";

import { Loader2 } from "lucide-react";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

export function DashboardLoading({ children }: { children: React.ReactNode }) {
  const { dashboard, isLoading } = useDashboard();

  if (isLoading && !dashboard) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (!dashboard && !isLoading) {
    return (
      <div className="text-center py-20 text-[var(--admin-text-muted)]">
        Erreur de chargement des données
      </div>
    );
  }

  return <>{children}</>;
}
