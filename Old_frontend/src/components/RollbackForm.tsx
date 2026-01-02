import React, { useState } from "react";
import { enqueueRollback, JobInfo } from "../api";

interface Props {
  onJobEnqueued: (job: JobInfo) => void;
}

const RollbackForm: React.FC<Props> = ({ onJobEnqueued }) => {
  const [target, setTarget] = useState("");
  const [manifestPath, setManifestPath] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const job = await enqueueRollback({
        target,
        manifest_path: manifestPath,
        dry_run: dryRun,
      });
      onJobEnqueued(job);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ marginTop: "1rem" }}>
      <h2>Rollback</h2>
      <div>
        <label>Target directory</label>
        <input value={target} onChange={(e) => setTarget(e.target.value)} required />
      </div>
      <div>
        <label>Manifest path</label>
        <input
          value={manifestPath}
          onChange={(e) => setManifestPath(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={dryRun}
            onChange={(e) => setDryRun(e.target.checked)}
          />
          Dry run
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Enqueuing..." : "Enqueue Rollback"}
      </button>
    </form>
  );
};

export default RollbackForm;
