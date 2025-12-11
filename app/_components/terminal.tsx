"use client";

import cn from "@/lib/cn";
import { useState, useRef, useEffect, KeyboardEventHandler } from "react";

const PROMPT = "axel@dev:~$";

type Entry = {
  type: "command" | "output";
  text: string;
};

const COMMANDS: Record<string, string[]> = {
  whoami: [
    "Axel Hamilcaro",
    "Full-Stack Developer | TypeScript Craft | Clean Architecture | DDD",
    "Freelance · SaaS Builder · Product-Oriented",
  ],
  "tree skills": [
    "skills/",
    "├─ FRONTEND/",
    "| ├─ next.js",
    "| ├─ react.tsx",
    "| ├─ shadcn-ui",
    "| ├─ tailwind.css",
    // "| └─ v0.dev (UI engineering)",
    "├─ BACKEND/",
    "| ├─ node.js",
    "| ├─ fastify",
    "| ├─ drizzle",
    "| ├─ postgres",
    "| ├─ Domain-Driven-Design",
    "| └─ clean-architecture/",
    "├─ DEVOPS/",
    "| ├─ railway.app",
    "| ├─ google-cloud-platform",
    "| ├─ vercel",
    "| ├─ digital-ocean",
    "| ├─ docker",
    "| └─ cloudflare",
    "├─ SYSTEM/",
    "| ├─ macOS | windows",
    "| ├─ arch linux (custom Hyprland)",
    "| └─ zsh/p10k",
    "└─ misc/",
    "  ├─ audio/production",
    "  └─ gaming-performance-tweaks",
  ],
  "cat status.txt": [
    "Available for hire: Short|Long Term",
    "Mission idéal : produit à impact, SaaS early-stage, architecture propre.",
  ],
  "ls projects": [
    "projects/",
    "├─ scormpilot/",
    "|  ├─ multi-tenant LMS",
    "|  ├─ SCORM player frontend",
    "|  ├─ auth systems",
    "|  └─ business logic refactor (2024-2025)",
    "├─ dsf-website/",
    "|  ├─ SEO optimized",
    "|  ├─ 50+ leads weekly",
    "|  └─ local business impact",
    "└─ personal-website/",
    "   └─ interactive terminal",
  ],
  neofetch: [
    "axel@dev",
    "OS: arch linux (Hyprland) | macOs",
    "Shell: zsh + p10k",
    "Editor: VSCodium",
    "Browser: Brave | Dia (ex Arc)",
    "VPN: Cloudflare Warp",
    "Terminal colors: Catppuccin Mocha",
    "CPU: Intel Ultra-7 265K",
    "GPU: NVIDIA 5070 Ti",
    "RAM: 96GB Corsair Dominator (2x48go)",
  ],
  "ls hobbies": [
    "hobbies/",
    "├─ music/",
    "| ├─ guitar/",
    "| | ├─ Fender Strat American Ultra",
    "| | ├─ Edwards SG",
    "| ├─ audio/",
    "| | ├─ Adam T7V",
    "| | ├─ KEF",
    "| └─ favorite_song.txt → 'Sails of Charon – Scorpions'",
    "├─ gaming/",
    "| ├─ Battlefield 6",
    "| ├─ Helldivers 2",
    "| ├─ Arc Raiders",
    "├─ watches/",
    "| ├─ Seiko 5 Sport",
    "| ├─ Yema Superman Heritage",
    "| └─ Seiko Arabic Dial Green (incoming)",
    "└─ lifestyle/",
    "  ├─ jeep-weekends/",
    "  ├─ land-freedom/",
    "  ├─ investment-ops/",
    "  └─ maverick(german-shepherd)/",
  ],
  "cat maverick.txt": [
    "Name: Maverick",
    "Breed: Berger Allemand | Altdeutscher Schäferhund",
    "Age: Junior (~1 year)",
    "Goal: Strong, healthy, intelligent companion",
    "Weight goal: 40kg+",
  ],
  help: [
    "Available commands:",
    "- whoami",
    "- tree skills",
    "- cat status.txt",
    "- ls projects",
    "- neofetch",
    "- ls hobbies",
    "- cat maverick.txt",
    "- clear",
    "- help",
  ],
};

const getCommandOutput = (command: string): string[] => {
  const trimmed = command.trim();

  if (trimmed === "clear") return [];

  const output = COMMANDS[trimmed];
  if (output) return output;

  return [
    `Command not found: ${trimmed}`,
    `Type 'help' to see available commands.`,
  ];
};

const Terminal = () => {
  const [history, setHistory] = useState<Entry[]>([
    {
      type: "output",
      text: "Welcome to Axel's dev terminal. Type 'help' to get started.",
    },
  ]);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = () => {
    const command = input.trim();
    if (!command) return;

    if (command === "clear") {
      setHistory([
        {
          type: "output",
          text: "Terminal cleared. Type 'help' to see available commands.",
        },
      ]);
      setInput("");
      return;
    }

    const outputLines = getCommandOutput(command);

    setHistory((prev) => [
      ...prev,
      { type: "command", text: command },
      ...outputLines.map((line) => ({
        type: "output" as const,
        text: line,
      })),
    ]);

    setInput("");
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: custom interactive element
    <div
      className={cn(
        "w-96 h-96 border-2 border-secondary/50 rounded-lg bg-primary-background",
        "p-4 font-mono text-xs overflow-y-auto",
      )}
      ref={containerRef}
      role="textbox"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
      onKeyDown={() => {
        inputRef.current?.focus();
      }}
    >
      {history.map((entry, index) => (
        <div key={index.toString()}>
          {entry.type === "command" ? (
            <span className="flex gap-1 mt-1">
              <p className="text-violet-400">{PROMPT}</p>
              <p>{entry.text}</p>
            </span>
          ) : entry.text.includes("Available for hire") ? (
            <>
              Available for hire:{" "}
              <span className="text-orange-400">Short Term | Long Term</span>
            </>
          ) : (
            entry.text
          )}
        </div>
      ))}

      <div className="flex items-center mt-2">
        <span className="mr-1 text-violet-400 ">{PROMPT}</span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className="terminal-input bg-transparent outline-none border-none"
          aria-label="Terminal input"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Terminal;
