"use client";

interface WeekChartProps {
  data: Array<{ date: string; count: number }>;
  color?: "accent" | "purple";
}

const DAY_NAMES = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

const COLOR_CLASSES = {
  accent: {
    bar: "bg-[var(--admin-accent)]",
    text: "text-[var(--admin-accent)]",
  },
  purple: {
    bar: "bg-purple-500",
    text: "text-purple-500",
  },
} as const;

export function WeekChart({ data, color = "accent" }: WeekChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((acc, d) => acc + d.count, 0);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();
    const found = data.find((d) => d.date === dateStr);
    return {
      date: dateStr,
      dayLabel: DAY_NAMES[dayOfWeek],
      count: found?.count || 0,
      isToday: i === 6,
    };
  });

  const colors = COLOR_CLASSES[color];

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-20">
        {last7Days.map((d) => {
          const height =
            d.count > 0 ? Math.max((d.count / maxCount) * 100, 12) : 6;
          return (
            <div
              key={d.date}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span
                className={`text-[10px] font-medium ${d.count > 0 ? colors.text : "text-[var(--admin-text-subtle)]"}`}
              >
                {d.count > 0 ? d.count : ""}
              </span>
              <div
                className={`w-full ${colors.bar} rounded-t transition-all hover:opacity-80 ${d.isToday ? "opacity-100" : "opacity-60"}`}
                style={{ height: `${height}%` }}
              />
              <span
                className={`text-[10px] ${d.isToday ? "font-semibold text-[var(--admin-text)]" : "text-[var(--admin-text-muted)]"}`}
              >
                {d.dayLabel}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--admin-text-muted)] pt-1 border-t border-[var(--admin-border)]">
        <span>
          Total: <span className={`font-semibold ${colors.text}`}>{total}</span>
        </span>
        <span>
          Moy:{" "}
          <span className={`font-semibold ${colors.text}`}>
            {Math.round(total / 7)}
          </span>
          /jour
        </span>
      </div>
    </div>
  );
}
