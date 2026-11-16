import { MCP } from "./site.constants";

export const MCP_PROMPT = "discuss_project";

export const MCP_TOOLS = ["estimate_project", "send_project_brief"] as const;

export const MCP_STARTER_PROMPT =
  "Utilise le prompt discuss_project du serveur MCP d'Axel Hamilcaro pour estimer mon projet. Si tu ne vois pas les prompts, pose-moi ses questions une par une, puis appelle estimate_project.";

export type McpClientId = "claude" | "chatgpt" | "cursor" | "claude-code";

export interface McpClient {
  id: McpClientId;
  name: string;
  steps: string[];
  code?: string;
  note?: string;
}

export const MCP_CLIENTS: McpClient[] = [
  {
    id: "claude",
    name: "Claude",
    steps: [
      "Ouvre Customize, puis Connectors (claude.ai/customize/connectors).",
      "Clique sur + Add, puis sur Add custom connector.",
      "Nomme-le Axel Hamilcaro, colle l'adresse, puis clique deux fois sur Continue.",
      "Choisis No sign in, puis clique sur Add.",
      "Dans une conversation, active-le avec le bouton +, puis Connectors.",
    ],
    note: "Sur Team et Enterprise, c'est un Owner qui l'ajoute (Add, Custom, puis Web), puis chacun clique sur Connect.",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    steps: [
      "Ouvre chatgpt.com/plugins sur le web, pas sur mobile.",
      "Clique sur le bouton plus, puis sur Add custom MCP server.",
      "Donne un nom, colle l'adresse sous Connection, authentification : aucune.",
      "Coche I understand and want to continue, clique sur Create as a plugin, puis installe-le.",
      "Dans une nouvelle conversation, tape @ et choisis-le.",
    ],
    note: "Réservé aux offres Business et Enterprise, Pro en lecture seule. Si ton offre limite les serveurs MCP à la lecture, le récap ne part pas : écris-moi à la main.",
  },
  {
    id: "cursor",
    name: "Cursor",
    steps: [
      "Ouvre ~/.cursor/mcp.json, ou .cursor/mcp.json pour un seul projet.",
      "Ajoute ce bloc.",
      "Active le serveur dans Customize.",
    ],
    code: JSON.stringify(
      { mcpServers: { "axel-hamilcaro": { url: MCP.url } } },
      null,
      2,
    ),
  },
  {
    id: "claude-code",
    name: "Claude Code",
    steps: [
      "Lance cette commande dans ton terminal.",
      "Vérifie avec claude mcp list.",
    ],
    code: `claude mcp add --transport http --scope user axel-hamilcaro ${MCP.url}`,
    note: "Sans --scope user, le serveur ne vaut que pour le dossier courant.",
  },
];
