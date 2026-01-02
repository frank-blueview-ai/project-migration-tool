export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-all duration-150 focus:outline-none";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white",
    danger: "bg-amber-600 hover:bg-amber-500 text-white",
    secondary: "bg-[#1E242C] hover:bg-[#2D333B] text-gray-200",
    ghost: "bg-transparent hover:bg-[#1E242C] text-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}
