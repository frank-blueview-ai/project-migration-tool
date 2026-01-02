// frontend/src/hooks/useSettings.ts

import { useEffect, useState } from "react";
import { fetchSettings, updateSettings, clearHistory } from "../services/settingsService";
import { useToast } from "../components/ui/ToastProvider";

export function useSettings() {
  const [settings, setSettings] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    fetchSettings().then(setSettings);
  }, []);

  async function save(newSettings) {
    await updateSettings(newSettings);
    push("Settings saved", "success");
  }

  async function clear() {
    await clearHistory();
    push("History cleared", "success");
  }

  return { settings, save, clear };
}
