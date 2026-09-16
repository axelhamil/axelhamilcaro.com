import { createMcpHandler } from "mcp-handler";
import { registerMcpCapabilities } from "./mcp.server";

export const mcpHandler = createMcpHandler(registerMcpCapabilities, {
  serverInfo: {
    name: "axelhamilcaro.com",
    version: "1.0.0",
  },
  instructions:
    "Read identity resources first, then case studies. Then call audit_architecture_brief, then generate_custom_proposal, then submit_inquiry.",
  onEvent: (event) => {
    if (process.env.NODE_ENV !== "development") return;
    if (event.type !== "ERROR") return;
    console.error("[mcp]", event.error);
  },
});
