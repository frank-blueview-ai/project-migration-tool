import Button from "../ui/Button";

export default function JobFilters({ filters, setFilters }) {
  const statuses = ["all", "pending", "running", "completed", "failed"];
  const types = ["all", "migration", "rollback"];
  const ranges = ["1h", "24h", "7d", "all"];

  return (
    <div className="flex items-center gap-4">
      {/* STATUS FILTER */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="bg-[#0F141A] border border-[#2D333B] rounded-md px-3 py-2 text-gray-200"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      {/* TYPE FILTER */}
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="bg-[#0F141A] border border-[#2D333B] rounded-md px-3 py-2 text-gray-200"
      >
        {types.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      {/* TIME RANGE */}
      <select
        value={filters.range}
        onChange={(e) => setFilters({ ...filters, range: e.target.value })}
        className="bg-[#0F141A] border border-[#2D333B] rounded-md px-3 py-2 text-gray-200"
      >
        {ranges.map((r) => (
          <option key={r} value={r}>
            {r.toUpperCase()}
          </option>
        ))}
      </select>

      {/* CLEAR FILTERS */}
      <Button
        variant="ghost"
        onClick={() =>
          setFilters({ status: "all", type: "all", range: "24h" })
        }
      >
        Clear
      </Button>
    </div>
  );
}
