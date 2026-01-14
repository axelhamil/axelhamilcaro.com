export const springConfigs = {
  gentle: { damping: 20, stiffness: 150 },
  snappy: { damping: 15, stiffness: 300 },
  bouncy: { damping: 10, stiffness: 400 },
} as const;

export type SpringConfigKey = keyof typeof springConfigs;
