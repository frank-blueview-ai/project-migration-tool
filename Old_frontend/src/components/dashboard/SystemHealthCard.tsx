import Card from "../ui/Card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function SystemHealthCard() {
  const status = "healthy"; // Replace with real API call

  const iconMap = {
    healthy: <CheckCircle className="text-green-500" size={22} />,
    degraded: <AlertTriangle className="text-amber-500" size={22} />,
    down: <XCircle className="text-red-500" size={22} />,
  };

  const labelMap = {
    healthy: "Healthy",
    degraded: "Degraded",
    down: "Offline",
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">System Health</h2>

      <div className="flex items-center gap-3">
        {iconMap[status]}
        <span className="text-lg">{labelMap[status]}</span>
      </div>

      <div className="mt-4 text-gray-400 space-y-1">
        <p>API Version: 0.1.0</p>
        <p>Workers: 4 active</p>
        <p>Queue Depth: 0</p>
        <p>Last Heartbeat: 2s ago</p>
      </div>
    </Card>
  );
}
