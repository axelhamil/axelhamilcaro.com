"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  className = "",
  pauseOnHover = true,
}: MarqueeProps) {
  const directionMultiplier = direction === "left" ? -1 : 1;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: [0, directionMultiplier * -50 + "%"],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        whileHover={pauseOnHover ? { animationPlayState: "paused" } : {}}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

interface TextMarqueeProps {
  texts: string[];
  separator?: string;
  speed?: number;
  className?: string;
  textClassName?: string;
}

export function TextMarquee({
  texts,
  separator = "•",
  speed = 20,
  className = "",
  textClassName = "",
}: TextMarqueeProps) {
  const content = texts.map((text, i) => (
    <span key={i} className="flex items-center gap-8">
      <span className={textClassName}>{text}</span>
      <span className="text-accent">{separator}</span>
    </span>
  ));

  return (
    <Marquee speed={speed} className={className}>
      <div className="flex items-center gap-8">{content}</div>
    </Marquee>
  );
}

interface LogoMarqueeProps {
  logos: { name: string; icon: ReactNode }[];
  speed?: number;
  className?: string;
}

export function LogoMarquee({ logos, speed = 25, className = "" }: LogoMarqueeProps) {
  return (
    <Marquee speed={speed} className={className}>
      <div className="flex items-center gap-12">
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {logo.icon}
            <span className="text-sm font-medium">{logo.name}</span>
          </motion.div>
        ))}
      </div>
    </Marquee>
  );
}
