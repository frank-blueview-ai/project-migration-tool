// frontend/src/services/jobDetailsService.ts

import { apiGet } from "./api";

export function fetchJobDetails(id: string) {
  return apiGet(`/jobs/${id}`);
}
