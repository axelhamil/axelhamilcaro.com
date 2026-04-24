"use client";

import dynamic from "next/dynamic";

const EmojiRain = dynamic(
  () =>
    import("@/src/shared/ui/effects/emoji-rain").then((m) => ({
      default: m.EmojiRain,
    })),
  { ssr: false },
);

const ClickSpark = dynamic(
  () =>
    import("@/src/shared/ui/effects/emoji-rain").then((m) => ({
      default: m.ClickSpark,
    })),
  { ssr: false },
);

const KeyStatsWidget = dynamic(
  () =>
    import("@/src/shared/ui/widgets/key-stats").then((m) => ({
      default: m.KeyStatsWidget,
    })),
  { ssr: false },
);

const ScrollProgress = dynamic(
  () =>
    import("@/src/shared/ui/effects/scroll-progress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false },
);

export function SiteWidgets() {
  return (
    <>
      <ScrollProgress />
      <EmojiRain />
      <ClickSpark />
      <KeyStatsWidget />
    </>
  );
}
