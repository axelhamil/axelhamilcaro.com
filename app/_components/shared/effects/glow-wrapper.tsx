"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

interface GlowWrapperProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
}

export function GlowWrapper({
  children,
  className,
  glowColor = "255, 77, 0",
  glowSize = 200,
  glowOpacity = 0.15,
}: GlowWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      ${glowSize}px circle at ${mouseX}px ${mouseY}px,
      rgba(${glowColor}, ${glowOpacity}),
      transparent 80%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
