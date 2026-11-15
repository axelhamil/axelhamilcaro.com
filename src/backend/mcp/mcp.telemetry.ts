import { createHmac } from "node:crypto";
import { clip } from "./mcp.constants";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "./mcp.projects";

const PUBLIC_ARGUMENT_VALUES: Record<string, ReadonlySet<string>> = {
  category: new Set(PROJECT_CATEGORIES),
  status: new Set(PROJECT_STATUSES),
  format: new Set(["markdown", "json"]),
};

const MAX_ARGUMENT_NAMES = 20;
const ARGUMENT_NAME_MAX = 64;
const TELEMETRY_CLIP = {
  sessionId: 128,
  place: 96,
  referer: 300,
  errorMessage: 200,
} as const;

export function summarizeToolArguments(
  args: unknown,
): Record<string, string | null> | null {
  if (!args || typeof args !== "object" || Array.isArray(args)) return null;

  const entries = Object.entries(args).slice(0, MAX_ARGUMENT_NAMES);
  if (entries.length === 0) return null;

  const summary: Record<string, string | null> = {};
  for (const [key, value] of entries) {
    const name = clip(key, ARGUMENT_NAME_MAX);
    if (!name) continue;

    const allowed = PUBLIC_ARGUMENT_VALUES[name];
    summary[name] =
      allowed && typeof value === "string" && allowed.has(value) ? value : null;
  }

  return summary;
}

function utcDay(now: Date) {
  return now.toISOString().slice(0, 10);
}

export function visitorFingerprint(
  ip: string | null | undefined,
  now: Date,
  secret: string | null | undefined,
) {
  const address = ip?.trim();
  if (!address || address === "unknown" || !secret) return null;

  return createHmac("sha256", secret)
    .update(`mcp-visitor|${utcDay(now)}|${address}`)
    .digest("hex")
    .slice(0, 32);
}

function decodeHeader(value: string | null) {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function refererOrigin(value: string | null) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function readRequestTelemetry(headers: Headers) {
  return {
    sessionId: clip(headers.get("mcp-session-id"), TELEMETRY_CLIP.sessionId),
    country: clip(headers.get("x-vercel-ip-country"), TELEMETRY_CLIP.place),
    city: clip(
      decodeHeader(headers.get("x-vercel-ip-city")),
      TELEMETRY_CLIP.place,
    ),
    referer: clip(
      refererOrigin(headers.get("referer")),
      TELEMETRY_CLIP.referer,
    ),
  };
}

export function shortErrorMessage(message: string | null | undefined) {
  return clip(message?.split("\n")[0], TELEMETRY_CLIP.errorMessage);
}
