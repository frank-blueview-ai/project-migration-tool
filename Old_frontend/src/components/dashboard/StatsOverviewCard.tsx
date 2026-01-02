import Card from "../ui/Card";
import StatCard from "../ui/StatCard";
import { HardDrive, Gauge, Clock, CheckCircle } from "lucide-react";

export default function StatsOverviewCard() {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Stats Overview</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={HardDrive} label="Files Migrated" value="12,430" />
        <StatCard icon={Gauge} label="Throughput" value="112 MB/s" />
        <StatCard icon={CheckCircle} label="Success Rate" value="98.4%" />
        <StatCard icon={Clock} label="Avg Duration" value="2m 15s" />
      </div>
    </Card>
  );
}
