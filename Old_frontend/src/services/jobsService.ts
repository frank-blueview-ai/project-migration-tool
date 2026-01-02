// frontend/src/services/jobsService.ts

import { apiGet } from "./api";

export function fetchJobs(params: {
  search?: string;
  status?: string;
  type?: string;
  range?: string;
}) {
  const query = new URLSearchParams(params as any).toString();
  return apiGet(`/jobs?${query}`);
}
