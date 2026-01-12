"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useCallback, type ReactNode } from "react";

interface RunawayBadgeProps {
  children: ReactNode;
  className?: string;
  maxEscapes?: number;
  escapeDistance?: number;
}

export function RunawayBadge({
  children,
  className = "",
  maxEscapes = 5,
  escapeDistance = 80,
}: RunawayBadgeProps) {
  const controls = useAnimation();
  const [escapeCount, setEscapeCount] = useState(0);
  const [isCaught, setIsCaught] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const messages = [
    "Raté ! 😜",
    "Trop lent ! 🏃",
    "Essaie encore ! 😄",
    "Presque ! 👀",
    "Haha ! 🎉",
  ];

  const caughtMessages = [
    "Tu m'as eu ! 🎊",
    "GG ! 🏆",
    "Bien joué ! ⭐",
  ];

  const handleMouseEnter = useCallback(() => {
    if (isCaught) return;

    if (escapeCount >= maxEscapes) {
      setIsCaught(true);
      setMessage(caughtMessages[Math.floor(Math.random() * caughtMessages.length)]);
      controls.start({
        scale: [1, 1.2, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5 },
      });
      return;
    }

    const angle = Math.random() * Math.PI * 2;
    const distance = escapeDistance + Math.random() * 30;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const boundedX = Math.max(-100, Math.min(100, x));
    const boundedY = Math.max(-30, Math.min(30, y));

    controls.start({
      x: boundedX,
      y: boundedY,
      rotate: Math.random() * 20 - 10,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
      },
    });

    setEscapeCount((c) => c + 1);
    setMessage(messages[escapeCount % messages.length]);

    setTimeout(() => setMessage(null), 800);
  }, [controls, escapeCount, isCaught, maxEscapes, escapeDistance]);

  const handleClick = () => {
    if (!isCaught) {
      setIsCaught(true);
      setMessage("OK OK, tu as gagné ! 🎉");
      controls.start({ x: 0, y: 0, rotate: 0 });
    }
  };

  return (
    <div className="relative">
      <motion.div
        animate={controls}
        className={`relative cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        {children}

        {!isCaught && escapeCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={escapeCount}
          >
            {maxEscapes - escapeCount}
          </motion.span>
        )}
      </motion.div>

      {message && (
        <motion.span
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium bg-primary text-white px-2 py-1 rounded-lg"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {message}
        </motion.span>
      )}
    </div>
  );
}
