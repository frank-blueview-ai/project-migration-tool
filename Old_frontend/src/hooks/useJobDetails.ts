// frontend/src/hooks/useJobDetails.ts

import { useEffect, useState } from "react";
import { fetchJobDetails } from "../services/jobDetailsService";

export function useJobDetails(id: string | undefined) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchJobDetails(id)
      .then(setData)
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading };
}
