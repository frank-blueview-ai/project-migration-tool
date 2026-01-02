// frontend/src/utils/formatDate.ts

export default function formatDate(date: string | number | Date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleString();
}
