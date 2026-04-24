"use client";

import { createContext, type ReactNode, useContext, useState } from "react";
import {
  type AnalyticsData,
  type DateRange,
  type RefreshInterval,
  useAnalytics,
} from "@/src/features/admin-analytics/hooks/use-analytics";

interface AnalyticsContextValue {
  data: AnalyticsData | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  refresh: () => void;
  days: number;
  dateRange: DateRange;
  refreshInterval: RefreshInterval;
  setRefreshInterval: (value: RefreshInterval) => void;
  showCustomRange: boolean;
  setShowCustomRange: (value: boolean) => void;
  customFrom: string;
  setCustomFrom: (value: string) => void;
  customTo: string;
  setCustomTo: (value: string) => void;
  handlePresetClick: (days: number) => void;
  handleCustomRangeApply: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [days, setDays] = useState(30);
  const [dateRange, setDateRange] = useState<DateRange>(null);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<RefreshInterval>(0);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const {
    analytics: data,
    isLoading,
    isRefreshing,
    refresh,
  } = useAnalytics({ days, dateRange, refreshInterval });

  const handlePresetClick = (presetDays: number) => {
    setDays(presetDays);
    setDateRange(null);
    setShowCustomRange(false);
  };

  const handleCustomRangeApply = () => {
    if (customFrom && customTo) {
      setDateRange({
        from: new Date(customFrom),
        to: new Date(`${customTo}T23:59:59`),
      });
      setShowCustomRange(false);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        data,
        isLoading,
        isRefreshing,
        refresh,
        days,
        dateRange,
        refreshInterval,
        setRefreshInterval,
        showCustomRange,
        setShowCustomRange,
        customFrom,
        setCustomFrom,
        customTo,
        setCustomTo,
        handlePresetClick,
        handleCustomRangeApply,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error(
      "useAnalyticsContext must be used inside AnalyticsProvider",
    );
  }
  return ctx;
}
