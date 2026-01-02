import { useParams } from "react-router-dom";
import JobHeader from "../components/jobs/JobHeader";
import JobProgress from "../components/jobs/JobProgress";
import JobStats from "../components/jobs/JobStats";
import JobLogs from "../components/jobs/JobLogs";
import JobActions from "../components/jobs/JobActions";


export default function JobDetailsPage() {
  const { id } = useParams();

  // TODO: Replace with real API call
  const job = {
    id,
    type: "migration",
    status: "running",
    progress: 42,
    startedAt: "2m ago",
    source: "/mnt/f/project",
    destination: "~/dev/project",
    filesProcessed: 1240,
    filesTotal: 3000,
    bytesProcessed: 12.4 * 1024 * 1024 * 1024,
    bytesTotal: 38.2 * 1024 * 1024 * 1024,
  };

  return (
    <div className="space-y-8">
      <JobHeader job={job} />
      <JobActions jobId={id} status={job.status} />
      <JobProgress job={job} />
      <JobStats job={job} />
      <JobLogs jobId={id} />
    </div>
  );
}
