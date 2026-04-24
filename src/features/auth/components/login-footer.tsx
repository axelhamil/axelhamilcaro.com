"use client";

import { motion } from "framer-motion";

export function LoginFooter() {
  return (
    <motion.p
      className="absolute bottom-6 text-xs text-muted font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      axel_hamilcaro() • {new Date().getFullYear()}
    </motion.p>
  );
}
