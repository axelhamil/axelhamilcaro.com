import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  readRequestTelemetry,
  summarizeToolArguments,
  visitorFingerprint,
} from "./mcp.telemetry";

describe("summarizeToolArguments", () => {
  test("never stores the content of a free text field", () => {
    const summary = summarizeToolArguments({
      need: "SaaS de facturation pour Jean Dupont, jean@example.com",
      stack: "Next.js",
      constraints: "budget 20k",
      briefId: "4b2d0f7e-9a0c-4c1e-8d2f-1b3c5d7e9f00",
    });

    assert.deepEqual(summary, {
      need: null,
      stack: null,
      constraints: null,
      briefId: null,
    });
  });

  test("keeps the value of a public site identifier", () => {
    assert.deepEqual(
      summarizeToolArguments({ category: "brique", format: "json" }),
      { category: "brique", format: "json" },
    );
  });

  test("drops a public key whose value is not a known identifier", () => {
    assert.deepEqual(
      summarizeToolArguments({ category: "contact me at jean@example.com" }),
      { category: null },
    );
  });

  test("returns nothing when there are no arguments", () => {
    assert.equal(summarizeToolArguments(undefined), null);
    assert.equal(summarizeToolArguments({}), null);
    assert.equal(summarizeToolArguments(["need"]), null);
  });
});

describe("visitorFingerprint", () => {
  const secret = "test-secret-with-enough-entropy";
  const morning = new Date("2026-11-14T08:00:00Z");
  const evening = new Date("2026-11-14T22:30:00Z");
  const nextDay = new Date("2026-11-15T08:00:00Z");

  test("gives the same hash for the same IP on the same day", () => {
    assert.equal(
      visitorFingerprint("203.0.113.7", morning, secret),
      visitorFingerprint("203.0.113.7", evening, secret),
    );
  });

  test("gives another hash for the same IP on another day", () => {
    assert.notEqual(
      visitorFingerprint("203.0.113.7", morning, secret),
      visitorFingerprint("203.0.113.7", nextDay, secret),
    );
  });

  test("gives another hash for another IP", () => {
    assert.notEqual(
      visitorFingerprint("203.0.113.7", morning, secret),
      visitorFingerprint("203.0.113.8", morning, secret),
    );
  });

  test("never contains the IP", () => {
    const hash = visitorFingerprint("203.0.113.7", morning, secret) ?? "";

    assert.match(hash, /^[0-9a-f]{32}$/);
    assert.doesNotMatch(hash, /203|113/);
  });

  test("returns nothing without an IP or a secret", () => {
    assert.equal(visitorFingerprint(null, morning, secret), null);
    assert.equal(visitorFingerprint("unknown", morning, secret), null);
    assert.equal(visitorFingerprint("203.0.113.7", morning, undefined), null);
  });
});

describe("readRequestTelemetry", () => {
  test("decodes the city and keeps only the referer origin", () => {
    const telemetry = readRequestTelemetry(
      new Headers({
        "x-vercel-ip-country": "FR",
        "x-vercel-ip-city": "Saint-%C3%89tienne",
        referer: "https://chatgpt.com/c/abc?email=jean@example.com",
        "mcp-session-id": "session-1",
      }),
    );

    assert.deepEqual(telemetry, {
      sessionId: "session-1",
      country: "FR",
      city: "Saint-Étienne",
      referer: "https://chatgpt.com",
    });
  });
});
