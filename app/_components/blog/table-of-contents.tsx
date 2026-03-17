"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Heading } from "@/app/_lib/blog";

const SCROLL_OFFSET = 100;

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map(),
  );

  const getActiveHeading = useCallback(() => {
    const headingElements = Array.from(headingElementsRef.current.values());
    const visibleHeadings = headingElements.filter(
      (entry) => entry.isIntersecting,
    );

    if (visibleHeadings.length > 0) {
      const sorted = visibleHeadings.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
      );
      return sorted[0].target.id;
    }

    const scrollY = window.scrollY + SCROLL_OFFSET;
    let current = "";
    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el && el.offsetTop <= scrollY) {
        current = heading.id;
      }
    }
    return current;
  }, [headings]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          headingElementsRef.current.set(entry.target.id, entry);
        }
        const active = getActiveHeading();
        if (active) setActiveId(active);
      },
      { rootMargin: `-${SCROLL_OFFSET}px 0px -60% 0px`, threshold: 0 },
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    for (const el of elements) {
      observer.observe(el);
    }

    if (elements.length > 0 && !activeId) {
      const active = getActiveHeading();
      if (active) setActiveId(active);
      else setActiveId(headings[0].id);
    }

    return () => observer.disconnect();
  }, [headings, getActiveHeading, activeId]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }

  return (
    <nav className="sticky top-24" aria-label="Table des matières">
      <div className="w-8 h-0.5 bg-accent mb-4 rounded-full" />
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        Dans cet article
      </p>
      <ul className="space-y-2 text-sm border-l border-border pl-4 max-h-[calc(100vh-10rem)] overflow-y-auto">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? "1rem" : 0 }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block leading-snug transition-colors duration-200 ${
                activeId === heading.id
                  ? "text-accent font-medium"
                  : "text-muted hover:text-primary"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
