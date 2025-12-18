"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Check if View Transitions API is supported
    if (document.startViewTransition) {
      return; // Let CSS handle it via View Transitions API
    }

    // Fallback animation for browsers without View Transitions
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  // If View Transitions API is supported, just render children
  if (typeof document !== "undefined" && document.startViewTransition) {
    return <>{children}</>;
  }

  return (
    <div
      className={`transition-all duration-300 ${
        isTransitioning
          ? "opacity-0 translate-y-4 scale-[0.99]"
          : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
