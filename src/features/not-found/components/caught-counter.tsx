"use client";

import { motion } from "framer-motion";

interface CaughtCounterProps {
  count: number;
  total: number;
}

export function CaughtCounter({ count, total }: CaughtCounterProps) {
  const percentage = (count / total) * 100;

  return (
    <motion.div
      className="fixed top-20 right-4 sm:top-24 sm:right-6 z-50 flex flex-col items-end gap-2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/5 backdrop-blur-sm border border-border">
        <span className="text-sm text-secondary font-medium">Fragments</span>
        <span className="text-lg font-bold text-accent font-display">
          {count}/{total}
        </span>
      </div>
      <div className="w-32 h-1.5 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </div>
    </motion.div>
  );
}
