// frontend/src/components/ui/EmptyState.tsx

import { Inbox } from "lucide-react";

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
      <Inbox size={40} className="mb-4" />
      <p>{message}</p>
    </div>
  );
}
