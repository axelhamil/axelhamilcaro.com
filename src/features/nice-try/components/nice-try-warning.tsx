"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function NiceTryWarning() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showWarning && (
        <motion.div
          className="w-full max-w-2xl mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="font-mono text-sm">
                <p className="text-amber-400 mb-1">AVERTISSEMENT</p>
                <p className="text-zinc-400 text-xs">
                  Chaque nouvelle tentative de connexion augmente ton temps de
                  bannissement de manière exponentielle. Ton compte GitHub est
                  maintenant sous surveillance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
