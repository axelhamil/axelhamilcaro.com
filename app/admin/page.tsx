import { DashboardHeader } from "@/src/features/admin/components/dashboard/dashboard-header";
import { DashboardLoading } from "@/src/features/admin/components/dashboard/dashboard-loading";
import { OverviewStats } from "@/src/features/admin/components/dashboard/overview-stats";
import { RecentActivity } from "@/src/features/admin/components/dashboard/recent-activity";
import { SecondaryStats } from "@/src/features/admin/components/dashboard/secondary-stats";
import { TodayStats } from "@/src/features/admin/components/dashboard/today-stats";
import { WeeklyCharts } from "@/src/features/admin/components/dashboard/weekly-charts";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardLoading>
        <TodayStats />
        <OverviewStats />
        <SecondaryStats />
        <WeeklyCharts />
        <RecentActivity />
      </DashboardLoading>
    </div>
  );
}
