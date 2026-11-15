"use client";

import dynamic from "next/dynamic";

const KeyStatsWidget = dynamic(
  () =>
    import("@/src/shared/ui/widgets/key-stats").then((m) => ({
      default: m.KeyStatsWidget,
    })),
  { ssr: false },
);

export function SiteWidgets() {
  return <KeyStatsWidget />;
}
