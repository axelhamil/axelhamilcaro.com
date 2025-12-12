"use client";
import cn from "../../lib/cn";
import type { ClassValue } from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";

const PROMPT = "axel@dev:~$";

type Entry = { type: "command" | "output"; text: string };

const COMMANDS: Record<string, string[]> = {
  whoami: [
    "Axel Hamilcaro",
    "Full-Stack · TypeScript · Clean Architecture · DDD",
    "Freelance · SaaS Builder · Product-Oriented Engineer",
  ],
  "tree skills": [
    "skills/",
    "├─ FRONTEND/",
    "| ├─ next.js (fullstack)",
    "| ├─ react",
    "| ├─ tailwindcss",
    "| ├─ shadcn/ui",
    "| └─ accessibility & UX focus",
    "├─ BACKEND/",
    "| ├─ node.js",
    "| ├─ fastify",
    "| ├─ drizzle ORM",
    "| ├─ postgresql",
    "| ├─ domain-driven-design",
    "| └─ clean-architecture",
    "├─ DEVOPS/",
    "| ├─ railway",
    "| ├─ vercel",
    "| ├─ docker",
    "| ├─ cloudflare",
    "| └─ ci/cd basics",
    "└─ ENGINEERING/",
    "  ├─ product thinking",
    "  ├─ business-oriented delivery",
    "  └─ maintainable systems",
  ],
  "cat status.txt": [
    "Availability: Freelance (short & long term)",
    "Preferred missions: SaaS, internal tools, product teams",
    "Focus: clean architecture, long-term maintainability",
  ],
    "ls projects": [
    "projects/",
    "├─ civitime/",
    "|  ├─ 4+ years on RSE & SCORM products (B Corp)",
    "|  ├─ lead full-stack on complex business domains",
    "|  ├─ internal serious-game scenario editor",
    "|  ├─ architecture refactor for scalability & clarity",
    "|  ├─ content team autonomy & faster delivery",
    "|  └─ features: gamification, progression, activity tracking",
    "├─ scormpilot/",
    "|  ├─ SaaS platform for SCORM content distribution",
    "|  ├─ end-to-end product (front, back, infra)",
    "|  ├─ multi-tenant architecture",
    "|  ├─ clean architecture & DDD",
    "|  ├─ MVP in production",
    "|  └─ used by training organizations & thousands of learners",
    "├─ business-platforms/",
    "|  ├─ internal dashboards & business tools",
    "|  ├─ real-time operational visibility",
    "|  └─ secure & maintainable APIs",
    "└─ other-projects/",
    "   ├─ early-stage SaaS experiments",
    "   ├─ product & architecture explorations",
    "   └─ continuous learning projects",
  ],

  neofetch: [
    "axel@dev",
    "OS: Linux (Arch with Hypland) | macOS",
    "WM: Hyprland (Wayland)",
    "Shell: zsh + p10k",
    "Editor: VSCodium",
    "Stack: TypeScript-first (Full-Stack)",
    "Philosophy: clarity > cleverness",
    "Theme: Catppuccin Mocha",
    "CPU: Intel Ultra 7 265k",
    "GPU: NVIDIA Asus Rog Strix RTX 5070 Ti",
    "RAM: 96GB DDR5",
    "UseCases: SaaS dev · audio · gaming",
  ],

  "ls interests": [
    "interests/",
    "├─ software-craft/",
    "| ├─ clean & explicit code",
    "| ├─ architectural decision-making",
    "| └─ long-term maintainability",
    "├─ product-engineering/",
    "| ├─ early-stage SaaS execution",
    "| ├─ MVP to production mindset",
    "| ├─ fast feedback loops",
    "| └─ pragmatic iteration over hype",
    "├─ systems-thinking/",
    "| ├─ performance & optimization",
    "| ├─ minimalism over complexity",
    "| └─ reliability-first approach",
    "├─ audio-music/",
    "| ├─ electric guitar",
    "| ├─ tone & signal chain exploration",
    "| ├─ audio interfaces & monitoring",
    "├─ watches/",
    "| ├─ mechanical watches",
    "| ├─ design & engineering",
    "└─ lifestyle/",
    "  ├─ autonomy & self-reliance",
    "  ├─ nature & outdoor time",
    "  ├─ continuous learning",
    "  └─ disciplined routines",
  ],
  help: [
    "Available commands:",
    "- whoami",
    "- tree skills",
    "- cat status.txt",
    "- ls projects",
    "- neofetch",
    "- ls interests",
    "- clear",
    "- help",
  ],
};

