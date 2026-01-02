import Card from "../ui/Card";
import JobCard from "../jobs/JobCard";

export default function RecentJobsCard() {
  const jobs = [
    {
      id: "1234",
      type: "migration",
      status: "running",
      progress: 42,
      startedAt: "2m ago",
    },
    {
      id: "1233",
      type: "rollback",
      status: "completed",
      progress: 100,
      startedAt: "10m ago",
    },
    {
      id: "1232",
      type: "migration",
      status: "failed",
      progress: 80,
      startedAt: "15m ago",
    },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>

      <div className="grid grid-cols-3 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </Card>
  );
}
