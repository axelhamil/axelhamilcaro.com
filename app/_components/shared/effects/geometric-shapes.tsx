"use client";

import { motion } from "framer-motion";

interface FloatingCircleProps {
  size?: number;
  color?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  duration?: number;
  blur?: boolean;
}

export const FloatingCircle = ({
  size = 100,
  color = "var(--accent)",
  top,
  left,
  right,
  bottom,
  delay = 0,
  duration = 8,
  blur = true,
}: FloatingCircleProps) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: color,
      opacity: 0.08,
      top,
      left,
      right,
      bottom,
      filter: blur ? "blur(40px)" : "none",
    }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
);

interface DotGridProps {
  rows?: number;
  cols?: number;
  gap?: number;
  dotSize?: number;
  className?: string;
}

export const DotGrid = ({
  rows = 5,
  cols = 5,
  gap = 24,
  dotSize = 4,
  className = "",
}: DotGridProps) => (
  <div
    className={`absolute pointer-events-none ${className}`}
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, ${dotSize}px)`,
      gridTemplateRows: `repeat(${rows}, ${dotSize}px)`,
      gap,
    }}
  >
    {Array.from({ length: rows * cols }).map((_, i) => (
      <motion.div
        key={i}
        className="rounded-full bg-accent/20"
        style={{ width: dotSize, height: dotSize }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: i * 0.02,
          duration: 0.3,
        }}
      />
    ))}
  </div>
);

interface DiagonalLinesProps {
  count?: number;
  className?: string;
  direction?: "left" | "right";
}

export const DiagonalLines = ({
  count = 5,
  className = "",
  direction = "right",
}: DiagonalLinesProps) => (
  <div className={`absolute overflow-hidden pointer-events-none ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        style={{
          width: "200%",
          top: `${(i + 1) * (100 / (count + 1))}%`,
          left: "-50%",
          transform: `rotate(${direction === "right" ? "-15deg" : "15deg"})`,
        }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.6 }}
      />
    ))}
  </div>
);

interface GlowOrbProps {
  size?: number;
  color?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  intensity?: "low" | "medium" | "high";
}

export const GlowOrb = ({
  size = 300,
  color = "var(--accent)",
  position = { top: "50%", left: "50%" },
  intensity = "medium",
}: GlowOrbProps) => {
  const opacityMap = { low: 0.03, medium: 0.06, high: 0.1 };

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: opacityMap[intensity],
        ...position,
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacityMap[intensity], opacityMap[intensity] * 1.5, opacityMap[intensity]],
      }}
      transition={{
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    />
  );
};

interface GeometricBackgroundProps {
  variant?: "circles" | "dots" | "lines" | "mixed";
  className?: string;
}

export const GeometricBackground = ({
  variant = "mixed",
  className = "",
}: GeometricBackgroundProps) => {
  if (variant === "circles") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <FloatingCircle size={200} top="10%" left="5%" delay={0} />
        <FloatingCircle size={150} top="60%" right="10%" delay={2} color="var(--accent)" />
        <FloatingCircle size={100} bottom="20%" left="30%" delay={4} />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <DotGrid rows={6} cols={6} className="top-10 right-10 opacity-50" />
        <DotGrid rows={4} cols={4} className="bottom-20 left-10 opacity-30" />
      </div>
    );
  }

  if (variant === "lines") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <DiagonalLines count={4} className="inset-0" direction="right" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <FloatingCircle size={180} top="5%" left="10%" delay={0} />
      <FloatingCircle size={120} bottom="15%" right="5%" delay={3} />
      <DotGrid rows={4} cols={4} gap={20} className="top-1/4 right-20 opacity-40" />
      <GlowOrb position={{ top: "50%", right: "0" }} intensity="low" />
    </div>
  );
};
