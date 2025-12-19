"use client";

import type { ReactNode } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroMotion({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="min-w-0"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.div>
  );
}

export function HeroMotionItem({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div variants={reduced ? { hidden: {}, show: {} } : itemVariants}>
      {children}
    </motion.div>
  );
}
