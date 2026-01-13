"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  scrambleOnHover?: boolean;
  triggerOnView?: boolean;
}

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function ScrambleText({
  text,
  className,
  speed = 50,
  scrambleOnHover = false,
  triggerOnView = true,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState(triggerOnView ? "" : text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (triggerOnView && isInView) {
      scramble();
    }
  }, [isInView, triggerOnView]);

  return (
    <motion.span
      ref={ref}
      className={className}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      style={{ fontFamily: "inherit" }}
    >
      {displayText || text}
    </motion.span>
  );
}
