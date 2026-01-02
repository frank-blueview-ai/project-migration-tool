// frontend/src/components/ui/Tooltip.tsx

import { useState } from "react";

export default function Tooltip({ text, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      {open && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg whitespace-nowrap">
          {text}
        </div>
      )}
    </span>
  );
}
