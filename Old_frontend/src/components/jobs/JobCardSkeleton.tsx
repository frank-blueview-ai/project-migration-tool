// frontend/src/components/jobs/JobCardSkeleton.tsx

import Skeleton from "../ui/Skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="bg-[#161B22] border border-[#2D333B] rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-10 h-4" />
      </div>

      <Skeleton className="w-32 h-6 mb-3" />
      <Skeleton className="w-full h-2" />
    </div>
  );
}
