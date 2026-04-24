"use client";

import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "@/src/features/nice-try/components/use-typewriter";

const FAKE_PROCESSES = [
  { text: "ssh root@intruder.local", delay: 100 },
  { text: "Establishing connection...", delay: 800 },
  { text: "Connection established.", delay: 400 },
  { text: "cat /var/log/auth.log | grep FAILED", delay: 600 },
  { text: "Récupération de ton adresse IP...", delay: 500 },
  { text: "IP: 192.168.█.███ (redacted)", delay: 300 },
  { text: "whois $(curl -s ifconfig.me)", delay: 700 },
  { text: "Géolocalisation en cours...", delay: 600 },
  { text: "Location: ████████, France", delay: 400 },
  { text: "curl -s api.github.com/user/$ID", delay: 500 },
  { text: "Extraction profil GitHub...", delay: 600 },
  { text: "Username: [CAPTURED]", delay: 300 },
  { text: "Email: [CAPTURED]", delay: 300 },
  { text: "Avatar: [CAPTURED]", delay: 300 },
  { text: "INSERT INTO login_attempts...", delay: 500 },
  { text: "Query OK, 1 row affected", delay: 400 },
  { text: "notify-send 'INTRUDER DETECTED'", delay: 600 },
  { text: "Slack webhook triggered.", delay: 400 },
  { text: "rate_limit.apply(exponential=true)", delay: 500 },
  { text: "Ban duration: ∞", delay: 800 },
  { text: "", delay: 1000 },
  { text: "Tu es foutu.", delay: 500 },
];

function TerminalLine({
  text,
  isCommand,
  onComplete,
}: {
  text: string;
  isCommand?: boolean;
  onComplete?: () => void;
}) {
  const displayed = useTypewriter(text, isCommand ? 20 : 15, onComplete);

  return (
    <div className="flex gap-2 font-mono text-xs sm:text-sm">
      {isCommand && <span className="text-emerald-400 shrink-0">$</span>}
      {!isCommand && <span className="text-zinc-600 shrink-0">&gt;</span>}
      <span className={isCommand ? "text-emerald-300" : "text-zinc-400"}>
        {displayed}
        <span className="animate-pulse">▊</span>
      </span>
    </div>
  );
}

export function HackerTerminal() {
  const [lines, setLines] = useState<{ text: string; isCommand: boolean }[]>(
    [],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIndex >= FAKE_PROCESSES.length) return;

    const process = FAKE_PROCESSES[currentIndex];
    const isCommand =
      process.text.startsWith("ssh") ||
      process.text.startsWith("cat") ||
      process.text.startsWith("whois") ||
      process.text.startsWith("curl") ||
      process.text.startsWith("INSERT") ||
      process.text.startsWith("notify") ||
      process.text.startsWith("rate_limit");

    const timer = setTimeout(() => {
      setLines((prev) => [...prev, { text: process.text, isCommand }]);
    }, process.delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll bottom on every new line append
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines.length]);

  const handleLineComplete = () => {
    if (currentIndex < FAKE_PROCESSES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shadow-red-500/5">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-zinc-500 text-xs font-mono">
              root@security-daemon ~ INTRUDER_DETECTED
            </span>
          </div>
          <Terminal className="w-4 h-4 text-zinc-600" />
        </div>

        <div
          ref={containerRef}
          className="p-4 h-64 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {lines.map((line, i) => (
            <TerminalLine
              key={`line-${i}-${line.text.slice(0, 10)}`}
              text={line.text}
              isCommand={line.isCommand}
              onComplete={
                i === lines.length - 1 ? handleLineComplete : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
