import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react";
import type { RefreshInterval } from "@/src/features/admin-analytics/hooks/use-analytics";

export const deviceIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  unknown: Laptop,
};

export const presetRanges = [
  { label: "7j", days: 7 },
  { label: "30j", days: 30 },
  { label: "90j", days: 90 },
  { label: "180j", days: 180 },
  { label: "1an", days: 365 },
];

export const refreshOptions: { label: string; value: RefreshInterval }[] = [
  { label: "Off", value: 0 },
  { label: "5s", value: 5000 },
  { label: "10s", value: 10000 },
  { label: "15s", value: 15000 },
  { label: "30s", value: 30000 },
];
