import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0D1117] text-[#E6EDF3]">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
