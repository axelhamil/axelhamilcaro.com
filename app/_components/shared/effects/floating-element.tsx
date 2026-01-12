"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  duration = 3,
  distance = 10,
  delay = 0,
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RotatingGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

export function RotatingGlow({
  className,
  size = 200,
  color = "var(--accent)",
}: RotatingGlowProps) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
}

interface PulsingDotProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function PulsingDot({
  className,
  color = "#22c55e",
  size = "md",
}: PulsingDotProps) {
  const sizeMap = {
    sm: { dot: 6 },
    md: { dot: 8 },
    lg: { dot: 10 },
  };

  const { dot } = sizeMap[size];

  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <motion.span
        className="absolute rounded-full"
        style={{
          width: dot + 8,
          height: dot + 8,
          backgroundColor: color,
          filter: "blur(4px)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <span
        className="relative rounded-full shadow-sm"
        style={{
          width: dot,
          height: dot,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    </span>
  );
}
