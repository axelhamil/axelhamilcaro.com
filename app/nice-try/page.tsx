"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  Clock,
  Database,
  Eye,
  MapPin,
  ShieldAlert,
  Skull,
  Terminal,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

function useTypewriter(
  text: string,
  speed = 30,
  onComplete?: () => void,
): string {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      onComplete?.();
      return;
    }

    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return displayed;
}

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

function HackerTerminal() {
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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

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
              key={i}
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

function GlitchText({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 -translate-x-[2px] text-cyan-500/70 z-0"
        aria-hidden
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 translate-x-[2px] text-red-500/70 z-0"
        aria-hidden
        style={{ clipPath: "inset(50% 0 0 0)" }}
      >
        {children}
      </span>
    </span>
  );
}

function DataPoint({
  icon: Icon,
  label,
  delay,
}: {
  icon: typeof Camera;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 text-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-red-400" />
      </div>
      <span className="text-zinc-400 font-mono text-xs sm:text-sm">
        {label}
      </span>
    </motion.div>
  );
}

export default function NiceTryPage() {
  const [showWarning, setShowWarning] = useState(false);
  const [scanPosition, setScanPosition] = useState(0);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [incidentId, setIncidentId] = useState<string | null>(null);

  useEffect(() => {
    setTimestamp(new Date().toISOString());
    setIncidentId(Math.random().toString(36).slice(2, 10));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowWarning(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden selection:bg-red-500/30">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent ${scanPosition}%,
            rgba(255, 0, 0, 0.03) ${scanPosition + 0.5}%,
            transparent ${scanPosition + 1}%
          )`,
        }}
      />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500/5 border border-red-500/30 mb-6 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Skull className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />
            <div className="absolute inset-0 rounded-full border border-red-500/20 animate-ping" />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl md:text-7xl font-black mb-3 text-red-500 tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <GlitchText>NICE TRY</GlitchText>
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-2 text-zinc-500 font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Eye className="w-4 h-4" />
            <span>Tu pensais vraiment que ça allait marcher ?</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <HackerTerminal />
        </motion.div>

        <motion.div
          className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <ShieldAlert className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider">
                Données capturées
              </span>
            </div>
            <DataPoint
              icon={Camera}
              label="Profil GitHub enregistré"
              delay={1.1}
            />
            <DataPoint
              icon={Database}
              label="Tentative logguée en DB"
              delay={1.2}
            />
            <DataPoint icon={Wifi} label="Adresse IP capturée" delay={1.3} />
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider">
                Actions en cours
              </span>
            </div>
            <DataPoint
              icon={MapPin}
              label="Géolocalisation active"
              delay={1.4}
            />
            <DataPoint
              icon={Clock}
              label="Rate limiting appliqué"
              delay={1.5}
            />
            <DataPoint icon={Terminal} label="Admin notifié" delay={1.6} />
          </div>
        </motion.div>

        <AnimatePresence>
          {showWarning && (
            <motion.div
              className="w-full max-w-2xl mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="font-mono text-sm">
                    <p className="text-amber-400 mb-1">AVERTISSEMENT</p>
                    <p className="text-zinc-400 text-xs">
                      Chaque nouvelle tentative de connexion augmente ton temps
                      de bannissement de manière exponentielle. Ton compte
                      GitHub est maintenant sous surveillance.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-zinc-300 transition-all duration-200 font-mono text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            <span>Retour au site</span>
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <p className="text-zinc-700 text-xs font-mono">
            {incidentId && timestamp && (
              <>
                incident_id: {incidentId} • {timestamp}
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
