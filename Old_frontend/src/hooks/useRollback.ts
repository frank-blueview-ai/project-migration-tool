// frontend/src/hooks/useRollback.ts

import { enqueueRollback } from "../services/rollbackService";
import { useToast } from "../components/ui/ToastProvider";

export function useRollback() {
  const { push } = useToast();

  async function rollback(payload) {
    try {
      await enqueueRollback(payload);
      push("Rollback enqueued", "success");
    } catch {
      push("Rollback failed", "error");
    }
  }

  return { rollback };
}
