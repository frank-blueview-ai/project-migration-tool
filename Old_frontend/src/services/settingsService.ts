// frontend/src/services/settingsService.ts

import { apiGet, apiPost } from "./api";

export function fetchSettings() {
  return apiGet("/settings");
}

export function updateSettings(payload: any) {
  return apiPost("/settings", payload);
}

export function clearHistory() {
  return apiPost("/jobs/clear", {});
}
