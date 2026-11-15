export const MCP_ORIGIN_CATEGORIES = [
  "agent",
  "scanner",
  "outil",
  "navigateur",
  "inconnu",
] as const;

export type McpOriginCategory = (typeof MCP_ORIGIN_CATEGORIES)[number];

export const MCP_TRAFFIC_SCOPES = ["agents", "sans-scanners", "tout"] as const;

export type McpTrafficScope = (typeof MCP_TRAFFIC_SCOPES)[number];

export const MCP_TRAFFIC_CATEGORIES: Record<
  McpTrafficScope,
  readonly McpOriginCategory[]
> = {
  agents: ["agent", "inconnu"],
  "sans-scanners": ["agent", "inconnu", "outil", "navigateur"],
  tout: MCP_ORIGIN_CATEGORIES,
};

export type McpOrigin = {
  id: string;
  label: string;
  category: McpOriginCategory;
};

export type McpOriginRule = McpOrigin & {
  pattern: string;
};

export const MCP_ORIGIN_RULES: McpOriginRule[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    category: "agent",
    pattern: "chatgpt|openai|oai-",
  },
  {
    id: "claude",
    label: "Claude",
    category: "agent",
    pattern: "claude|anthropic",
  },
  { id: "cursor", label: "Cursor", category: "agent", pattern: "cursor" },
  {
    id: "perplexity",
    label: "Perplexity",
    category: "agent",
    pattern: "perplexity",
  },
  {
    id: "windsurf",
    label: "Windsurf",
    category: "agent",
    pattern: "windsurf|codeium",
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    category: "agent",
    pattern: "copilot",
  },
  {
    id: "vscode",
    label: "VS Code",
    category: "agent",
    pattern: "vscode|visual studio code",
  },
  {
    id: "gemini",
    label: "Gemini",
    category: "agent",
    pattern: "gemini|google-extended",
  },
  { id: "mistral", label: "Mistral", category: "agent", pattern: "mistral" },
  {
    id: "cline",
    label: "Cline",
    category: "agent",
    pattern: "cline|roo-?code",
  },
  { id: "goose", label: "Goose", category: "agent", pattern: "goose" },
  { id: "smithery", label: "Smithery", category: "agent", pattern: "smithery" },
  { id: "glama", label: "Glama", category: "agent", pattern: "glama" },
  {
    id: "inspector",
    label: "MCP Inspector",
    category: "agent",
    pattern: "mcp-inspector",
  },
  { id: "censys", label: "Censys", category: "scanner", pattern: "censys" },
  { id: "shodan", label: "Shodan", category: "scanner", pattern: "shodan" },
  { id: "zgrab", label: "ZGrab", category: "scanner", pattern: "zgrab" },
  { id: "masscan", label: "Masscan", category: "scanner", pattern: "masscan" },
  { id: "nuclei", label: "Nuclei", category: "scanner", pattern: "nuclei" },
  { id: "nmap", label: "Nmap", category: "scanner", pattern: "nmap" },
  {
    id: "expanse",
    label: "Palo Alto Expanse",
    category: "scanner",
    pattern: "expanse",
  },
  {
    id: "measurement",
    label: "Internet Measurement",
    category: "scanner",
    pattern: "internet-?measurement",
  },
  {
    id: "bot",
    label: "Robot",
    category: "scanner",
    pattern: "bot([^a-z]|$)|crawl|spider|scanner",
  },
  { id: "curl", label: "curl", category: "outil", pattern: "^curl/" },
  { id: "wget", label: "Wget", category: "outil", pattern: "^wget/" },
  { id: "httpie", label: "HTTPie", category: "outil", pattern: "httpie" },
  { id: "postman", label: "Postman", category: "outil", pattern: "postman" },
  { id: "insomnia", label: "Insomnia", category: "outil", pattern: "insomnia" },
  {
    id: "python",
    label: "Python",
    category: "outil",
    pattern: "python|aiohttp|httpx|urllib",
  },
  { id: "go", label: "Go", category: "outil", pattern: "go-http-client" },
  { id: "bun", label: "Bun", category: "outil", pattern: "^bun/" },
  {
    id: "node",
    label: "Node.js",
    category: "outil",
    pattern: "^node|undici|axios|node-fetch",
  },
  {
    id: "java",
    label: "Java",
    category: "outil",
    pattern: "^java/|okhttp|apache-httpclient",
  },
  {
    id: "edge",
    label: "Navigateur Edge",
    category: "navigateur",
    pattern: "edg/",
  },
  {
    id: "firefox",
    label: "Navigateur Firefox",
    category: "navigateur",
    pattern: "firefox/",
  },
  {
    id: "chrome",
    label: "Navigateur Chrome",
    category: "navigateur",
    pattern: "chrome/",
  },
  {
    id: "safari",
    label: "Navigateur Safari",
    category: "navigateur",
    pattern: "safari/",
  },
];

export const UNKNOWN_ORIGIN: McpOrigin = {
  id: "unknown",
  label: "Inconnu",
  category: "inconnu",
};

export const OTHER_ORIGIN: McpOrigin = {
  id: "other",
  label: "Autre",
  category: "inconnu",
};

const COMPILED_RULES = MCP_ORIGIN_RULES.map((rule) => ({
  origin: { id: rule.id, label: rule.label, category: rule.category },
  regex: new RegExp(rule.pattern, "i"),
}));

const ORIGINS_BY_ID = new Map<string, McpOrigin>(
  [
    ...COMPILED_RULES.map(({ origin }) => origin),
    UNKNOWN_ORIGIN,
    OTHER_ORIGIN,
  ].map((origin) => [origin.id, origin]),
);

function matchRule(value: string | null | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  return COMPILED_RULES.find(({ regex }) => regex.test(trimmed))?.origin;
}

export function detectMcpOrigin(source: {
  clientName?: string | null;
  userAgent?: string | null;
}): McpOrigin {
  const fromClient = matchRule(source.clientName);
  if (fromClient) return fromClient;

  if (!source.userAgent?.trim()) return UNKNOWN_ORIGIN;

  return matchRule(source.userAgent) ?? OTHER_ORIGIN;
}

export function mcpOriginById(id: string): McpOrigin {
  return ORIGINS_BY_ID.get(id) ?? OTHER_ORIGIN;
}
