import { useNavigate } from "react-router-dom";
import ProgressBar from "../ui/ProgressBar";
import Badge from "../ui/Badge";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="cursor-pointer bg-[#161B22] border border-[#2D333B] rounded-lg p-4 hover:shadow-md hover:border-[#3C444E] transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <Badge status={job.status} />
        <span className="text-gray-400 text-sm">{job.startedAt}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {job.type === "migration" ? "Migration" : "Rollback"} #{job.id}
      </h3>

      <ProgressBar value={job.progress} />
    </div>
  );
}
