"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/shared/ui/portfolio/button";

export type CopyStatus = "idle" | "copied" | "failed";

export interface CopyButtonProps {
  text: string;
  label: string;
}

const RESET_DELAY_MS = 2000;

export async function copyText(
  clipboard: Pick<Clipboard, "writeText"> | undefined,
  text: string,
): Promise<Exclude<CopyStatus, "idle">> {
  try {
    if (!clipboard) {
      return "failed";
    }

    await clipboard.writeText(text);
    return "copied";
  } catch {
    return "failed";
  }
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copy = async () => {
    clearTimeout(resetTimer.current);
    setStatus(await copyText(navigator.clipboard, text));
    resetTimer.current = setTimeout(() => setStatus("idle"), RESET_DELAY_MS);
  };

  const labels: Record<CopyStatus, string> = {
    idle: label,
    copied: "Copié",
    failed: "Copie bloquée, sélectionne le texte",
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="cible-tactile"
        onClick={copy}
      >
        {labels[status]}
      </Button>
      <span aria-live="polite" className="sr-only">
        {status === "idle" ? "" : labels[status]}
      </span>
    </>
  );
}
