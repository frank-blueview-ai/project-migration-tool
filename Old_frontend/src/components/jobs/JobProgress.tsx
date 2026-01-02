import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";

export default function JobProgress({ job }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Progress</h2>

      <ProgressBar value={job.progress} />

      <div className="flex items-center justify-between mt-3 text-gray-400 text-sm">
        <span>{job.progress}%</span>
        <span>
          {job.filesProcessed} / {job.filesTotal} files
        </span>
      </div>
    </Card>
  );
}
