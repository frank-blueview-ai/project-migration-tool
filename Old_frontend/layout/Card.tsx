export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#161B22] border border-[#2D333B] rounded-lg p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
