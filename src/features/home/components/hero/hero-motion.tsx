import type { ReactNode } from "react";

export default function HeroMotion({ children }: { children: ReactNode }) {
  return <div className="min-w-0 hero-stagger">{children}</div>;
}

export function HeroMotionItem({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
