import { Suspense } from "react";
import { LeadsFilters } from "@/src/features/admin-leads/components/leads-filters";
import { LeadsHeader } from "@/src/features/admin-leads/components/leads-header";
import { LeadsProvider } from "@/src/features/admin-leads/components/leads-provider";
import { LeadsTable } from "@/src/features/admin-leads/components/leads-table";

function LeadsLoading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--admin-accent)] border-t-transparent" />
    </div>
  );
}

export default function LeadsPage() {
  return (
    <Suspense fallback={<LeadsLoading />}>
      <LeadsProvider>
        <div className="space-y-6">
          <LeadsHeader />
          <LeadsFilters />
          <LeadsTable />
        </div>
      </LeadsProvider>
    </Suspense>
  );
}
