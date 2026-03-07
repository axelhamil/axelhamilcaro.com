"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(
  () =>
    import("@/components/effects/custom-cursor").then((m) => ({
      default: m.CustomCursor,
    })),
  { ssr: false },
);

const EmojiRain = dynamic(
  () =>
    import("@/components/effects/emoji-rain").then((m) => ({
      default: m.EmojiRain,
    })),
  { ssr: false },
);

const ClickSpark = dynamic(
  () =>
    import("@/components/effects/emoji-rain").then((m) => ({
      default: m.ClickSpark,
    })),
  { ssr: false },
);

const KeyStatsWidget = dynamic(
  () =>
    import("@/components/shared/widgets/key-stats").then((m) => ({
      default: m.KeyStatsWidget,
    })),
  { ssr: false },
);

const ScrollProgress = dynamic(
  () =>
    import("@/components/effects/scroll-progress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false },
);

export function SiteWidgets() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <EmojiRain />
      <ClickSpark />
      <KeyStatsWidget />
    </>
  );
}
