import type { WebMcpHost } from "./is-webmcp-available";

type RegisterTool = (
  tool: {
    name: string;
    description: string;
    inputSchema: Record<string, unknown>;
    annotations?: { readOnlyHint?: boolean };
    execute: (args: Record<string, unknown>) => Promise<{
      content: Array<{ type: "text"; text: string }>;
    }>;
  },
  options?: { signal?: AbortSignal },
) => Promise<unknown> | unknown;

function text(payload: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload) }],
  };
}

async function readSection(section: string) {
  const response = await fetch(`/api/agent/catalog?section=${section}`);
  if (!response.ok) throw new Error(`catalog ${section} failed`);
  return response.json();
}

export async function registerWebMcpTools(
  modelContext: WebMcpHost,
  signal: AbortSignal,
) {
  const registerTool = modelContext.registerTool as RegisterTool | undefined;
  if (typeof registerTool !== "function") return;

  await registerTool(
    {
      name: "get_profile",
      description:
        "Canonical identity, availability, and rates for Axel Hamilcaro.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(await readSection("whoami")),
    },
    { signal },
  );

  await registerTool(
    {
      name: "get_services",
      description: "Freelance services and TMA offers.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(await readSection("services")),
    },
    { signal },
  );

  await registerTool(
    {
      name: "get_case_studies",
      description: "Portfolio case studies.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => text(await readSection("case-studies")),
    },
    { signal },
  );

  await registerTool(
    {
      name: "open_contact",
      description:
        "Open the on-page contact form. The human still submits it (Turnstile).",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        window.dispatchEvent(new Event("axel:open-contact"));
        return text({ opened: true });
      },
    },
    { signal },
  );
}
