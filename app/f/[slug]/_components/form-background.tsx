"use client";

import type { Form } from "@/app/_lib/db/schema";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

interface FormPageBackgroundProps {
  form: Form;
  children: ReactNode;
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FormPageBackground({ form, children }: FormPageBackgroundProps) {
  const [orbs, setOrbs] = useState<FloatingOrb[]>([]);
  const accentColor = form.badgeColor || "#ff4d00";

  useEffect(() => {
    const newOrbs: FloatingOrb[] = [];
    for (let i = 0; i < 8; i++) {
      newOrbs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 100,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }
    setOrbs(newOrbs);
  }, []);

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
        return { backgroundColor: form.backgroundColor || "#0a0a0f" };
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden"
      style={getBackgroundStyle()}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full blur-3xl"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              backgroundColor: accentColor,
              opacity: orb.opacity,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accentColor}15, transparent 50%)`,
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(${accentColor}20 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="absolute bottom-4 left-4 text-white/20 text-xs font-mono">
        <motion.span
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          ●
        </motion.span>{" "}
        axelhamilcaro.com
      </div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
