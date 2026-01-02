import Card from "../ui/Card";
import Button from "../ui/Button";
import { Upload, RotateCcw, PlayCircle, Terminal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActionsCard() {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => navigate("/migrate")} variant="primary">
          <div className="flex items-center gap-2">
            <Upload size={18} /> Start Migration
          </div>
        </Button>

        <Button onClick={() => navigate("/migrate#rollback")} variant="danger">
          <div className="flex items-center gap-2">
            <RotateCcw size={18} /> Rollback
          </div>
        </Button>

        <Button onClick={() => navigate("/jobs")} variant="secondary">
          <div className="flex items-center gap-2">
            <PlayCircle size={18} /> Active Jobs
          </div>
        </Button>

        <Button onClick={() => navigate("/logs")} variant="ghost">
          <div className="flex items-center gap-2">
            <Terminal size={18} /> Logs
          </div>
        </Button>
      </div>
    </Card>
  );
}
