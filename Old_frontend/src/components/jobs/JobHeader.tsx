import Badge from "../ui/Badge";

export default function JobHeader({ job }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold mb-1">
          {job.type === "migration" ? "Migration" : "Rollback"} #{job.id}
        </h1>
        <p className="text-gray-400">Started {job.startedAt}</p>
      </div>

      <Badge status={job.status} />
    </div>
  );
}
