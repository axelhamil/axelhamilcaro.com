import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, test } from "node:test";
import {
  knownCallName,
  readRequestTelemetry,
  summarizeToolArguments,
  visitorFingerprint,
} from "./mcp.telemetry";

describe("summarizeToolArguments", () => {
  test("never stores the content of a free text field", () => {
    const summary = summarizeToolArguments(
      "tools/call",
      "generate_custom_proposal",
      {
        need: "SaaS de facturation pour Jean Dupont, jean@example.com",
        stack: "Next.js",
        constraints: "budget 20k",
        briefId: "4b2d0f7e-9a0c-4c1e-8d2f-1b3c5d7e9f00",
      },
    );

    assert.deepEqual(summary, {
      need: null,
      stack: null,
      constraints: null,
      briefId: null,
    });
  });

  test("keeps the value of a public site identifier", () => {
    assert.deepEqual(
      summarizeToolArguments("tools/call", "list_projects", {
        category: "brique",
        format: "json",
      }),
      { category: "brique", format: "json" },
    );
  });

  test("drops a public key whose value is not a known identifier", () => {
    assert.deepEqual(
      summarizeToolArguments("tools/call", "list_projects", {
        category: "contact me at jean@example.com",
      }),
      { category: null },
    );
  });

  test("counts undeclared argument names without storing them", () => {
    const summary = summarizeToolArguments("tools/call", "list_projects", {
      "jean.dupont@acme.fr 06 12 34 56 78": "x",
      sk_live_51Hx: true,
      format: "json",
    });

    assert.deepEqual(summary, { format: "json", _undeclared: "2" });
    assert.doesNotMatch(
      JSON.stringify(summary),
      /jean|dupont|acme|06 12|sk_live|51Hx/,
    );
  });

  test("stores no argument name for a call outside the catalog", () => {
    assert.deepEqual(
      summarizeToolArguments("tools/call", "exfiltrate", {
        "jean.dupont@acme.fr": "x",
      }),
      { _undeclared: "1" },
    );
  });

  test("keeps the declared arguments of a prompt", () => {
    assert.deepEqual(
      summarizeToolArguments("prompts/get", "compare_stack", {
        need: "jean@example.com",
        "jean.dupont@acme.fr": "x",
      }),
      { need: null, _undeclared: "1" },
    );
  });

  test("returns nothing when there are no arguments", () => {
    assert.equal(
      summarizeToolArguments("tools/call", "list_projects", undefined),
      null,
    );
    assert.equal(
      summarizeToolArguments("tools/call", "list_projects", {}),
      null,
    );
    assert.equal(
      summarizeToolArguments("tools/call", "list_projects", ["need"]),
      null,
    );
  });
});

describe("knownCallName", () => {
  test("keeps a tool or prompt of the catalog", () => {
    assert.equal(knownCallName("tools/call", "list_projects"), "list_projects");
    assert.equal(
      knownCallName("prompts/get", "compare_stack"),
      "compare_stack",
    );
  });

  test("turns a name outside the catalog into unknown", () => {
    assert.equal(
      knownCallName("tools/call", "jean.dupont@acme.fr sk_live_51Hx"),
      "unknown",
    );
    assert.equal(knownCallName("prompts/get", "toString"), "unknown");
  });

  test("keeps discuss_project and drops the removed prompts", () => {
    assert.equal(
      knownCallName("prompts/get", "discuss_project"),
      "discuss_project",
    );
    assert.equal(knownCallName("prompts/get", "formalize_need"), "unknown");
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

  test("is truncated to 20 bits and never contains the IP", () => {
    const hash = visitorFingerprint("203.0.113.7", morning, secret) ?? "";

    assert.match(hash, /^[0-9a-f]{5}$/);
    assert.doesNotMatch(hash, /203|113/);
  });

  test("never keys the HMAC with the auth secret itself", () => {
    const fingerprint = visitorFingerprint("203.0.113.7", morning, secret);
    const withRawSecret = [
      "mcp-visitor|2026-11-14|203.0.113.7",
      "2026-11-14|203.0.113.7",
    ].map((message) =>
      createHmac("sha256", secret).update(message).digest("hex").slice(0, 5),
    );

    assert.ok(fingerprint);
    assert.equal(withRawSecret.includes(fingerprint), false);
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
