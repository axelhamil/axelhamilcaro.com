import { createHmac, hkdfSync } from "node:crypto";
import { clip } from "./mcp.constants";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "./mcp.projects";
import { MCP_PROMPT_ARGUMENT_SCHEMAS } from "./mcp.prompts";
import { MCP_TOOL_INPUT_SCHEMAS } from "./mcp.tools.schema";

const PUBLIC_ARGUMENT_VALUES: Record<string, ReadonlySet<string>> = {
  category: new Set(PROJECT_CATEGORIES),
  status: new Set(PROJECT_STATUSES),
  format: new Set(["markdown", "json"]),
};

const UNDECLARED_ARGUMENTS_KEY = "_undeclared";
const UNKNOWN_CALL_NAME = "unknown";
const VISITOR_FINGERPRINT_HEX_LENGTH = 5;

const ARGUMENT_VALUE_MAX = 64;
const VISITOR_FINGERPRINT_CONTEXT = "mcp-visitor-fingerprint/v2";
const VISITOR_FINGERPRINT_KEY_BYTES = 32;
const TELEMETRY_CLIP = {
  sessionId: 128,
  place: 96,
  referer: 300,
  errorMessage: 200,
} as const;

const DECLARED_ARGUMENTS: Record<
  string,
  Record<string, ReadonlySet<string>>
> = {
  "tools/call": declaredNames(MCP_TOOL_INPUT_SCHEMAS),
  "prompts/get": declaredNames(MCP_PROMPT_ARGUMENT_SCHEMAS),
};

function declaredNames(
  schemas: Record<string, { shape: Record<string, unknown> }>,
): Record<string, ReadonlySet<string>> {
  return Object.fromEntries(
    Object.entries(schemas).map(([name, schema]) => [
      name,
      new Set(Object.keys(schema.shape)),
    ]),
  );
}

function declaredArguments(method: string, name: string | null | undefined) {
  if (!name) return undefined;
  const catalog = DECLARED_ARGUMENTS[method];
  return catalog && Object.hasOwn(catalog, name) ? catalog[name] : undefined;
}

export function knownCallName(method: string, name: string | null | undefined) {
  if (!DECLARED_ARGUMENTS[method]) return name ?? null;
  if (!name) return null;
  return declaredArguments(method, name) ? name : UNKNOWN_CALL_NAME;
}

function publicValue(name: string, value: unknown) {
  const allowed = PUBLIC_ARGUMENT_VALUES[name];
  if (!allowed || typeof value !== "string" || !allowed.has(value)) return null;
  return clip(value, ARGUMENT_VALUE_MAX);
}

export function summarizeToolArguments(
  method: string,
  name: string | null | undefined,
  args: unknown,
): Record<string, string | null> | null {
  if (!args || typeof args !== "object" || Array.isArray(args)) return null;

  const entries = Object.entries(args);
  if (entries.length === 0) return null;

  const declared = declaredArguments(method, name);
  const summary: Record<string, string | null> = {};
  let undeclared = 0;

  for (const [key, value] of entries) {
    if (!declared?.has(key)) {
      undeclared += 1;
      continue;
    }

    summary[key] = publicValue(key, value);
  }

  if (undeclared > 0) summary[UNDECLARED_ARGUMENTS_KEY] = String(undeclared);

  return summary;
}

function utcDay(now: Date) {
  return now.toISOString().slice(0, 10);
}

function visitorFingerprintKey(secret: string) {
  return Buffer.from(
    hkdfSync(
      "sha256",
      secret,
      "",
      VISITOR_FINGERPRINT_CONTEXT,
      VISITOR_FINGERPRINT_KEY_BYTES,
    ),
  );
}

export function visitorFingerprint(
  ip: string | null | undefined,
  now: Date,
  secret: string | null | undefined,
) {
  const address = ip?.trim();
  if (!address || address === "unknown" || !secret) return null;

  return createHmac("sha256", visitorFingerprintKey(secret))
    .update(`${utcDay(now)}|${address}`)
    .digest("hex")
    .slice(0, VISITOR_FINGERPRINT_HEX_LENGTH);
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
