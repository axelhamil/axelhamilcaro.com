import { AgentsHeader } from "@/src/features/admin-agents/components/agents-header";
import { AgentsLeads } from "@/src/features/admin-agents/components/agents-leads";
import { AgentsOverview } from "@/src/features/admin-agents/components/agents-overview";
import { AgentsProvider } from "@/src/features/admin-agents/components/agents-provider";
import { AgentsRecent } from "@/src/features/admin-agents/components/agents-recent";
import { AgentsTopLists } from "@/src/features/admin-agents/components/agents-top-lists";

export default function AdminAgentsPage() {
  return (
    <AgentsProvider>
      <div className="space-y-4">
        <AgentsHeader />
        <AgentsOverview />
        <AgentsTopLists />
        <AgentsLeads />
        <AgentsRecent />
      </div>
    </AgentsProvider>
  );
}
