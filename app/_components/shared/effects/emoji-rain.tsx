"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const EMOJIS = ["🚀", "💻", "⚡", "🔥", "✨", "🎯", "💡", "🛠️", "📦", "🎨"];

interface FallingEmoji {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
}

export function EmojiRain() {
  const [emojis, setEmojis] = useState<FallingEmoji[]>([]);
  const [isRaining, setIsRaining] = useState(false);

  const startRain = useCallback(() => {
    if (isRaining) return;
    setIsRaining(true);

    const newEmojis: FallingEmoji[] = [];
    for (let i = 0; i < 30; i++) {
      newEmojis.push({
        id: Date.now() + i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
      });
    }

    setEmojis(newEmojis);
    setTimeout(() => {
      setEmojis([]);
      setIsRaining(false);
    }, 5000);
  }, [isRaining]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (scrollVelocity > 100) {
        startRain();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startRain]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      <AnimatePresence>
        {emojis.map((emoji) => (
          <motion.span
            key={emoji.id}
            className="absolute text-2xl"
            style={{ left: `${emoji.x}%` }}
            initial={{ y: -50, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [1, 1, 0],
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: emoji.duration,
              delay: emoji.delay,
              ease: "easeIn",
            }}
          >
            {emoji.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ClickSparkProps {
  enabled?: boolean;
}

export function ClickSpark({ enabled = true }: ClickSparkProps) {
  const [sparks, setSparks] = useState<
    { id: number; x: number; y: number; particles: { angle: number; distance: number }[] }[]
  >([]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const particles = Array.from({ length: 8 }, (_, i) => ({
        angle: (i * 360) / 8,
        distance: 30 + Math.random() * 20,
      }));

      const newSpark = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        particles,
      };

      setSparks((prev) => [...prev, newSpark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [enabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {sparks.map((spark) => (
          <div key={spark.id}>
            {spark.particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-accent"
                style={{
                  left: spark.x,
                  top: spark.y,
                }}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                  y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
