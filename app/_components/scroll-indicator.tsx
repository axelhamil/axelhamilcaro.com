"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide after scrolling 50px
      setIsVisible(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="text-xs text-secondary/60 hidden sm:block">Scroll</span>
      <div className="animate-bounce">
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-secondary/50" />
      </div>
    </div>
  );
};

export default ScrollIndicator;
