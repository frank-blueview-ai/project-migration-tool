export default function Breadcrumbs({ path }) {
  const parts = path.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-gray-400 text-sm">
        <li className="hover:text-white transition">Home</li>

        {parts.map((p, i) => (
          <li key={i} className="flex items-center gap-2">
            <span>/</span>
            <span className="capitalize hover:text-white transition">
              {p}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
