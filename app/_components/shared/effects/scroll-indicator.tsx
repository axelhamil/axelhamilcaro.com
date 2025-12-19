"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollIndicator = () => {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 80], [1, 0]);
  const y = useTransform(scrollY, [0, 80], [0, 12]);
  const scale = useTransform(scrollY, [0, 80], [1, 0.92]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity, y, scale }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <div className="relative h-12 w-7 rounded-full border border-secondary/40">
        <motion.div
          className="absolute left-1/2 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary/70"
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 2.2,
            ease: [0.45, 0, 0.25, 1],
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
