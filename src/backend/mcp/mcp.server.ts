import type { McpServer } from "@modelcontextprotocol/server";
import { registerMcpPrompts } from "./mcp.prompts";
import { registerMcpResources } from "./mcp.resources";
import { registerMcpTools } from "./mcp.tools";

export function registerMcpCapabilities(server: McpServer) {
  registerMcpResources(server);
  registerMcpPrompts(server);
  registerMcpTools(server);
}
