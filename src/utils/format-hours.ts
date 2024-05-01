export function formatSecondsToHours(seconds: number, mode?: "short" | "long") {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  if (minutes > 59) {
    const hours = minutes / 60;

    const formattedHours = String(Math.round(hours)).padStart(2, "0");
    if (mode === "short" || !mode) return `${formattedHours} h`;
    else return `${formattedHours} horas`;
  }
  if (mode === "short" || !mode) return `${formattedMinutes} min`;
  else return `${formattedMinutes} minutos`;
}
