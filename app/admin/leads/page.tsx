import { Suspense } from "react";
import { LeadsListClient } from "./_components/leads-list-client";

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
      <LeadsListClient />
    </Suspense>
  );
}
