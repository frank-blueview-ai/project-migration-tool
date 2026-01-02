// frontend/src/components/jobs/JobActions.tsx

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { useState } from "react";
import { useJobActions } from "../../hooks/useJobActions";

export default function JobActions({ jobId, status }) {
  const { cancel, retry, manifest, compare } = useJobActions(jobId);

  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmRetry, setConfirmRetry] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {/* CANCEL */}
      {status === "running" && (
        <>
          <Button variant="danger" onClick={() => setConfirmCancel(true)}>
            Cancel Job
          </Button>

          <Modal open={confirmCancel} onClose={() => setConfirmCancel(false)}>
            <h2 className="text-xl font-semibold mb-4">Cancel Job?</h2>
            <p className="text-gray-400 mb-4">
              This will stop the job immediately. This action cannot be undone.
            </p>
            <Button
              variant="danger"
              onClick={() => {
                cancel();
                setConfirmCancel(false);
              }}
            >
              Confirm Cancel
            </Button>
          </Modal>
        </>
      )}

      {/* RETRY */}
      {status === "failed" && (
        <>
          <Button onClick={() => setConfirmRetry(true)}>Retry Job</Button>

          <Modal open={confirmRetry} onClose={() => setConfirmRetry(false)}>
            <h2 className="text-xl font-semibold mb-4">Retry Job?</h2>
            <p className="text-gray-400 mb-4">
              This will enqueue a new job using the same parameters.
            </p>
            <Button
              onClick={() => {
                retry();
                setConfirmRetry(false);
              }}
            >
              Confirm Retry
            </Button>
          </Modal>
        </>
      )}

      {/* MANIFEST */}
      <Button
        variant="ghost"
        onClick={async () => {
          const data = await manifest();
          console.log("Manifest:", data);
        }}
      >
        Download Manifest
      </Button>

      {/* COMPARE */}
      <Button
        variant="ghost"
        onClick={async () => {
          const data = await compare();
          console.log("Compare:", data);
        }}
      >
        Compare Paths
      </Button>
    </div>
  );
}
