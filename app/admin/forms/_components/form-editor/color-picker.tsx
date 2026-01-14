"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  showAlpha?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace("#", "");
  const r = Number.parseInt(cleanHex.slice(0, 2), 16);
  const g = Number.parseInt(cleanHex.slice(2, 4), 16);
  const b = Number.parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parseColor(color: string): { hex: string; alpha: number } {
  if (color.startsWith("rgba")) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    if (match) {
      const r = Number.parseInt(match[1], 10).toString(16).padStart(2, "0");
      const g = Number.parseInt(match[2], 10).toString(16).padStart(2, "0");
      const b = Number.parseInt(match[3], 10).toString(16).padStart(2, "0");
      const alpha = match[4] ? Number.parseFloat(match[4]) : 1;
      return { hex: `#${r}${g}${b}`, alpha };
    }
  }
  if (color.startsWith("#") && color.length === 9) {
    const alphaHex = color.slice(7, 9);
    const alpha = Number.parseInt(alphaHex, 16) / 255;
    return { hex: color.slice(0, 7), alpha };
  }
  return { hex: color.startsWith("#") ? color : "#000000", alpha: 1 };
}

export function ColorPicker({
  value,
  onChange,
  showAlpha = true,
}: ColorPickerProps) {
  const parsed = parseColor(value);
  const [hex, setHex] = useState(parsed.hex);
  const [alpha, setAlpha] = useState(parsed.alpha);

  useEffect(() => {
    const parsed = parseColor(value);
    setHex(parsed.hex);
    setAlpha(parsed.alpha);
  }, [value]);

  const handleHexChange = (newHex: string) => {
    setHex(newHex);
    if (showAlpha && alpha < 1) {
      onChange(hexToRgba(newHex, alpha));
    } else {
      onChange(newHex);
    }
  };

  const handleAlphaChange = (newAlpha: number[]) => {
    const alphaValue = newAlpha[0];
    setAlpha(alphaValue);
    if (alphaValue < 1) {
      onChange(hexToRgba(hex, alphaValue));
    } else {
      onChange(hex);
    }
  };

  const alphaPercent = Math.round(alpha * 100);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="color"
          value={hex}
          onChange={(e) => handleHexChange(e.target.value)}
          className="h-10 w-14 cursor-pointer border-[var(--admin-border)] bg-[var(--admin-bg)] p-1"
        />
        <Input
          value={showAlpha && alpha < 1 ? hexToRgba(hex, alpha) : hex}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#ff4d00"
          className="flex-1 border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] font-mono text-sm"
        />
      </div>
      {showAlpha && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--admin-text-muted)] w-16">
            Opacité
          </span>
          <Slider
            value={[alpha]}
            onValueChange={handleAlphaChange}
            max={1}
            min={0}
            step={0.01}
            className="flex-1"
          />
          <span className="text-xs text-[var(--admin-text-muted)] w-10 text-right font-mono">
            {alphaPercent}%
          </span>
        </div>
      )}
    </div>
  );
}
