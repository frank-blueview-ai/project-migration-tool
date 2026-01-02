import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ClearHistoryCard() {
  const [confirm, setConfirm] = useState("");

  return (
    <Card className="border-amber-600">
      <h2 className="text-xl font-semibold text-amber-400 mb-4">
        ⚠ Danger Zone
      </h2>

      <p className="text-gray-400 mb-4">
        Clearing job history will permanently delete all job records. This
        action cannot be undone.
      </p>

      <input
        placeholder='Type "CLEAR" to confirm'
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full bg-[#0F141A] border border-[#2D333B] rounded-md px-3 py-2 text-gray-200 mb-4"
      />

      <Button variant="danger" disabled={confirm !== "CLEAR"}>
        Clear Job History
      </Button>
    </Card>
  );
}
