// frontend/src/components/dashboard/RecentJobsSkeleton.tsx

import JobCardSkeleton from "../jobs/JobCardSkeleton";

export default function RecentJobsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <JobCardSkeleton />
      <JobCardSkeleton />
      <JobCardSkeleton />
    </div>
  );
}
