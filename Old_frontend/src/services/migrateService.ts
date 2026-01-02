// frontend/src/services/migrateService.ts

import { apiPost } from "./api";

export function enqueueMigration(payload: {
  source: string;
  destination: string;
  dryRun: boolean;
}) {
  return apiPost("/migrate", payload);
}
