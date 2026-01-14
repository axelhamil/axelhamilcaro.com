"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
}

export function Typewriter({
  texts,
  className = "",
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  cursor = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    textIndex,
    texts,
    isInView,
    speed,
    deleteSpeed,
    pauseDuration,
  ]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <motion.span
          className="inline-block ml-0.5 w-[2px] h-[1em] bg-current align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </span>
  );
}

interface TerminalBlockProps {
  lines: { prefix?: string; text: string; delay?: number }[];
  className?: string;
}

export function TerminalBlock({ lines, className = "" }: TerminalBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    if (!isInView) return;

    lines.forEach((line, index) => {
      setTimeout(
        () => {
          setVisibleLines((prev) => [...prev, index]);
        },
        (line.delay ?? index * 400) + 200,
      );
    });
  }, [isInView, lines]);

  return (
    <div
      ref={ref}
      className={`bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden font-mono text-sm ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27ca40]" />
        <span className="ml-2 text-xs text-[#8b949e]">terminal</span>
      </div>
      <div className="p-4 space-y-1">
        {lines.map((line, index) => (
          <motion.div
            key={`line-${index.toString()}`}
            initial={{ opacity: 0, x: -10 }}
            animate={
              visibleLines.includes(index)
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -10 }
            }
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            {line.prefix && (
              <span className="text-[#27ca40]">{line.prefix}</span>
            )}
            <span className="text-[#c9d1d9]">{line.text}</span>
          </motion.div>
        ))}
        {visibleLines.length === lines.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-[#27ca40]">$</span>
            <motion.span
              className="w-2 h-4 bg-[#c9d1d9]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
