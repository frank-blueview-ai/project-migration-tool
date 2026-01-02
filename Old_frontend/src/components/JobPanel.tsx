import React, { useEffect, useState } from "react";
import { JobInfo, JobDetail, getJob, getJobLogs } from "../api";

interface Props {
  job: JobInfo | null;
}

const POLL_INTERVAL_MS = 1000;

const JobPanel: React.FC<Props> = ({ job }) => {
  const [detail, setDetail] = useState<JobDetail | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    if (!job) {
      setDetail(null);
      setLogs([]);
      setPolling(false);
      return;
    }

    let cancelled = false;
    setPolling(true);

    const poll = async () => {
      if (!job) return;
      try {
        const d = await getJob(job.id);
        if (cancelled) return;
        setDetail(d);
        const l = await getJobLogs(job.id);
        if (!cancelled) setLogs(l);

        if (d.status === "finished" || d.status === "failed") {
          setPolling(false);
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
      } catch {
        if (!cancelled) setPolling(false);
      }
    };

    poll();

    return () => {
      cancelled = true;
    };
  }, [job]);

  if (!job) return null;

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>Job</h2>
      <p>
        ID: <code>{job.id}</code> — Status: <strong>{detail?.status ?? job.status}</strong>{" "}
        {polling && "(polling)"}
      </p>
      {detail && (
        <>
          <h3>Result</h3>
          <pre>{JSON.stringify(detail.result, null, 2)}</pre>
        </>
      )}
      {logs.length > 0 && (
        <>
          <h3>Logs</h3>
          <pre>{logs.join("\n")}</pre>
        </>
      )}
    </div>
  );
};

export default JobPanel;
