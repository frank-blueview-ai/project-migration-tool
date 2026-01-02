// frontend/src/components/ui/Terminal.tsx

export default function Terminal({ lines }) {
  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-md h-96 overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
