// frontend/src/components/dashboard/StatsOverviewSkeleton.tsx

import Skeleton from "../ui/Skeleton";

export default function StatsOverviewSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
