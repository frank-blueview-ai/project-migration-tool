import { useState } from "react";
import Card from "../components/ui/Card";
import JobGrid from "../components/jobs/JobGrid";
import JobFilters from "../components/jobs/JobFilters";
import JobSearch from "../components/jobs/JobSearch";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    range: "24h",
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Jobs</h1>

      <Card>
        <div className="flex items-center justify-between">
          <JobFilters filters={filters} setFilters={setFilters} />
          <JobSearch search={search} setSearch={setSearch} />
        </div>
      </Card>

      <JobGrid search={search} filters={filters} />
    </div>
  );
}
