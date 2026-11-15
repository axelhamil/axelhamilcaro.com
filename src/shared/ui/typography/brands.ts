const BRANDS = [
  { id: "spotify", name: "Spotify", variants: ["Spotify"] },
  { id: "youtube", name: "YouTube", variants: ["YouTube"] },
  { id: "amazon", name: "Amazon", variants: ["Amazon"] },
  { id: "instagram", name: "Instagram", variants: ["Instagram"] },
  { id: "tiktok", name: "TikTok", variants: ["TikTok"] },
  { id: "facebook", name: "Facebook", variants: ["Facebook"] },
  { id: "wechat", name: "WeChat", variants: ["WeChat"] },
  { id: "twitter", name: "Twitter", variants: ["Twitter"] },
  { id: "twitch", name: "Twitch", variants: ["Twitch"] },
  { id: "uber", name: "Uber", variants: ["Uber"] },
  { id: "apple", name: "Apple", variants: ["Apple"] },
  { id: "google", name: "Google", variants: ["Google"] },
  { id: "chrome", name: "Chrome", variants: ["Chrome"] },
  { id: "stripe", name: "Stripe", variants: ["Stripe"] },
  { id: "cloudflare", name: "Cloudflare", variants: ["Cloudflare"] },
  { id: "vercel", name: "Vercel", variants: ["Vercel"] },
  { id: "railway", name: "Railway", variants: ["Railway"] },
  { id: "github", name: "GitHub", variants: ["GitHub"] },
  { id: "claude", name: "Claude", variants: ["Claude Code", "Claude"] },
  { id: "openai", name: "OpenAI", variants: ["OpenAI", "ChatGPT"] },
  { id: "gemini", name: "Gemini", variants: ["Gemini"] },
  { id: "vinted", name: "Vinted", variants: ["Vinted"] },
  { id: "slack", name: "Slack", variants: ["Slack"] },
  { id: "discord", name: "Discord", variants: ["Discord"] },
  { id: "whatsapp", name: "WhatsApp", variants: ["WhatsApp"] },
  { id: "microsoft", name: "Microsoft", variants: ["Microsoft"] },
  { id: "linkedin", name: "LinkedIn", variants: ["LinkedIn"] },
  { id: "malt", name: "Malt", variants: ["Malt"] },
] as const;

type Brand = (typeof BRANDS)[number];

export type BrandSegment =
  | { text: string; brand: Brand }
  | { text: string; brand: null };

const OWN_NAMES = ["Vinted AI Assistant"];

const BRAND_BY_VARIANT = new Map<string, Brand | null>([
  ...OWN_NAMES.map((name) => [name.toLowerCase(), null] as const),
  ...BRANDS.flatMap((brand) =>
    brand.variants.map((variant) => [variant.toLowerCase(), brand] as const),
  ),
]);

const escapeVariant = (variant: string) =>
  variant.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const BRAND_ALTERNATIVES = [...BRAND_BY_VARIANT.keys()]
  .sort((left, right) => right.length - left.length)
  .map(escapeVariant)
  .join("|");

const BRAND_PATTERN = new RegExp(
  `(?<![\\p{L}\\p{N}_\\-.@])(?<!(?:^|\\s)/)(?<![.:/]\\S*/)(?:${BRAND_ALTERNATIVES})(?![\\p{L}\\p{N}_\\-]|[.@][\\p{L}\\p{N}])`,
  "giu",
);

export const splitBrands = (text: string): BrandSegment[] => {
  const seen = new Set<Brand["id"]>();
  const segments: BrandSegment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(BRAND_PATTERN)) {
    const brand = BRAND_BY_VARIANT.get(match[0].toLowerCase());

    if (!brand || seen.has(brand.id)) continue;

    seen.add(brand.id);

    if (match.index > cursor) {
      segments.push({ text: text.slice(cursor, match.index), brand: null });
    }

    segments.push({ text: match[0], brand });
    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), brand: null });
  }

  return segments;
};
