"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Form } from "@/drizzle/schema";

interface FormPageBackgroundProps {
  form: Form;
  children: ReactNode;
}

export function FormPageBackground({
  form,
  children,
}: FormPageBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (form.backgroundType) {
      case "image":
        return {
          backgroundImage: `url(${form.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "gradient":
        return { background: form.backgroundGradient || undefined };
      default:
        return { backgroundColor: form.backgroundColor || "#1a1a2e" };
    }
  };

  const accentColor = form.badgeColor || "#ff4d00";

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4 sm:p-8 overflow-hidden"
      style={getBackgroundStyle()}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
          top: "10%",
          right: "-10%",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
          bottom: "5%",
          left: "-5%",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-6 left-6 text-white/20 text-xs font-mono tracking-widest uppercase hidden sm:block"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        axelhamilcaro.com
      </motion.div>

      <motion.div
        className="absolute top-6 right-6 text-white/20 text-xs font-mono tracking-widest uppercase hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {form.slug}
      </motion.div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
