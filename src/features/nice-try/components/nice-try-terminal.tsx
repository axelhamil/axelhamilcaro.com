"use client";

import { motion } from "framer-motion";
import { HackerTerminal } from "@/src/features/nice-try/components/hacker-terminal";

export function NiceTryTerminal() {
  return (
    <motion.div
      className="w-full max-w-2xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <HackerTerminal />
    </motion.div>
  );
}
