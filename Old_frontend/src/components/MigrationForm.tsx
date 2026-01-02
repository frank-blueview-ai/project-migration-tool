import React, { useState } from "react";
import { enqueueMigration, MigrationRequest, JobInfo } from "../api";

interface Props {
  onJobEnqueued: (job: JobInfo) => void;
}

const MigrationForm: React.FC<Props> = ({ onJobEnqueued }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [dryRun, setDryRun] = useState(true);
  const [parallelism, setParallelism] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const body: MigrationRequest = {
        source,
        destination,
        dry_run: dryRun,
        parallelism,
      };
      const job = await enqueueMigration(body);
      onJobEnqueued(job);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <label>Source</label>
        <input value={source} onChange={(e) => setSource(e.target.value)} required />
      </div>
      <div>
        <label>Destination</label>
        <input value={destination} onChange={(e) => setDestination(e.target.value)} required />
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
      <div>
        <label>Parallelism</label>
        <input
          type="number"
          value={parallelism}
          onChange={(e) => setParallelism(Number(e.target.value))}
          min={1}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Enqueuing..." : "Enqueue Migration"}
      </button>
    </form>
  );
};

export default MigrationForm;
