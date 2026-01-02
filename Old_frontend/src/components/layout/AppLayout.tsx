import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Breadcrumbs from "./Breadcrumbs";
import { useHotkeys } from "../../hooks/useHotkeys";
import { useLocation } from "react-router-dom";

export default function AppLayout({ children }) {
  useHotkeys(); // global keyboard shortcuts
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#0D1117] text-[#E6EDF3]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />

        <div className="px-8 pt-4">
          <Breadcrumbs path={location.pathname} />
        </div>

        {/* Page transition wrapper */}
        <div
          key={location.pathname}
          className="p-8 overflow-y-auto animate-fade-slide"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
