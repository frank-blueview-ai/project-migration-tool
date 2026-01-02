// frontend/src/hooks/useLogs.ts

import { useEffect, useState } from "react";
import { fetchLogs, streamLogs } from "../services/logsService";
import { usePolling } from "./usePolling";

export function useLogs(id: string | undefined) {
  const [lines, setLines] = useState<string[]>([]);
  const [usingStream, setUsingStream] = useState(false);

  // Try SSE first
  useEffect(() => {
    if (!id) return;

    let source: EventSource | null = null;

    try {
      source = streamLogs(id);
      setUsingStream(true);

      source.onmessage = (event) => {
        // Expecting backend to send { line: "..." } or { lines: [...] }
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data.lines)) {
            setLines(data.lines);
          } else if (data.line) {
            setLines((prev) => [...prev, data.line]);
          }
        } catch {
          // If not JSON, assume plain text line
          setLines((prev) => [...prev, event.data]);
        }
      };

      source.onerror = () => {
        // On error, close and fall back to polling
        source?.close();
        setUsingStream(false);
      };
    } catch {
      setUsingStream(false);
    }

    return () => {
      source?.close();
    };
  }, [id]);

  // Polling fallback
  usePolling(
    () => {
      if (!id || usingStream) return;
      fetchLogs(id).then((res) => {
        if (Array.isArray(res.lines)) {
          setLines(res.lines);
        }
      });
    },
    1500,
    Boolean(id && !usingStream)
  );

  return { lines, usingStream };
}
