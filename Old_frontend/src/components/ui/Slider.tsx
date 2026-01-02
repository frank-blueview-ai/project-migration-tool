// frontend/src/components/ui/Slider.tsx

export default function Slider({ value, onChange, min = 1, max = 16 }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-blue-500 cursor-pointer"
    />
  );
}
