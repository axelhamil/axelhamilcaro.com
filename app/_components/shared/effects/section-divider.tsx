"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots" | "line";
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  variant = "gradient",
  className = "",
  flip = false,
}: SectionDividerProps) {
  if (variant === "wave") {
    return (
      <div
        className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      >
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-16 sm:h-20 md:h-24"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,60 1440,50 L1440,100 L0,100 Z"
            fill="currentColor"
            className="text-secondary-background"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`flex justify-center gap-2 py-8 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={`flex justify-center py-8 ${className}`}>
        <motion.div
          className="h-px w-32 bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    );
  }

  return (
    <div className={`relative py-12 sm:py-16 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}

interface GlowingLineProps {
  className?: string;
}

export function GlowingLine({ className = "" }: GlowingLineProps) {
  return (
    <div className={`relative h-px w-full ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />
    </div>
  );
}
