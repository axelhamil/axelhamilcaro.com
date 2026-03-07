"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    let cursorTypeRafId = 0;
    let lastCursorTypeTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      const now = performance.now();
      if (now - lastCursorTypeTime < 100) return;
      lastCursorTypeTime = now;

      cancelAnimationFrame(cursorTypeRafId);
      cursorTypeRafId = requestAnimationFrame(() => {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        if (hoveredElement) {
          const computedStyle = window.getComputedStyle(hoveredElement);
          setIsPointer(
            computedStyle.cursor === "pointer" ||
              hoveredElement.tagName === "A" ||
              hoveredElement.tagName === "BUTTON" ||
              hoveredElement.closest("a") !== null ||
              hoveredElement.closest("button") !== null,
          );
        }
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.head.removeChild(style);
      cancelAnimationFrame(cursorTypeRafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          scale: isClicking ? 0.85 : isPointer ? 1.3 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        style={{
          marginLeft: -8,
          marginTop: -8,
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-white"
          animate={{
            opacity: isVisible ? 1 : 0,
          }}
        />

        {isPointer && (
          <motion.div
            className="absolute w-7 h-7 rounded-full border-2 border-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
