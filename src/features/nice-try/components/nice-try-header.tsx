"use client";

import { motion } from "framer-motion";
import { Eye, Skull } from "lucide-react";

function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -translate-x-[2px] text-cyan-500/70 z-0"
        aria-hidden
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 translate-x-[2px] text-red-500/70 z-0"
        aria-hidden
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {children}
      </span>
    </span>
  );
}

export function NiceTryHeader() {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/5 border border-red-500/30 mb-6 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <Skull className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
        <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
      </motion.div>

      <motion.h1
        className="text-4xl sm:text-6xl md:text-7xl font-black mb-3 text-red-500 tracking-tighter"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <GlitchText>NICE TRY</GlitchText>
      </motion.h1>

      <motion.div
        className="flex items-center justify-center gap-2 text-zinc-500 font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Eye className="w-4 h-4" />
        <span>Tu pensais vraiment que ça allait marcher ?</span>
      </motion.div>
    </motion.div>
  );
}
