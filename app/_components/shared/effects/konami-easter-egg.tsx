"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

const COLORS = ["#ff4d00", "#ff6b2c", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#eab308"];

export function KonamiEasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [activated, setActivated] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: Math.random() * 3 + 2,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-KONAMI_CODE.length);
      setSequence(newSequence);

      if (newSequence.join(",") === KONAMI_CODE.join(",")) {
        setActivated(true);
        setShowMessage(true);
        createParticles();

        setTimeout(() => setShowMessage(false), 4000);
        setTimeout(() => {
          setActivated(false);
          setParticles([]);
          setSequence([]);
        }, 6000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence, createParticles]);

  if (!activated) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: 1,
          }}
          animate={{
            y: window.innerHeight + 100,
            x: particle.x + particle.velocityX * 100,
            rotate: particle.rotation + 720,
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            ease: "easeIn",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}

      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="bg-primary text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                🎮
              </motion.div>
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Konami Code !
              </h3>
              <p className="text-sm opacity-80">
                Tu connais les classiques ! Respect 🙌
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ConfettiButton({ children, onClick, className = "" }: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const angle = (Math.PI * 2 * i) / 30;
      newParticles.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocityX: Math.cos(angle) * (Math.random() * 100 + 50),
        velocityY: Math.sin(angle) * (Math.random() * 100 + 50),
      });
    }

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
    onClick?.();
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: particle.x + particle.velocityX,
              y: particle.y + particle.velocityY + 100,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: "50%",
            }}
          />
        ))}
      </div>
    </>
  );
}
