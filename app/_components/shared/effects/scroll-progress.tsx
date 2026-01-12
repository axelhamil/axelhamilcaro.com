"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-orange-400 to-amber-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

export function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setIsVisible(latest > 0.2);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-accent text-white shadow-lg shadow-accent/25 flex items-center justify-center z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <path d="M18 15l-6-6-6 6" />
      </motion.svg>
    </motion.button>
  );
}
