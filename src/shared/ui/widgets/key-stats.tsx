"use client";

import { Clock, Keyboard, MousePointer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/shared/ui/portfolio/button";

interface KeyStats {
  keyPresses: number;
  clicks: number;
  timeSpent: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function KeyStatsWidget() {
  const [stats, setStats] = useState<KeyStats>({
    keyPresses: 0,
    clicks: 0,
    timeSpent: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();

    const handleKeyPress = () => {
      setStats((prev) => ({ ...prev, keyPresses: prev.keyPresses + 1 }));
    };

    const handleClick = () => {
      setStats((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const updateTime = () => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setStats((prev) => ({ ...prev, timeSpent: elapsed }));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyDown);
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="fixed bottom-6 left-6 z-50 hidden sm:inline-flex"
        onClick={() => setIsVisible((prev) => !prev)}
        aria-expanded={isVisible}
        title="Stats de session (⌘K)"
        aria-label="Stats de session (⌘K)"
      >
        <Keyboard className="w-4 h-4" />
      </Button>

      {isVisible && (
        <div className="panneau menu-mobile fixed bottom-20 left-6 z-50 min-w-[220px] p-4 flex flex-col gap-3">
          <h4 className="surtitre">Session Stats</h4>

          <dl className="flex flex-col gap-2 para-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 ink-secondary">
                <Keyboard className="w-3.5 h-3.5" />
                Touches
              </dt>
              <dd className="stat-valeur marqueur">{stats.keyPresses}</dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 ink-secondary">
                <MousePointer className="w-3.5 h-3.5" />
                Clics
              </dt>
              <dd className="stat-valeur marqueur">{stats.clicks}</dd>
            </div>

            <div className="flex items-center justify-between gap-4">
              <dt className="flex items-center gap-2 ink-secondary">
                <Clock className="w-3.5 h-3.5" />
                Temps
              </dt>
              <dd className="stat-valeur marqueur">
                {formatTime(stats.timeSpent)}
              </dd>
            </div>
          </dl>

          <p className="label-mono ink-muted">Raccourci: ⌘K</p>
        </div>
      )}
    </>
  );
}
