// frontend/src/components/jobs/JobGridSkeleton.tsx

import JobCardSkeleton from "./JobCardSkeleton";

export default function JobGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
    </div>
  );
}
