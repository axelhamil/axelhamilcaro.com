"use client";
import { useEffect, useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface Point {
  x: number;
  y: number;
}

interface LightTrail {
  x: number;
  y: number;
  direction: Direction;
  length: number;
  color: string;
  speed: number;
  trail: Point[];
}

const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

const pick = <T,>(arr: readonly T[]) => arr[(Math.random() * arr.length) | 0];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const getPalette = (isDark: boolean) => ({
  blue: isDark ? "#89b4fa" : "#1e66f5",
  mauve: isDark ? "#cba6f7" : "#8839ef",
  teal: isDark ? "#94e2d5" : "#179299",
});

const getGridSize = () => clamp(window.innerWidth * 0.08, 60, 120);

const snapToGrid = (v: number, grid: number) => Math.round(v / grid) * grid;

const isAtIntersection = (trail: LightTrail, grid: number) => {
  const eps = trail.speed;
  return Math.abs(trail.x % grid) < eps && Math.abs(trail.y % grid) < eps;
};

const step = (trail: LightTrail) => {
  switch (trail.direction) {
    case "up":
      trail.y -= trail.speed;
      return;
    case "down":
      trail.y += trail.speed;
      return;
    case "left":
      trail.x -= trail.speed;
      return;
    case "right":
      trail.x += trail.speed;
      return;
  }
};

const turnAtIntersection = (trail: LightTrail) => {
  const possible: Direction[] = [];
  if (trail.direction !== "down") possible.push("up");
  if (trail.direction !== "up") possible.push("down");
  if (trail.direction !== "right") possible.push("left");
  if (trail.direction !== "left") possible.push("right");
  trail.direction = pick(possible);
};

const isOutOfBounds = (trail: LightTrail, w: number, h: number, grid: number) =>
  trail.x < -grid * 2 ||
  trail.x > w + grid * 2 ||
  trail.y < -grid * 2 ||
  trail.y > h + grid * 2;

const updateTrailPoints = (trail: LightTrail) => {
  trail.trail.unshift({ x: trail.x, y: trail.y });
  const maxPoints = Math.floor((trail.length * getGridSize()) / trail.speed);
  if (trail.trail.length > maxPoints) trail.trail.length = maxPoints;
};

const drawTrail = (ctx: CanvasRenderingContext2D, trail: LightTrail) => {
  if (trail.trail.length < 2) return;

  ctx.shadowBlur = 20;
  ctx.shadowColor = trail.color;
  ctx.strokeStyle = trail.color;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(trail.trail[0].x, trail.trail[0].y);
  for (let i = 1; i < trail.trail.length; i++)
    ctx.lineTo(trail.trail[i].x, trail.trail[i].y);
  ctx.stroke();

  ctx.shadowBlur = 10;
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.8;

  ctx.beginPath();
  ctx.moveTo(trail.trail[0].x, trail.trail[0].y);
  const limit = Math.min(trail.trail.length, 20);
  for (let i = 1; i < limit; i++)
    ctx.lineTo(trail.trail[i].x, trail.trail[i].y);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.shadowBlur = 30;
  ctx.shadowColor = trail.color;
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
};

const TronGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let palette = getPalette(
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const trails: LightTrail[] = [];
    const maxTrails = 4;
    const trailLength = 4;

    const createTrail = (): LightTrail => {
      const grid = getGridSize();
      const cols = Math.ceil(canvas.width / grid);
      const rows = Math.ceil(canvas.height / grid);

      const x = ((Math.random() * cols) | 0) * grid;
      const y = ((Math.random() * rows) | 0) * grid;

      const color =
        palette[pick(Object.keys(palette) as (keyof typeof palette)[])];

      return {
        x,
        y,
        direction: pick(DIRECTIONS),
        length: trailLength,
        color,
        speed: grid / 30,
        trail: [],
      };
    };

    const timers: number[] = [];
    for (let i = 0; i < maxTrails; i++) {
      const id = window.setTimeout(() => trails.push(createTrail()), i * 2000);
      timers.push(id);
    }

    let raf = 0;
    const animate = () => {
      const grid = getGridSize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trails.length; i++) {
        const t = trails[i];

        updateTrailPoints(t);
        step(t);

        if (isAtIntersection(t, grid) && Math.random() < 0.3) {
          t.x = snapToGrid(t.x, grid);
          t.y = snapToGrid(t.y, grid);
          turnAtIntersection(t);
        }

        if (isOutOfBounds(t, canvas.width, canvas.height, grid)) {
          trails[i] = createTrail();
          continue;
        }

        drawTrail(ctx, t);
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => {
      palette = getPalette(mediaQuery.matches);
      for (const t of trails)
        t.color =
          palette[pick(Object.keys(palette) as (keyof typeof palette)[])];
    };
    mediaQuery.addEventListener("change", onScheme);

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", onScheme);
      for (const id of timers) clearTimeout(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
    />
  );
};

export default TronGrid;
