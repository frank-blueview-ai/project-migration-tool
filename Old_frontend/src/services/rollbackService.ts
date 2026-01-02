// frontend/src/services/rollbackService.ts

import { apiPost } from "./api";

export function enqueueRollback(payload: {
  target: string;
  manifest: string;
  dryRun: boolean;
}) {
  return apiPost("/rollback", payload);
}
