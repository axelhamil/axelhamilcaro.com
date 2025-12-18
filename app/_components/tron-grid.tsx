"use client";

import { useEffect, useRef } from "react";

interface LightTrail {
  x: number;
  y: number;
  direction: "up" | "down" | "left" | "right";
  length: number;
  color: string;
  speed: number;
  trail: { x: number; y: number }[];
}

const TronGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get CSS variables for colors
    const computedStyle = getComputedStyle(document.documentElement);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const colors = {
      blue: isDark ? "#89b4fa" : "#1e66f5",
      mauve: isDark ? "#cba6f7" : "#8839ef",
      teal: isDark ? "#94e2d5" : "#179299",
    };

    // Resize canvas to window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Grid settings
    const getGridSize = () => {
      const vw = window.innerWidth;
      return Math.min(Math.max(60, vw * 0.08), 120);
    };

    // Light trails
    const trails: LightTrail[] = [];
    const maxTrails = 4;
    const trailLength = 8;

    // Create a new trail
    const createTrail = (): LightTrail => {
      const gridSize = getGridSize();
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Start from a random grid intersection
      const startCol = Math.floor(Math.random() * cols);
      const startRow = Math.floor(Math.random() * rows);

      const directions: ("up" | "down" | "left" | "right")[] = [
        "up",
        "down",
        "left",
        "right",
      ];
      const direction = directions[Math.floor(Math.random() * 4)];

      const colorKeys = Object.keys(colors) as (keyof typeof colors)[];
      const color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];

      return {
        x: startCol * gridSize,
        y: startRow * gridSize,
        direction,
        length: trailLength,
        color,
        speed: gridSize / 30, // Move across one grid cell in ~30 frames
        trail: [],
      };
    };

    // Initialize trails
    for (let i = 0; i < maxTrails; i++) {
      setTimeout(() => {
        trails.push(createTrail());
      }, i * 2000);
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      const gridSize = getGridSize();

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each trail
      trails.forEach((trail, index) => {
        // Add current position to trail history
        trail.trail.unshift({ x: trail.x, y: trail.y });
        if (trail.trail.length > trail.length * gridSize / trail.speed) {
          trail.trail.pop();
        }

        // Move trail
        switch (trail.direction) {
          case "up":
            trail.y -= trail.speed;
            break;
          case "down":
            trail.y += trail.speed;
            break;
          case "left":
            trail.x -= trail.speed;
            break;
          case "right":
            trail.x += trail.speed;
            break;
        }

        // Check if we've reached a grid intersection (with tolerance)
        const atIntersectionX = Math.abs(trail.x % gridSize) < trail.speed;
        const atIntersectionY = Math.abs(trail.y % gridSize) < trail.speed;

        // Change direction randomly at intersections
        if (atIntersectionX && atIntersectionY && Math.random() < 0.3) {
          // Snap to grid
          trail.x = Math.round(trail.x / gridSize) * gridSize;
          trail.y = Math.round(trail.y / gridSize) * gridSize;

          // Choose new direction (not backwards)
          const possibleDirs: ("up" | "down" | "left" | "right")[] = [];
          if (trail.direction !== "down") possibleDirs.push("up");
          if (trail.direction !== "up") possibleDirs.push("down");
          if (trail.direction !== "right") possibleDirs.push("left");
          if (trail.direction !== "left") possibleDirs.push("right");

          trail.direction =
            possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
        }

        // Check if trail is out of bounds - respawn it
        if (
          trail.x < -gridSize * 2 ||
          trail.x > canvas.width + gridSize * 2 ||
          trail.y < -gridSize * 2 ||
          trail.y > canvas.height + gridSize * 2
        ) {
          trails[index] = createTrail();
          return;
        }

        // Draw trail with glow effect
        if (trail.trail.length > 1) {
          // Glow layer
          ctx.shadowBlur = 20;
          ctx.shadowColor = trail.color;
          ctx.strokeStyle = trail.color;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Draw the trail
          ctx.beginPath();
          ctx.moveTo(trail.trail[0].x, trail.trail[0].y);

          for (let i = 1; i < trail.trail.length; i++) {
            const point = trail.trail[i];
            ctx.lineTo(point.x, point.y);
          }

          ctx.stroke();

          // Brighter core
          ctx.shadowBlur = 10;
          ctx.strokeStyle = "white";
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.8;

          ctx.beginPath();
          ctx.moveTo(trail.trail[0].x, trail.trail[0].y);

          for (let i = 1; i < Math.min(trail.trail.length, 20); i++) {
            const point = trail.trail[i];
            ctx.lineTo(point.x, point.y);
          }

          ctx.stroke();
          ctx.globalAlpha = 1;

          // Leading point glow
          ctx.shadowBlur = 30;
          ctx.shadowColor = trail.color;
          ctx.fillStyle = "white";
          ctx.beginPath();
          ctx.arc(trail.x, trail.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Listen for color scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleColorSchemeChange = () => {
      const isDarkNow = mediaQuery.matches;
      colors.blue = isDarkNow ? "#89b4fa" : "#1e66f5";
      colors.mauve = isDarkNow ? "#cba6f7" : "#8839ef";
      colors.teal = isDarkNow ? "#94e2d5" : "#179299";
    };
    mediaQuery.addEventListener("change", handleColorSchemeChange);

    return () => {
      window.removeEventListener("resize", resize);
      mediaQuery.removeEventListener("change", handleColorSchemeChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
};

export default TronGrid;
