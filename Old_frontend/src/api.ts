
export interface MigrationRequest {
  source: string;
  destination: string;
  dry_run: boolean;
  parallelism: number;
}

export interface JobInfo {
  id: string;
  type: string;
  status: string;
  created_at: number;
  updated_at: number;
}

export interface JobDetail extends JobInfo {
  payload: Record<string, any>;
  result?: Record<string, any> | null;
  logs: string[];
}

async function jsonFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  return res.json();
}

export async function enqueueMigration(body: MigrationRequest): Promise<JobInfo> {
  return jsonFetch<JobInfo>("/api/v1/migrate", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function enqueueRollback(body: {
  target: string;
  manifest_path: string;
  dry_run: boolean;
}): Promise<JobInfo> {
  return jsonFetch<JobInfo>("/api/v1/rollback", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function getJob(jobId: string): Promise<JobDetail> {
  return jsonFetch<JobDetail>(`/api/v1/jobs/${jobId}`);
}

export async function getJobLogs(jobId: string): Promise<string[]> {
  return jsonFetch<string[]>(`/api/v1/jobs/${jobId}/logs`);
}

export async function listJobs(): Promise<JobInfo[]> {
  return jsonFetch<JobInfo[]>("/api/v1/jobs");
}
