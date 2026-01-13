"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  lift?: number;
}

export function HoverScale({
  children,
  className,
  scale = 1.05,
  rotate = 0,
  lift = 4,
}: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        rotate,
        y: -lift,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
