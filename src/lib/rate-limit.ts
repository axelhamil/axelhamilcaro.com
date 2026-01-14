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
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";
  return ip;
}

export const RATE_LIMITS = {
  submit: { maxRequests: 5, windowMs: 60 * 1000 },
  track: { maxRequests: 100, windowMs: 60 * 1000 },
  api: { maxRequests: 60, windowMs: 60 * 1000 },
} as const;
