import { Search } from "lucide-react";

export default function JobSearch({ search, setSearch }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search jobs..."
        className="bg-[#0F141A] border border-[#2D333B] rounded-md px-10 py-2 text-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
