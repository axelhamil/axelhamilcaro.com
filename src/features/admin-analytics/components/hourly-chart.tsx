"use client";

export function HourlyChart({
  data,
}: {
  data: Array<{ hour: number; count: number }>;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex items-end gap-0.5 h-16">
      {hours.map((hour) => {
        const hourData = data.find((d) => d.hour === hour);
        const count = hourData?.count || 0;
        const height = count > 0 ? Math.max((count / maxCount) * 100, 8) : 4;
        return (
          <div
            key={hour}
            className="flex-1 bg-[var(--admin-accent)] rounded-t opacity-60 hover:opacity-100 transition-opacity"
            style={{ height: `${height}%` }}
            title={`${hour}h: ${count} vues`}
          />
        );
      })}
    </div>
  );
}
