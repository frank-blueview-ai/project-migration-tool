// frontend/src/hooks/useJobActions.ts

import { cancelJob, retryJob, downloadManifest, comparePaths } from "../services/jobActionsService";
import { useToast } from "../components/ui/ToastProvider";

export function useJobActions(id: string | undefined) {
  const { push } = useToast();

  async function cancel() {
    if (!id) return;
    try {
      await cancelJob(id);
      push("Job cancelled", "success");
    } catch {
      push("Failed to cancel job", "error");
    }
  }

  async function retry() {
    if (!id) return;
    try {
      await retryJob(id);
      push("Job retried", "success");
    } catch {
      push("Failed to retry job", "error");
    }
  }

  async function manifest() {
    if (!id) return;
    try {
      const data = await downloadManifest(id);
      return data;
    } catch {
      push("Failed to download manifest", "error");
    }
  }

  async function compare() {
    if (!id) return;
    try {
      const data = await comparePaths(id);
      return data;
    } catch {
      push("Failed to compare paths", "error");
    }
  }

  return { cancel, retry, manifest, compare };
}
