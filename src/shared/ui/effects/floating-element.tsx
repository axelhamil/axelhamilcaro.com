"use client";

import { motion } from "framer-motion";

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
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
    >
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
