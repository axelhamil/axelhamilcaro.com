"use client";

import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/portfolio/button";

interface SuccessMessageProps {
  onReset: () => void;
}

export function SuccessMessage({ onReset }: SuccessMessageProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary-background/90 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="flex flex-col items-center gap-6 p-8 text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <motion.div
          className="text-8xl sm:text-9xl font-bold font-display text-accent"
          animate={{
            textShadow: [
              "0 0 20px rgba(255, 77, 0, 0.5)",
              "0 0 60px rgba(255, 77, 0, 0.8)",
              "0 0 20px rgba(255, 77, 0, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          404
        </motion.div>
        <motion.p
          className="text-xl sm:text-2xl text-primary font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Dimension restaurée !
        </motion.p>
        <motion.p
          className="text-secondary max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Tu as reconstruit la page... mais elle reste introuvable.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button href="/" size="lg">
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Button>
          <Button variant="secondary" size="lg" onClick={onReset}>
            <RefreshCw className="w-5 h-5" />
            Rejouer
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
