"use client";

import { useCallback, useState } from "react";

const ESCAPE_MESSAGES = ["Raté !", "Nope !", "Presque !", "Haha !"];
const MAX_ESCAPES = 2;

export interface ParticleData {
  id: number;
  char: string;
  size: number;
  duration: number;
  delay: number;
  startX: number;
  opacity: number;
}

interface ParticleProps {
  particle: ParticleData;
  onCatch: (id: number) => void;
  caught: boolean;
}

export function Particle({ particle, onCatch, caught }: ParticleProps) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState<string | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (escapeCount >= MAX_ESCAPES) return;

    const newX = (Math.random() > 0.5 ? 1 : -1) * (25 + Math.random() * 20);
    const newY = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 15);

    setOffset({ x: newX, y: newY });
    setEscapeCount((c) => c + 1);
    setMessage(
      ESCAPE_MESSAGES[Math.floor(Math.random() * ESCAPE_MESSAGES.length)],
    );

    setTimeout(() => setMessage(null), 600);
  }, [escapeCount]);

  if (caught) return null;

  const isNumber = particle.char === "4" || particle.char === "0";

  return (
    <div
      className="particle-fall"
      style={{
        position: "fixed",
        left: `${particle.startX}%`,
        animationDuration: `${particle.duration}s`,
        animationDelay: `${particle.delay}s`,
        zIndex: 10,
      }}
    >
      <button
        type="button"
        className="pointer-events-auto cursor-pointer select-none bg-transparent border-none p-0 relative"
        style={{
          fontSize: particle.size,
          opacity: particle.opacity,
          color: isNumber ? "var(--accent)" : "var(--muted)",
          fontFamily: "var(--font-space-grotesk), var(--font-geist-mono)",
          fontWeight: 700,
          textShadow: "0 0 10px currentColor",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        onMouseEnter={handleMouseEnter}
        onClick={() => onCatch(particle.id)}
      >
        {particle.char}
        {message && (
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-accent pointer-events-none escape-message">
            {message}
          </span>
        )}
      </button>
    </div>
  );
}
