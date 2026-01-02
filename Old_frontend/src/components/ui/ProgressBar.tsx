// frontend/src/components/ui/ProgressBar.tsx

export default function ProgressBar({ value }) {
  return (
    <div className="w-full h-2 bg-[#0F141A] rounded-md overflow-hidden border border-[#2D333B]">
      <div
        className="h-full bg-blue-600 transition-all duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
