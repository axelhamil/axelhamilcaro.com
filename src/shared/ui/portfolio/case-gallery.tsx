"use client";

import Image from "next/image";
import { type KeyboardEvent, useId, useState } from "react";
import { blurDataURLs } from "@/app/_config/blur-placeholders";
import { Button } from "@/src/shared/ui/portfolio/button";

interface CaseGalleryShot {
  src: string;
  alt: string;
  label: string;
  path?: string;
  width: number;
  height: number;
}

export interface CaseGalleryProps {
  shots: readonly CaseGalleryShot[];
  label: string;
  address: { text: string; href?: string };
}

export function CaseGallery({ shots, label, address }: CaseGalleryProps) {
  const [active, setActive] = useState(0);
  const id = useId();
  const addressText = (
    <>
      {address.text}
      <wbr />
      {shots[active]?.path}
    </>
  );

  const select = (index: number) => {
    const next = (index + shots.length) % shots.length;
    setActive(next);
    document.getElementById(`${id}-onglet-${next}`)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: shots.length - 1,
    };
    const target = moves[event.key];

    if (target === undefined) return;

    event.preventDefault();
    select(target);
  };

  return (
    <div className="cas-galerie">
      <div role="tablist" aria-label={label} className="cas-onglets">
        {shots.map((shot, index) => (
          <Button
            key={shot.src}
            id={`${id}-onglet-${index}`}
            type="button"
            role="tab"
            variant="secondary"
            size="sm"
            className="cas-onglet"
            aria-selected={index === active}
            aria-controls={`${id}-capture-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={onKeyDown}
          >
            {shot.label}
          </Button>
        ))}
      </div>

      <figure className="cas-cadre">
        <figcaption className="cas-cadre-barre">
          {address.href ? (
            <a href={address.href} target="_blank" rel="noopener noreferrer">
              {addressText}
            </a>
          ) : (
            <span>{addressText}</span>
          )}
          <span aria-hidden="true">
            {active + 1} / {shots.length}
          </span>
        </figcaption>

        {shots.map((shot, index) => (
          <div
            key={shot.src}
            id={`${id}-capture-${index}`}
            role="tabpanel"
            aria-labelledby={`${id}-onglet-${index}`}
            hidden={index !== active}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              className="cas-cadre-image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
              placeholder="blur"
              blurDataURL={blurDataURLs[shot.src]}
              preload={index === 0}
            />
          </div>
        ))}
      </figure>
    </div>
  );
}
