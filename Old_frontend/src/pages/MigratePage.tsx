// frontend/src/pages/MigratePage.tsx

import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import { Folder, FileText } from "lucide-react";

export default function MigratePage() {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* MIGRATION CARD */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Start a Migration</h2>

        <div className="space-y-4">
          <Input icon={Folder} placeholder="Source path" />
          <Input icon={Folder} placeholder="Destination path" />

          <div className="flex items-center justify-between">
            <span>Dry run</span>
            <Toggle checked={true} onChange={() => {}} />
          </div>

          <Button>Enqueue migration</Button>
        </div>
      </Card>

      {/* ROLLBACK CARD */}
      <Card className="border-amber-600">
        <h2 className="text-xl font-semibold text-amber-400 mb-4">
          ⚠ Rollback migration (danger zone)
        </h2>

        <div className="space-y-4">
          <Input icon={Folder} placeholder="Target directory" />
          <Input icon={FileText} placeholder="Manifest path" />

          <div className="flex items-center justify-between">
            <span>Dry run</span>
            <Toggle checked={false} onChange={() => {}} />
          </div>

          <Input placeholder='Type "ROLLBACK" to confirm' />

          <Button variant="danger">Enqueue rollback</Button>
        </div>
      </Card>
    </div>
  );
}
