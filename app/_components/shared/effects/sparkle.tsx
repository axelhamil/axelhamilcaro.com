"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useCallback, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SPARKLE_COLORS = ["#ff4d00", "#fbbf24", "#fff", "#ff6b2c"];

interface SparkleWrapperProps {
  children: ReactNode;
  className?: string;
  sparkleCount?: number;
}

export function SparkleWrapper({
  children,
  className = "",
  sparkleCount = 3,
}: SparkleWrapperProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const createSparkle = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const newSparkles: Sparkle[] = [];

      for (let i = 0; i < sparkleCount; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: e.clientX - rect.left + (Math.random() - 0.5) * 40,
          y: e.clientY - rect.top + (Math.random() - 0.5) * 40,
          size: Math.random() * 10 + 5,
          color:
            SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        });
      }

      setSparkles((prev) => [...prev, ...newSparkles]);

      setTimeout(() => {
        setSparkles((prev) =>
          prev.filter((s) => !newSparkles.find((n) => n.id === s.id)),
        );
      }, 700);
    },
    [sparkleCount],
  );

  return (
    <div className={`relative ${className}`} onMouseMove={createSparkle}>
      {children}
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.svg
            key={sparkle.id}
            className="absolute pointer-events-none"
            style={{
              left: sparkle.x - sparkle.size / 2,
              top: sparkle.y - sparkle.size / 2,
              width: sparkle.size,
              height: sparkle.size,
            }}
            viewBox="0 0 24 24"
            initial={{ scale: 0, rotate: 0, opacity: 1 }}
            animate={{ scale: 1, rotate: 180, opacity: 0, y: -20 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <path
              d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
              fill={sparkle.color}
            />
          </motion.svg>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface GlowingTextProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingText({
  children,
  className = "",
  glowColor = "var(--accent)",
}: GlowingTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      <motion.span
        className="absolute inset-0 blur-lg opacity-0"
        style={{ color: glowColor }}
        variants={{
          hover: { opacity: 0.5 },
        }}
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </motion.span>
  );
}

interface BouncyEmojiProps {
  emoji: string;
  className?: string;
  delay?: number;
}

export function BouncyEmoji({
  emoji,
  className = "",
  delay = 0,
}: BouncyEmojiProps) {
  return (
    <motion.span
      className={`inline-block cursor-default select-none ${className}`}
      animate={{
        y: [0, -8, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.4,
        rotate: 360,
        transition: { duration: 0.3 },
      }}
    >
      {emoji}
    </motion.span>
  );
}

interface WobbleCardProps {
  children: ReactNode;
  className?: string;
}

export function WobbleCard({ children, className = "" }: WobbleCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isHovered
          ? {
              rotate: [0, -1, 1, -1, 1, 0],
              transition: { duration: 0.5 },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
}
