// frontend/src/hooks/useMigrate.ts

import { enqueueMigration } from "../services/migrateService";
import { useToast } from "../components/ui/ToastProvider";

export function useMigrate() {
  const { push } = useToast();

  async function migrate(payload) {
    try {
      await enqueueMigration(payload);
      push("Migration enqueued", "success");
    } catch {
      push("Migration failed", "error");
    }
  }

  return { migrate };
}
