// frontend/src/components/jobs/JobLogs.tsx

import { useState, useRef, useEffect } from "react";
import Card from "../ui/Card";
import Terminal from "../ui/Terminal";
import { useLogs } from "../../hooks/useLogs";
import Input from "../ui/Input";

export default function JobLogs({ jobId }) {
  const { lines, usingStream } = useLogs(jobId);

  const [filter, setFilter] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);

  const containerRef = useRef(null);

  // Auto-scroll unless user scrolls up
  useEffect(() => {
    if (!autoScroll) return;
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, autoScroll]);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;

    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 20;
    setAutoScroll(atBottom);
  }

  const filtered = filter
    ? lines.filter((l) => l.toLowerCase().includes(filter.toLowerCase()))
    : lines;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Logs</h2>
        <span className="text-xs text-gray-500">
          {usingStream ? "Live (SSE)" : "Live (polling)"}
        </span>
      </div>

      <Input
        placeholder="Search logs..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="bg-black text-green-400 font-mono p-4 rounded-md h-96 overflow-y-auto"
      >
        <Terminal lines={filtered} />
      </div>
    </Card>
  );
}
