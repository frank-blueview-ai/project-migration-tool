// frontend/src/components/layout/TopBar.tsx

import { Menu } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";

export default function TopBar() {
  const { toggle } = useSidebar();

  return (
    <header className="h-14 border-b border-[#2D333B] bg-[#161B22] flex items-center px-4">
      <button
        onClick={toggle}
        className="text-gray-300 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <div className="flex-1" />

      <div className="text-gray-400 text-sm">
        Project Migrate
      </div>
    </header>
  );
}
