// frontend/src/components/ui/StatCard.tsx

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#161B22] border border-[#2D333B] rounded-lg p-4 flex items-center gap-4">
      <div className="p-2 bg-[#0F141A] rounded-md border border-[#2D333B]">
        <Icon size={20} className="text-gray-300" />
      </div>

      <div>
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-lg font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}
