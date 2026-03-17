"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Heading } from "@/app/_lib/blog";

const SCROLL_OFFSET = 100;

interface MobileTableOfContentsProps {
  headings: Heading[];
}

export function MobileTableOfContents({
  headings,
}: MobileTableOfContentsProps) {
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setOpen(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (!el) return;
        const top =
          el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
      }, 250);
    },
    [],
  );

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-5 py-3 text-sm font-semibold text-primary bg-secondary-background cursor-pointer"
      >
        Table des matières
        <ChevronDown
          className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            aria-label="Table des matières mobile"
          >
            <ul className="space-y-1 px-5 py-3 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{
                    paddingLeft: heading.level === 3 ? "1rem" : 0,
                  }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className="block py-1 text-muted hover:text-accent transition-colors"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
