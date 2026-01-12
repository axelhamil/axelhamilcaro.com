"use client";

import type { Form } from "@/app/_lib/db/schema";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FormPageBackgroundProps {
  form: Form;
  children: ReactNode;
}

export function FormPageBackground({ form, children }: FormPageBackgroundProps) {
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

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4 sm:p-6"
      style={getBackgroundStyle()}
    >
      <motion.div
        className="absolute bottom-4 left-4 text-white/30 text-xs font-mono hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        axelhamilcaro.com
      </motion.div>

      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
