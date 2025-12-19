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
    if (document.startViewTransition) {
      return;
    }

    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pathname, children]);

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
