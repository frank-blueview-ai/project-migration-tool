import SystemHealthCard from "../components/dashboard/SystemHealthCard";
import QuickActionsCard from "../components/dashboard/QuickActionsCard";
import RecentJobsCard from "../components/dashboard/RecentJobsCard";
import StatsOverviewCard from "../components/dashboard/StatsOverviewCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* TOP GRID */}
      <div className="grid grid-cols-2 gap-8">
        <SystemHealthCard />
        <QuickActionsCard />
      </div>

      {/* RECENT JOBS */}
      <RecentJobsCard />

      {/* STATS */}
      <StatsOverviewCard />
    </div>
  );
}
