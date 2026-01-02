// frontend/src/components/ui/Skeleton.tsx

export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-[#1E242C] rounded-md ${className}`}
    />
  );
}
