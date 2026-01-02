import { useNavigate } from "react-router-dom";
import Badge from "../ui/Badge";
import ProgressBar from "../ui/ProgressBar";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="cursor-pointer bg-[#161B22] border border-[#2D333B] rounded-lg p-5 hover:shadow-md hover:border-[#3C444E] transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <Badge status={job.status} />
        <span className="text-gray-400 text-sm">#{job.id}</span>
      </div>

      <h3 className="text-lg font-semibold mb-3 capitalize">
        {job.type} job
      </h3>

      <ProgressBar value={job.progress} />
    </div>
  );
}
