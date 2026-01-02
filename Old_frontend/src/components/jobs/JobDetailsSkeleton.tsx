// frontend/src/components/jobs/JobDetailsSkeleton.tsx

import Skeleton from "../ui/Skeleton";

export default function JobDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-64 h-8" />
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-96" />
    </div>
  );
}
