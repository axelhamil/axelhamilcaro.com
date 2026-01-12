"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Keyboard, MousePointer, Clock } from "lucide-react";

interface KeyStats {
  keyPresses: number;
  clicks: number;
  timeSpent: number;
}

export function KeyStatsWidget() {
  const [stats, setStats] = useState<KeyStats>({ keyPresses: 0, clicks: 0, timeSpent: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);

  useEffect(() => {
    const startTime = Date.now();

    const handleKeyPress = (e: KeyboardEvent) => {
      setStats((prev) => ({ ...prev, keyPresses: prev.keyPresses + 1 }));
      setLastKey(e.key.length === 1 ? e.key.toUpperCase() : e.key);
      setTimeout(() => setLastKey(null), 300);
    };

    const handleClick = () => {
      setStats((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const updateTime = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setStats((prev) => ({ ...prev, timeSpent: elapsed }));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 left-8 w-10 h-10 rounded-full bg-secondary-background border border-border flex items-center justify-center z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible((prev) => !prev)}
        title="Stats de session (⌘K)"
      >
        <Keyboard className="w-4 h-4 text-secondary" />
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-20 left-8 p-4 rounded-xl bg-secondary-background border border-border shadow-xl z-50 min-w-[200px]"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <h4
              className="text-sm font-bold text-primary mb-3 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-accent">⚡</span> Session Stats
            </h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-secondary">
                  <Keyboard className="w-3.5 h-3.5" />
                  Touches
                </span>
                <motion.span
                  className="font-mono font-bold text-accent"
                  key={stats.keyPresses}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {stats.keyPresses}
                </motion.span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-secondary">
                  <MousePointer className="w-3.5 h-3.5" />
                  Clics
                </span>
                <motion.span
                  className="font-mono font-bold text-accent"
                  key={stats.clicks}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {stats.clicks}
                </motion.span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-secondary">
                  <Clock className="w-3.5 h-3.5" />
                  Temps
                </span>
                <span className="font-mono font-bold text-primary">
                  {formatTime(stats.timeSpent)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-muted mt-3 opacity-60">
              Raccourci: ⌘K
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lastKey && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2, y: -50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-6xl font-bold text-accent/30"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {lastKey}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
