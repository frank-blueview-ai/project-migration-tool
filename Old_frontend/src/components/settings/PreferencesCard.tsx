import { useState } from "react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";

export default function PreferencesCard() {
  const [darkMode, setDarkMode] = useState(true);
  const [animations, setAnimations] = useState(true);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">UI Preferences</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>

        <div className="flex items-center justify-between">
          <span>Animations</span>
          <Toggle checked={animations} onChange={setAnimations} />
        </div>
      </div>
    </Card>
  );
}
