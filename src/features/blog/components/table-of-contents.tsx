"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/src/features/blog/lib/blog";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const ids = headings.map((heading) => heading.id);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            setActiveId(id);
            continue;
          }

          const index = ids.indexOf(id);
          const leftBelow =
            entry.rootBounds !== null &&
            entry.boundingClientRect.top > entry.rootBounds.bottom;

          if (leftBelow && index > 0) {
            const previousId = ids[index - 1];
            setActiveId((current) => (current === id ? previousId : current));
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sommaire" aria-label="Table des matières">
      <p className="surtitre">Dans cet article</p>
      <ol className="sommaire-liste">
        {headings.map((heading) => (
          <li key={heading.id} data-niveau={heading.level}>
            <a
              href={`#${heading.id}`}
              className="sommaire-lien"
              aria-current={activeId === heading.id ? "location" : undefined}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
