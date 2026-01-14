"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Carousel3DProps<T> {
  items: readonly T[];
  renderItem: (item: T, isActive: boolean) => React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel3D<T>({
  items,
  renderItem,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}: Carousel3DProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, next]);

  const getItemStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      ((diff + items.length + Math.floor(items.length / 2)) % items.length) -
      Math.floor(items.length / 2);

    if (normalizedDiff === 0) {
      return {
        x: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotateY: 0,
      };
    }

    const side = normalizedDiff > 0 ? 1 : -1;
    const absOffset = Math.abs(normalizedDiff);

    return {
      x: side * (200 + absOffset * 50),
      scale: 0.75 - absOffset * 0.1,
      zIndex: 5 - absOffset,
      opacity: absOffset <= 1 ? 0.6 : 0,
      rotateY: side * -25,
    };
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative h-[400px] sm:h-[450px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const style = getItemStyle(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={index}
                className="absolute w-full max-w-md px-4"
                initial={{
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  opacity: style.opacity,
                  rotateY: style.rotateY,
                }}
                exit={{
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: isActive ? "auto" : "none",
                }}
                onClick={() => !isActive && goTo(index)}
              >
                {renderItem(item, isActive)}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <motion.button
          onClick={prev}
          className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <div className="flex gap-2">
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-accent" : "bg-primary/20"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={next}
          className="p-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
