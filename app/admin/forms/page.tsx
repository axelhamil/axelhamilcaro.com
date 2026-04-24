import { FormsHeader } from "@/src/features/admin-forms/components/forms-header";
import { FormsProvider } from "@/src/features/admin-forms/components/forms-provider";
import { FormsSearch } from "@/src/features/admin-forms/components/forms-search";
import { FormsTable } from "@/src/features/admin-forms/components/forms-table";

export default function FormsPage() {
  return (
    <FormsProvider>
      <div className="space-y-6">
        <FormsHeader />
        <FormsSearch />
        <FormsTable />
      </div>
    </FormsProvider>
  );
}
