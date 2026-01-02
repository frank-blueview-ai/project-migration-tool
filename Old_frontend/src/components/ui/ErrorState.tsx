// frontend/src/components/ui/ErrorState.tsx

import { AlertTriangle } from "lucide-react";
import Button from "./Button";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <AlertTriangle size={40} className="text-red-500 mb-4" />
      <p className="mb-4">{message}</p>
      {onRetry && <Button onClick={onRetry}>Retry</Button>}
    </div>
  );
}
