// frontend/src/components/ui/Badge.tsx

const colors = {
  running: "bg-blue-600",
  pending: "bg-gray-600",
  completed: "bg-green-600",
  failed: "bg-red-600",
};

export default function Badge({ status }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-md text-white ${colors[status] || "bg-gray-600"}`}
    >
      {status}
    </span>
  );
}
