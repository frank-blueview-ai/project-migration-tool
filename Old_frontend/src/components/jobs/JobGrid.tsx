import JobCard from "./JobCard";
import Card from "../ui/Card";

export default function JobGrid({ search, filters }) {
  // TODO: Replace with real API call
  const jobs = [
    { id: "1234", type: "migration", status: "running", progress: 42 },
    { id: "1233", type: "rollback", status: "completed", progress: 100 },
    { id: "1232", type: "migration", status: "failed", progress: 80 },
  ];

  const filtered = jobs.filter((job) => {
    if (filters.status !== "all" && job.status !== filters.status) return false;
    if (filters.type !== "all" && job.type !== filters.type) return false;
    if (search && !job.id.includes(search)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return (
      <Card className="text-center py-16 text-gray-400">
        No jobs found. Try adjusting your filters.
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {filtered.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
