"use client";

import { useEffect, useState } from "react";

interface UseScrollProgressOptions {
  sections?: readonly string[];
  pathname?: string;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { sections = [], pathname = "/" } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      let currentSection = "";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) currentSection = section;
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, sections]);

  return {
    isScrolled,
    activeSection,
    scrollProgress,
  };
}
