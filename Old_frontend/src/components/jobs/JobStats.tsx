import Card from "../ui/Card";
import StatCard from "../ui/StatCard";
import { Folder, HardDrive, Gauge, Clock } from "lucide-react";
import formatBytes from "../../utils/formatBytes";

export default function JobStats({ job }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Job Stats</h2>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={Folder}
          label="Source"
          value={job.source}
        />
        <StatCard
          icon={Folder}
          label="Destination"
          value={job.destination}
        />
        <StatCard
          icon={HardDrive}
          label="Data Processed"
          value={`${formatBytes(job.bytesProcessed)} / ${formatBytes(job.bytesTotal)}`}
        />
        <StatCard
          icon={Gauge}
          label="Progress"
          value={`${job.progress}%`}
        />
      </div>
    </Card>
  );
}