function isAvailabilityLine(text: string) {
  return text.startsWith("Availability:");
}

export default function Terminal({ className }: { className?: ClassValue }) {
  const [history, setHistory] = useState<Entry[]>([
    {
      type: "output",
      text: "Welcome to Axel's dev terminal. Type 'help' to get started.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const demoRef = useRef({
    on: false,
    step: 0,
    timers: [] as number[],
  });

  const sequence = useMemo(
    () => ["help", "whoami", "tree skills", "cat status.txt", "ls projects", "neofetch", "ls interests", "clear"],
    [],
  );

  const clearDemoTimers = () => {
    for (const t of demoRef.current.timers) window.clearTimeout(t);
    demoRef.current.timers = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    demoRef.current.timers.push(id);
    return id;
  };

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([{ type: "output", text: "Terminal cleared. Type 'help' to see available commands." }]);
      return;
    }

    const out = COMMANDS[cmd] ?? [`Command not found: ${cmd}`, `Type 'help' to see available commands.`];

    setHistory((prev) => [
      ...prev,
      { type: "command", text: cmd },
      ...out.map((text) => ({ type: "output" as const, text })),
    ]);
  };

  const submit = () => {
    const cmd = input.trim();
    if (!cmd) return;
    runCommand(cmd);
    setInput("");
  };

  const focusTerminal = () => {
    setIsFocused(true);
    demoRef.current.on = false;
    clearDemoTimers();
    inputRef.current?.focus();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(() => {
    clearDemoTimers();

    if (isFocused) {
      demoRef.current.on = false;
      return;
    }

    demoRef.current.on = false;
    schedule(() => {
      demoRef.current.on = true;

      const typeSpeedMs = 120;
      const betweenMs = 3500;

      const tick = () => {
        if (!demoRef.current.on) return;

        const cmd = sequence[demoRef.current.step % sequence.length];
        demoRef.current.step += 1;

        setInput("");
        let i = 0;

        const typeNext = () => {
          if (!demoRef.current.on) return;

          i += 1;
          setInput(cmd.slice(0, i));

          if (i < cmd.length) {
            schedule(typeNext, typeSpeedMs);
          } else {
            schedule(() => {
              if (!demoRef.current.on) return;
              runCommand(cmd);
              setInput("");
              schedule(tick, betweenMs);
            }, 180);
          }
        };

        schedule(typeNext, 160);
      };

      tick();
    }, 5_000);

    return () => clearDemoTimers();
  }, [isFocused, sequence]);

  return (
    <div
      className={cn("w-xl h-96 rounded-xl glow", "p-4 font-mono text-sm overflow-y-auto", className)}
      ref={containerRef}
      role="textbox"
      tabIndex={0}
      onPointerDown={(e) => {
        e.stopPropagation();
        focusTerminal();
      }}
      onKeyDown={() => focusTerminal()}
    >
      {history.map((entry, index) => (
        <div key={index}>
          {entry.type === "command" ? (
            <span className="flex gap-1 mt-1">
              <p className="text-violet-400">{PROMPT}</p>
              <p>{entry.text}</p>
            </span>
          ) : isAvailabilityLine(entry.text) ? (
            <>
              Availability: <span className="text-orange-400">Freelance (short & long term)</span>
            </>
          ) : (
            entry.text
          )}
        </div>
      ))}

      <div className="flex items-center mt-2">
        <span className="mr-1 text-violet-400">{PROMPT}</span>

        <span className="relative inline-flex items-center">
          <span>{input}</span>
          <span
            aria-hidden="true"
            className={cn(
              "ml-0.5 inline-block h-4 w-[2px] bg-current align-middle",
              !isFocused ? "animate-pulse" : "opacity-0",
            )}
          />
        </span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setIsFocused(true);
            demoRef.current.on = false;
            clearDemoTimers();
            setInput(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-label="Terminal input"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
