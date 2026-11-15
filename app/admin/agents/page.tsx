import { AgentsDailyChart } from "@/src/features/admin-agents/components/agents-daily-chart";
import { AgentsEmptyState } from "@/src/features/admin-agents/components/agents-empty-state";
import { AgentsEventsTable } from "@/src/features/admin-agents/components/agents-events-table";
import { AgentsHeader } from "@/src/features/admin-agents/components/agents-header";
import { AgentsLeads } from "@/src/features/admin-agents/components/agents-leads";
import { AgentsOverview } from "@/src/features/admin-agents/components/agents-overview";
import { AgentsProvider } from "@/src/features/admin-agents/components/agents-provider";
import { AgentsTopLists } from "@/src/features/admin-agents/components/agents-top-lists";
import { AgentsTrafficFilter } from "@/src/features/admin-agents/components/agents-traffic-filter";

export default function AdminAgentsPage() {
  return (
    <AgentsProvider>
      <div className="space-y-4">
        <AgentsHeader />
        <AgentsTrafficFilter />
        <AgentsEmptyState />
        <AgentsOverview />
        <AgentsDailyChart />
        <AgentsTopLists />
        <AgentsEventsTable />
        <AgentsLeads />
      </div>
    </AgentsProvider>
  );
}
