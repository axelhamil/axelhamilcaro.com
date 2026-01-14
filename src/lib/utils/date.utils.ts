export function formatDate(date: Date | null, locale = "fr-FR"): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | null, locale = "fr-FR"): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatDate(date);
  }
  if (days > 0) {
    return `il y a ${days}j`;
  }
  if (hours > 0) {
    return `il y a ${hours}h`;
  }
  if (minutes > 0) {
    return `il y a ${minutes}min`;
  }
  return "à l'instant";
}
