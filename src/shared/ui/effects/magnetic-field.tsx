"use client";

import { useEffect } from "react";

const MAGNETIC_SELECTOR =
  ":is(.btn, .etiquette, .tampon, .link-card):not(.btn-ghost, .affiche *, .ruban *, .admin-theme *, :has(input, textarea, select))";

const MAGNETIC_MEDIA =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const clampUnit = (value: number) => Math.min(1, Math.max(-1, value));

export function MagneticField() {
  useEffect(() => {
    const media = matchMedia(MAGNETIC_MEDIA);
    let active: HTMLElement | null = null;
    let target: Element | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;

    const release = () => {
      active?.style.removeProperty("--mx");
      active?.style.removeProperty("--my");
      active = null;
    };

    const follow = () => {
      frame = 0;
      const element = target?.closest<HTMLElement>(MAGNETIC_SELECTOR) ?? null;

      if (element !== active) {
        release();
        active = element;
      }

      if (!element) return;

      const box = element.getBoundingClientRect();
      const mx = (pointerX - box.left - box.width / 2) / (box.width / 2);
      const my = (pointerY - box.top - box.height / 2) / (box.height / 2);

      element.style.setProperty("--mx", clampUnit(mx).toFixed(3));
      element.style.setProperty("--my", clampUnit(my).toFixed(3));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !media.matches) return;

      target = event.target instanceof Element ? event.target : null;
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const handleScroll = () => {
      if (!active) return;

      target = document.elementFromPoint(pointerX, pointerY);

      if (!frame) frame = requestAnimationFrame(follow);
    };

    const handlePointerLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      release();
    };

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("scroll", handleScroll, { capture: true });
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      handlePointerLeave();
    };
  }, []);

  return null;
}
