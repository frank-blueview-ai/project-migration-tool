import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon: Icon, label, to, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-4 py-3 rounded-md transition-all
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${isActive
          ? "bg-[#1E242C] text-white border-l-4 border-blue-500"
          : "text-gray-400 hover:bg-[#1E242C] hover:text-white"}
      `
      }
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
