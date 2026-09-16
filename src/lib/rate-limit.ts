type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const records = new Map<string, RateLimitRecord>();

const CLEANUP_INTERVAL = 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, record] of records.entries()) {
    if (now > record.resetTime) {
      records.delete(key);
    }
  }
}

export type RateLimitConfig = {
  maxRequests: number;
  windowMs: number;
};

export type RateLimitResult =
  | { success: true; remaining: number }
  | { success: false; retryAfter: number };

export function rateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const record = records.get(identifier);

  if (!record || now > record.resetTime) {
    records.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { success: true, remaining: config.maxRequests - 1 };
  }

  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { success: false, retryAfter };
  }

  record.count++;
  return { success: true, remaining: config.maxRequests - record.count };
}

export function getClientIdentifier(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]?.trim() || "unknown";

  const cloudflare = request.headers.get("cf-connecting-ip");
  if (cloudflare) return cloudflare.trim() || "unknown";

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    return hops.at(-1) || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export const RATE_LIMITS = {
  submit: { maxRequests: 5, windowMs: 60 * 1000 },
  track: { maxRequests: 100, windowMs: 60 * 1000 },
  api: { maxRequests: 60, windowMs: 60 * 1000 },
  mcp: { maxRequests: 40, windowMs: 60 * 1000 },
  mcpWrite: { maxRequests: 8, windowMs: 60 * 1000 },
} as const;
