const AA_SMALL_TEXT = 4.8;
const DARK_INK = "#0a0a0a";
const LIGHT_INK = "#ffffff";

const inkCache = new Map<string, string>();

type Rgb = [number, number, number];

function toRgb(hex: string): Rgb {
  const raw = hex.replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16)) as Rgb;
}

function toHex([r, g, b]: Rgb) {
  return `#${[r, g, b]
    .map((c) => Math.round(c).toString(16).padStart(2, "0"))
    .join("")}`;
}

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]: Rgb) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: number, b: number) {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

export function textOn(background: string) {
  const bg = luminance(toRgb(background));
  return contrast(bg, luminance(toRgb(DARK_INK))) >=
    contrast(bg, luminance(toRgb(LIGHT_INK)))
    ? DARK_INK
    : LIGHT_INK;
}

export function inkOnLight(brand: string, target = AA_SMALL_TEXT) {
  const cached = inkCache.get(`${brand}:${target}`);
  if (cached) return cached;

  const rgb = toRgb(brand);
  const white = luminance([255, 255, 255]);
  let result = brand;

  if (contrast(luminance(rgb), white) < target) {
    let low = 0;
    let high = 1;
    for (let i = 0; i < 24; i++) {
      const factor = (low + high) / 2;
      const scaled = rgb.map((c) => c * factor) as Rgb;
      if (contrast(luminance(scaled), white) >= target) low = factor;
      else high = factor;
    }
    result = toHex(rgb.map((c) => c * low) as Rgb);
  }

  inkCache.set(`${brand}:${target}`, result);
  return result;
}
