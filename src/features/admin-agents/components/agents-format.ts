import type { McpOriginCategory } from "@/src/features/admin-agents/hooks/use-mcp-stats";

const PARIS = "Europe/Paris";

const absoluteFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: PARIS,
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const dayFormat = new Intl.DateTimeFormat("fr-FR", {
  timeZone: PARIS,
  weekday: "short",
  day: "numeric",
  month: "short",
});

const relativeFormat = new Intl.RelativeTimeFormat("fr-FR", {
  numeric: "auto",
  style: "short",
});

const RELATIVE_STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

export function formatAbsolute(value: string | null) {
  return value ? `${absoluteFormat.format(new Date(value))} (Paris)` : "-";
}

export function formatRelative(value: string | null, now = Date.now()) {
  if (!value) return "jamais";

  const seconds = Math.round((new Date(value).getTime() - now) / 1000);
  const step = RELATIVE_STEPS.find(([, size]) => Math.abs(seconds) >= size);
  if (!step) return "à l'instant";

  const [unit, size] = step;
  return relativeFormat.format(Math.round(seconds / size), unit);
}

export function formatDay(day: string) {
  return dayFormat.format(new Date(`${day}T12:00:00Z`));
}

export function formatShortDay(day: string) {
  const [, month, date] = day.split("-");
  return `${date}/${month}`;
}

export function formatDuration(ms: number | null) {
  if (ms === null) return "-";
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${Math.round(ms)} ms`;
}

export function formatPlace(city: string | null, country: string | null) {
  if (city && country) return `${city}, ${country}`;
  return city ?? country ?? "-";
}

const CATEGORY_NAMES: Record<McpOriginCategory, [string, string]> = {
  agent: ["agent", "agents"],
  scanner: ["scanner", "scanners"],
  outil: ["outil", "outils"],
  navigateur: ["navigateur", "navigateurs"],
  inconnu: ["inconnu", "inconnus"],
};

export function categoryName(category: McpOriginCategory, count = 1) {
  const [one, many] = CATEGORY_NAMES[category];
  return count > 1 ? many : one;
}

export function formatPeriod(days: number) {
  if (days === 1) return "les dernières 24 h";
  return `les ${days} derniers jours`;
}

export function formatHidden(
  total: number,
  byCategory: { category: McpOriginCategory; count: number }[],
) {
  const detail = byCategory
    .map(({ category, count }) => `${count} ${categoryName(category, count)}`)
    .join(", ");

  return `${total} ${total > 1 ? "masqués" : "masqué"} : ${detail}`;
}
