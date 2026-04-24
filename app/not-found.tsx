"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Compass, Home } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { CaughtCounter } from "@/src/features/not-found/components/caught-counter";
import { GlitchText } from "@/src/features/not-found/components/glitch-text";
import {
  Particle,
  type ParticleData,
} from "@/src/features/not-found/components/particle";
import { SuccessMessage } from "@/src/features/not-found/components/success-message";
import Navbar from "@/src/shared/layouts/navbar";
import { Button } from "@/src/shared/ui/portfolio/button";

const PARTICLE_CHARS = ["4", "0", "4", "?", "!", "#", "@", "*", "0", "4"];
const PARTICLE_COUNT = 30;
const TARGET_CATCH_COUNT = 10;

function generateParticles(): ParticleData[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
    size: 18 + Math.random() * 28,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * -20,
    startX: Math.random() * 100,
    opacity: 0.4 + Math.random() * 0.6,
  }));
}

export default function NotFound() {
  const [caughtIds, setCaughtIds] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  const handleCatch = useCallback((id: number) => {
    setCaughtIds((prev) => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      if (newSet.size >= TARGET_CATCH_COUNT) {
        setTimeout(() => setIsComplete(true), 500);
      }
      return newSet;
    });
  }, []);

  const handleReset = useCallback(() => {
    setCaughtIds(new Set());
    setIsComplete(false);
    setParticles(generateParticles());
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-primary-background">
      <Navbar />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--primary) 1px, transparent 1px), linear-gradient(var(--primary) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div
          className="glow-orb absolute w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            left: "50%",
            top: "50%",
            filter: "blur(100px)",
          }}
        />
      </div>

      {particles.map((particle) => (
        <Particle
          key={particle.id}
          particle={particle}
          onCatch={handleCatch}
          caught={caughtIds.has(particle.id)}
        />
      ))}

      <CaughtCounter count={caughtIds.size} total={TARGET_CATCH_COUNT} />

      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-20 pointer-events-none">
        <motion.div
          className="flex flex-col items-center gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <h1
              className="text-[120px] sm:text-[180px] md:text-[220px] font-bold leading-none tracking-tighter select-none"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <GlitchText
                text="404"
                className="bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent"
              />
            </h1>

            <div
              className="chromatic-layer-accent absolute inset-0 flex items-center justify-center"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-accent">
                404
              </span>
            </div>

            <div
              className="chromatic-layer-cyan absolute inset-0 flex items-center justify-center"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-[120px] sm:text-[180px] md:text-[220px] font-bold text-cyan-400">
                404
              </span>
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary font-display">
              <GlitchText text="Dimension corrompue" />
            </h2>
            <p className="text-base sm:text-lg text-secondary max-w-md mx-auto">
              Cette page s'est fragmentée dans le cyberespace.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Compass
              className="w-4 h-4 text-accent animate-spin"
              style={{ animationDuration: "2s" }}
            />
            <span className="text-sm text-accent font-medium">
              Clique sur les fragments pour reconstruire la page
            </span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 mt-4 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button href="/" size="lg">
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </Button>
          </motion.div>

          <motion.p
            className="text-xs text-muted mt-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ERROR_CODE: PAGE_NOT_FOUND | DIMENSION: CORRUPTED | STATUS:
            FRAGMENTED
          </motion.p>
        </motion.div>
      </main>

      <AnimatePresence>
        {isComplete && <SuccessMessage onReset={handleReset} />}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-primary-background to-transparent z-30" />
      <div className="scanline-effect" />
    </div>
  );
}
