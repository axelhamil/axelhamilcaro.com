import type { AnalyticsData } from "@/src/features/admin-analytics/hooks/use-analytics";

export interface Insight {
  type: "positive" | "negative" | "neutral";
  message: string;
}

export function generateInsights(data: AnalyticsData): Insight[] {
  const insights: Insight[] = [];

  if (data.comparison.viewsChange > 10) {
    insights.push({
      type: "positive",
      message: `+${data.comparison.viewsChange}% de vues vs période précédente`,
    });
  } else if (data.comparison.viewsChange < -10) {
    insights.push({
      type: "negative",
      message: `${data.comparison.viewsChange}% de vues vs période précédente`,
    });
  }

  if (data.comparison.leadsChange > 0) {
    insights.push({
      type: "positive",
      message: `+${data.comparison.leadsChange}% de leads capturés`,
    });
  }

  if (data.overview.conversionRate > 0) {
    insights.push({
      type: "neutral",
      message: `Taux de conversion: ${data.overview.conversionRate}%`,
    });
  }

  if (data.peakTimes.hourLabel) {
    insights.push({
      type: "neutral",
      message: `Pic d'activité: ${data.peakTimes.hourLabel} le ${data.peakTimes.dayLabel}`,
    });
  }

  const mobileViews = data.viewsByDevice.find((d) => d.device === "mobile");
  const totalDevices = data.viewsByDevice.reduce((acc, d) => acc + d.count, 0);
  if (mobileViews && totalDevices > 0) {
    const mobilePercent = Math.round((mobileViews.count / totalDevices) * 100);
    if (mobilePercent > 50) {
      insights.push({
        type: "neutral",
        message: `${mobilePercent}% du trafic est mobile`,
      });
    }
  }

  if (data.topLinks.length > 0 && data.topLinks[0].clicks > 5) {
    insights.push({
      type: "positive",
      message: `"${data.topLinks[0].title}" est le plus cliqué`,
    });
  }

  return insights.slice(0, 4);
}
