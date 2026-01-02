import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function IgnorePatternsCard() {
  const [patterns, setPatterns] = useState(["node_modules/", ".git/", "dist/"]);
  const [newPattern, setNewPattern] = useState("");

  const addPattern = () => {
    if (!newPattern.trim()) return;
    setPatterns([...patterns, newPattern.trim()]);
    setNewPattern("");
  };

  const removePattern = (p) => {
    setPatterns(patterns.filter((x) => x !== p));
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Global Ignore Patterns</h2>

      <div className="space-y-3">
        {patterns.map((p) => (
          <div
            key={p}
            className="flex items-center justify-between bg-[#0F141A] border border-[#2D333B] px-3 py-2 rounded-md"
          >
            <span>{p}</span>
            <Button variant="ghost" onClick={() => removePattern(p)}>
              Remove
            </Button>
          </div>
        ))}

        <div className="flex items-center gap-3 mt-4">
          <Input
            placeholder="Add new pattern..."
            value={newPattern}
            onChange={(e) => setNewPattern(e.target.value)}
          />
          <Button onClick={addPattern}>Add</Button>
        </div>
      </div>
    </Card>
  );
}
