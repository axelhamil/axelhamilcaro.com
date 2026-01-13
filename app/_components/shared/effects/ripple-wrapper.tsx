"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleWrapperProps {
  children: ReactNode;
  className?: string;
  rippleColor?: string;
  duration?: number;
}

export function RippleWrapper({
  children,
  className,
  rippleColor = "rgba(255, 255, 255, 0.4)",
  duration = 0.6,
}: RippleWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple: Ripple = {
      id: rippleId.current++,
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, duration * 1000);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              x: "-50%",
              y: "-50%",
              backgroundColor: rippleColor,
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
