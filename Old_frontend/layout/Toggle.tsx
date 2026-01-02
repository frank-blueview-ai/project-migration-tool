export default function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full transition-all relative
        ${checked ? "bg-blue-600" : "bg-gray-600"}`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all
          ${checked ? "translate-x-6" : ""}`}
      />
    </button>
  );
}
