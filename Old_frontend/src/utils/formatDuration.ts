// frontend/src/utils/formatDuration.ts

export default function formatDuration(ms: number) {
  if (!Number.isFinite(ms) || ms < 0) return "0s";

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}
