"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export function TextReveal({
  text,
  className,
  delay = 0,
  highlightWords = [],
  highlightClassName = "text-accent",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word.replace(/[^\w]/g, ""));

        return (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className={`inline-block ${isHighlight ? highlightClassName : ""}`}
              initial={{ y: "100%", rotateX: -90 }}
              animate={
                isInView ? { y: "0%", rotateX: 0 } : { y: "100%", rotateX: -90 }
              }
              transition={{
                duration: 0.5,
                delay: delay + i * 0.04,
                ease: [0.33, 1, 0.68, 1],
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </span>
  );
}

interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function LetterReveal({
  text,
  className,
  delay = 0,
}: LetterRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const letters = text.split("");

  return (
    <span ref={ref} className={`inline-block whitespace-nowrap ${className ?? ""}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
