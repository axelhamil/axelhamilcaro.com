export const easing = {
  expoOut: [0.22, 1, 0.36, 1] as const,
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

export type EasingKey = keyof typeof easing;
