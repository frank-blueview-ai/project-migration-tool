// frontend/src/services/jobActionsService.ts

import { apiPost, apiGet } from "./api";

export function cancelJob(id: string) {
  return apiPost(`/jobs/${id}/cancel`, {});
}

export function retryJob(id: string) {
  return apiPost(`/jobs/${id}/retry`, {});
}

export function downloadManifest(id: string) {
  return apiGet(`/jobs/${id}/manifest`);
}

export function comparePaths(id: string) {
  return apiGet(`/jobs/${id}/compare`);
}
