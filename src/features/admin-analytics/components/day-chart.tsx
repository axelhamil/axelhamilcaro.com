"use client";

export function DayChart({
  data,
}: {
  data: Array<{ day: number; dayLabel: string; count: number }>;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="flex items-end gap-1 h-20">
      {days.map((dayLabel, day) => {
        const dayData = data.find((d) => d.day === day);
        const count = dayData?.count || 0;
        const height = count > 0 ? Math.max((count / maxCount) * 100, 10) : 5;
        return (
          <div
            key={dayLabel}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div
              className="w-full bg-[var(--admin-accent)] rounded-t opacity-60 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
              title={`${dayLabel}: ${count} vues`}
            />
            <span className="text-[10px] text-[var(--admin-text-muted)]">
              {dayLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}
