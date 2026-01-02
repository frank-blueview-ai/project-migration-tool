// frontend/src/services/logsService.ts

import { apiGet } from "./api";

export function fetchLogs(id: string) {
  return apiGet(`/jobs/${id}/logs`);
}

// SSE (Server-Sent Events) stream
export function streamLogs(id: string): EventSource {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const url = `${API_BASE}/jobs/${id}/logs/stream`;
  return new EventSource(url);
}
