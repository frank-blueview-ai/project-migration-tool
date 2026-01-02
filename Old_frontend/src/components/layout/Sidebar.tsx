import { useSidebar } from "../../hooks/useSidebar";
import SidebarItem from "./SidebarItem";
import {
  LayoutDashboard,
  PlayCircle,
  History,
  Upload,
  RotateCcw,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const { collapsed, toggle } = useSidebar();

  return (
    <nav
      className={`h-full border-r border-[#2D333B] bg-[#161B22] transition-all duration-200 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h1 className="text-xl font-bold">Migrate</h1>}
          <button onClick={toggle} className="text-gray-400 hover:text-white">
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <div className="flex-1 space-y-1">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" collapsed={collapsed} />
          <SidebarItem icon={PlayCircle} label="Active Jobs" to="/jobs" collapsed={collapsed} />
          <SidebarItem icon={History} label="History" to="/jobs?filter=completed" collapsed={collapsed} />
          <SidebarItem icon={Upload} label="Migrate" to="/migrate" collapsed={collapsed} />
          <SidebarItem icon={RotateCcw} label="Rollback" to="/migrate#rollback" collapsed={collapsed} />
          <SidebarItem icon={Settings} label="Settings" to="/settings" collapsed={collapsed} />
        </div>
      </div>
    </nav>
  );
}
