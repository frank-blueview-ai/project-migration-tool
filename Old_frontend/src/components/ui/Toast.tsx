// frontend/src/components/ui/Toast.tsx

export default function Toast({ message, type = "info" }) {
  const colors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div
      className={`px-4 py-2 rounded-md text-white shadow-md ${colors[type]}`}
    >
      {message}
    </div>
  );
}
