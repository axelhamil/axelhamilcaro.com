"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/shared/ui/portfolio/button";

const FRAGMENTS = [
  { id: "f1", char: "4" },
  { id: "f2", char: "0" },
  { id: "f3", char: "?" },
  { id: "f4", char: "4" },
  { id: "f5", char: "#" },
  { id: "f6", char: "0" },
  { id: "f7", char: "!" },
  { id: "f8", char: "4" },
  { id: "f9", char: "@" },
  { id: "f10", char: "0" },
  { id: "f11", char: "*" },
  { id: "f12", char: "4" },
  { id: "f13", char: "?" },
  { id: "f14", char: "0" },
  { id: "f15", char: "!" },
  { id: "f16", char: "4" },
] as const;
const TARGET = 10;
const MAX_ESQUIVES = 2;

interface FragmentGridProps {
  onComplete: () => void;
}

function FragmentGrid({ onComplete }: FragmentGridProps) {
  const [caught, setCaught] = useState<ReadonlySet<string>>(new Set());
  const [esquives, setEsquives] = useState<Readonly<Record<string, number>>>(
    {},
  );

  const esquive = (id: string) => {
    setEsquives((current) => {
      const count = current[id] ?? 0;
      if (count >= MAX_ESQUIVES) return current;

      return { ...current, [id]: count + 1 };
    });
  };

  const attrape = (id: string) => {
    const next = new Set(caught).add(id);
    setCaught(next);

    if (next.size >= TARGET) onComplete();
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <label htmlFor="fragments-progression" className="label-mono">
          Fragments {caught.size}/{TARGET}
        </label>
        <progress
          id="fragments-progression"
          className="fragments-progression flex-1"
          value={caught.size}
          max={TARGET}
        />
      </div>

      <ul className="fragments-zone">
        {FRAGMENTS.map(({ id, char }) => (
          <li key={id}>
            {caught.has(id) ? null : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="fragment"
                data-esquive={esquives[id] ?? 0}
                aria-label={`Fragment ${char}`}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") esquive(id);
                }}
                onClick={() => attrape(id)}
              >
                {char}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export function FragmentHunt() {
  const [partie, setPartie] = useState(0);
  const [complete, setComplete] = useState(false);

  const rejouer = () => {
    setComplete(false);
    setPartie((n) => n + 1);
  };

  return (
    <section
      aria-labelledby="fragments-titre"
      className="etiquette etiquette-carte etiquette-gris fragments gap-5 mr-2"
    >
      <h2 id="fragments-titre" className="title-sm">
        En attendant, aide-moi à reconstituer le colis
      </h2>

      {complete ? (
        <div className="flex flex-col items-start gap-4" aria-live="polite">
          <p className="tampon tampon-droite">
            <span className="tampon-haut">Colis</span>{" "}
            <span className="tampon-bas">Reconstitué</span>
          </p>
          <p className="para ink-secondary">
            Tu as reconstruit la page... mais elle reste introuvable.
          </p>
          <Button type="button" variant="secondary" onClick={rejouer}>
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Rejouer
          </Button>
        </div>
      ) : (
        <>
          <p className="para para-sm ink-secondary">
            Clique sur {TARGET} fragments. Certains esquivent la souris, j'y
            peux rien.
          </p>
          <FragmentGrid key={partie} onComplete={() => setComplete(true)} />
        </>
      )}
    </section>
  );
}
