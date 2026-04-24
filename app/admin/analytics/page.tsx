import { ActivityCharts } from "@/src/features/admin-analytics/components/activity-charts";
import { AnalyticsHeader } from "@/src/features/admin-analytics/components/analytics-header";
import { AnalyticsLoading } from "@/src/features/admin-analytics/components/analytics-loading";
import { AnalyticsProvider } from "@/src/features/admin-analytics/components/analytics-provider";
import { BreakdownPanels } from "@/src/features/admin-analytics/components/breakdown-panels";
import { CustomDateRange } from "@/src/features/admin-analytics/components/custom-date-range";
import { InsightsPanel } from "@/src/features/admin-analytics/components/insights-panel";
import { AnalyticsOverviewStats } from "@/src/features/admin-analytics/components/overview-stats";
import { RecentActivityPanels } from "@/src/features/admin-analytics/components/recent-activity-panels";
import { TopLinksPanel } from "@/src/features/admin-analytics/components/top-links-panel";
import { TrafficSources } from "@/src/features/admin-analytics/components/traffic-sources";

export default function AnalyticsPage() {
  return (
    <AnalyticsProvider>
      <div className="space-y-4">
        <AnalyticsHeader />
        <CustomDateRange />
        <AnalyticsLoading>
          <InsightsPanel />
          <AnalyticsOverviewStats />
          <ActivityCharts />
          <BreakdownPanels />
          <TrafficSources />
          <TopLinksPanel />
          <RecentActivityPanels />
        </AnalyticsLoading>
      </div>
    </AnalyticsProvider>
  );
}
