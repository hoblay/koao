export function formatTime(date: Date) {
  var seconds = Math.floor((+new Date() - +date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return "há " + Math.floor(interval) + " anos";
  }
  if (interval === 1) {
    return "há 1 ano";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return "há " + Math.floor(interval) + " meses";
  }
  if (interval === 1) {
    return "há 1 mês";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return "há " + Math.floor(interval) + " dias";
  }
  if (interval === 1) {
    return "ontem";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return "há " + Math.floor(interval) + " horas";
  }
  if (interval === 1) {
    return "há 1 hora";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return "há " + Math.floor(interval) + " minutos";
  }
  if (interval === 1) {
    return "há 1 minuto";
  }
  if (seconds < 20) {
    return "agora";
  }
  return "há " + Math.floor(seconds) + " segundos";
}
