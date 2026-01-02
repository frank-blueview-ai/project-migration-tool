import { useState } from "react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";
import Input from "../ui/Input";

export default function DefaultsCard() {
  const [dryRun, setDryRun] = useState(true);
  const [parallelism, setParallelism] = useState(4);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Default Migration Settings</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Dry Run Enabled</span>
          <Toggle checked={dryRun} onChange={setDryRun} />
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Parallelism</label>
          <Input
            type="number"
            value={parallelism}
            onChange={(e) => setParallelism(Number(e.target.value))}
          />
        </div>
      </div>
    </Card>
  );
}
