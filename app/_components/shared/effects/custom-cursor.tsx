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

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const updateCursorType = (e: MouseEvent) => {
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === "pointer" ||
            hoveredElement.tagName === "A" ||
            hoveredElement.tagName === "BUTTON" ||
            hoveredElement.closest("a") !== null ||
            hoveredElement.closest("button") !== null
        );
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.head.removeChild(style);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (!isMounted) return null;

  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
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
          scale: isClicking ? 0.8 : isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
        style={{
          marginLeft: -12,
          marginTop: -12,
        }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-white"
          animate={{
            opacity: isVisible ? 1 : 0,
          }}
        />

        {isPointer && (
          <motion.div
            className="absolute w-10 h-10 rounded-full border-2 border-white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
