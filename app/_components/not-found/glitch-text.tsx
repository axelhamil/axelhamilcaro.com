"use client";

import { useEffect, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:',.<>?/~`0123456789";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        const glitchedText = text
          .split("")
          .map((char) =>
            Math.random() > 0.5
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : char,
          )
          .join("");
        setDisplayText(glitchedText);

        setTimeout(() => {
          setDisplayText(text);
          setIsGlitching(false);
        }, 100);
      }
    }, 150);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <span
      className={className}
      style={{
        textShadow: isGlitching
          ? "2px 0 #ff4d00, -2px 0 #00ffff, 0 0 10px rgba(255, 77, 0, 0.5)"
          : "none",
        transform: isGlitching
          ? `translateX(${Math.random() * 4 - 2}px)`
          : "none",
      }}
    >
      {displayText}
    </span>
  );
}
