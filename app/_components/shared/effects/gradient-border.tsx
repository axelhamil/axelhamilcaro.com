"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: number;
  gradientColors?: string[];
  animationDuration?: number;
  bgColor?: string;
}

export function GradientBorder({
  children,
  className,
  borderWidth = 2,
  borderRadius = 12,
  gradientColors = ["#ff4d00", "#8b5cf6", "#06b6d4", "#ff4d00"],
  animationDuration = 3,
  bgColor = "var(--color-primary-background)",
}: GradientBorderProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ padding: borderWidth, borderRadius }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          borderRadius,
          background: `conic-gradient(from 0deg, ${gradientColors.join(", ")})`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <div
        className="relative h-full w-full"
        style={{
          borderRadius: borderRadius - borderWidth,
          backgroundColor: bgColor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
