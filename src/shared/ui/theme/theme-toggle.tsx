"use client";

import { useTheme } from "next-themes";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/src/shared/ui/portfolio/button";

type Theme = "light" | "dark";

interface Point {
  x: number;
  y: number;
}

interface ThemeToggleProps {
  className?: string;
}

const THEME_LABEL: Record<Theme, string> = { light: "clair", dark: "sombre" };
const SWITCHING_CLASS = "bascule-theme";
const RIBBON_CLASS = "ruban-bascule";
const RIBBON_REPEAT = 40;
const SWEEP: KeyframeAnimationOptions = {
  duration: 700,
  easing: "cubic-bezier(0.65, 0, 0.35, 1)",
};

let runningSwitches = 0;
let pendingTheme: Theme | null = null;
let activeRelay: (() => void) | null = null;

const subscribeToNothing = () => () => {};

const add = (a: Point, b: Point, factor = 1): Point => ({
  x: a.x + b.x * factor,
  y: a.y + b.y * factor,
});

const dot = (a: Point, b: Point) => a.x * b.x + a.y * b.y;

const toPolygon = (points: Point[]) =>
  `polygon(${points.map(({ x, y }) => `${x}px ${y}px`).join(", ")})`;

function cancelLeftoverTransitionEffects() {
  for (const animation of document.getAnimations()) {
    const { effect } = animation;
    const pseudoElement =
      effect instanceof KeyframeEffect ? effect.pseudoElement : null;

    if (
      animation.playState === "finished" &&
      pseudoElement?.startsWith("::view-transition")
    ) {
      animation.cancel();
    }
  }
}

function createRibbon(next: Theme) {
  const ribbon = document.createElement("div");

  ribbon.className = `ruban ruban-hachures ${RIBBON_CLASS}`;
  ribbon.setAttribute("aria-hidden", "true");
  ribbon.textContent = ` ■ ${THEME_LABEL[next]}`.repeat(RIBBON_REPEAT);

  return ribbon;
}

function planSweep(trigger: DOMRect, ribbon: HTMLElement) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const start = {
    x: trigger.left + trigger.width / 2 < width / 2 ? 0 : width,
    y: trigger.top + trigger.height / 2 < height / 2 ? 0 : height,
  };
  const length = Math.hypot(width, height);
  const direction = {
    x: (width - 2 * start.x) / length,
    y: (height - 2 * start.y) / length,
  };
  const normal =
    direction.y > 0
      ? { x: direction.y, y: -direction.x }
      : { x: -direction.y, y: direction.x };
  const band = ribbon.offsetHeight;
  const span = width * Math.abs(normal.x) + height * Math.abs(normal.y);
  const ribbonLength = span + 2 * band;
  const centerOffset = dot(
    { x: width / 2 - start.x, y: height / 2 - start.y },
    normal,
  );
  const far = 2 * (width + height);
  const angle = Math.atan2(normal.y, normal.x);
  const trailingOnTop = dot({ x: -normal.y, y: normal.x }, direction) > 0;

  const frontAt = (distance: number) => add(start, direction, distance);

  const revealed = (distance: number) => {
    const front = frontAt(distance);
    const ahead = add(front, normal, far);
    const behind = add(front, normal, -far);

    return toPolygon([
      ahead,
      behind,
      add(behind, direction, -far),
      add(ahead, direction, -far),
    ]);
  };

  const ribbonAt = (distance: number) => {
    const center = add(frontAt(distance), normal, centerOffset);

    return `translate(${center.x - ribbonLength / 2}px, ${center.y - band / 2}px) rotate(${angle}rad)`;
  };

  const from = -band / 2;
  const to = length + band / 2;

  return {
    ribbonLength,
    trailingOnTop,
    clipPath: [revealed(from), revealed(to)],
    transform: [ribbonAt(from), ribbonAt(to)],
  };
}

const isInside = (rect: DOMRect, event: MouseEvent) =>
  event.clientX >= rect.left &&
  event.clientX <= rect.right &&
  event.clientY >= rect.top &&
  event.clientY <= rect.bottom;

function relayClicksDuringTransition(trigger: DOMRect, retrigger: () => void) {
  const root = document.documentElement;
  const relay = (event: MouseEvent) => {
    if (event.target !== root || !isInside(trigger, event)) return;

    event.stopPropagation();
    retrigger();
  };

  activeRelay?.();
  document.addEventListener("click", relay, true);

  const release = () => {
    document.removeEventListener("click", relay, true);

    if (activeRelay === release) activeRelay = null;
  };

  activeRelay = release;

  return release;
}

function switchTheme(
  next: Theme,
  trigger: DOMRect,
  apply: () => void,
  retrigger: () => void,
) {
  if (!("startViewTransition" in document)) {
    apply();
    return;
  }

  const releaseRelay = relayClicksDuringTransition(trigger, retrigger);
  const root = document.documentElement;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const ribbon = reducedMotion ? null : createRibbon(next);
  let sweep: ReturnType<typeof planSweep> | null = null;

  cancelLeftoverTransitionEffects();
  runningSwitches += 1;
  pendingTheme = next;
  root.classList.add(SWITCHING_CLASS);

  const transition = document.startViewTransition(() => {
    flushSync(apply);

    if (!ribbon) return;

    document.querySelector(`.${RIBBON_CLASS}`)?.remove();
    document.body.append(ribbon);
    sweep = planSweep(trigger, ribbon);
    ribbon.classList.toggle("ruban-bascule-haut", sweep.trailingOnTop);
    ribbon.style.width = `${sweep.ribbonLength}px`;
    ribbon.style.transform = sweep.transform[1] ?? "";
  });

  transition.ready.then(
    () => {
      if (!sweep) return;

      root.animate(
        { clipPath: sweep.clipPath },
        { ...SWEEP, pseudoElement: "::view-transition-new(root)" },
      );
      root.animate(
        { transform: sweep.transform },
        {
          ...SWEEP,
          pseudoElement: `::view-transition-group(${RIBBON_CLASS})`,
        },
      );
    },
    () => undefined,
  );

  transition.finished.finally(() => {
    releaseRelay();
    ribbon?.remove();
    runningSwitches -= 1;

    if (runningSwitches > 0) return;

    pendingTheme = null;
    root.classList.remove(SWITCHING_CLASS);
  });
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const current: Theme = resolvedTheme === "dark" ? "dark" : "light";
  const next: Theme = current === "dark" ? "light" : "dark";

  const toggle = (trigger: DOMRect) => {
    const target: Theme =
      pendingTheme === null ? next : pendingTheme === "dark" ? "light" : "dark";

    switchTheme(
      target,
      trigger,
      () => setTheme(target),
      () => toggle(trigger),
    );
  };

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    toggle(event.currentTarget.getBoundingClientRect());
  };

  return (
    <Button
      type="button"
      variant="secondary"
      className={cn("selecteur-theme", className)}
      onClick={handleClick}
      aria-label={
        hydrated
          ? `Thème ${THEME_LABEL[current]}, passer au thème ${THEME_LABEL[next]}`
          : "Changer de thème"
      }
    >
      <span className="tampon-haut">Thème</span>{" "}
      <span className="tampon-bas">
        <span className="selecteur-theme-sombre">Sombre</span>
        <span className="selecteur-theme-clair">Clair</span>
      </span>
    </Button>
  );
}
