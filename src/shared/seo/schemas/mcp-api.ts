import {
  CONTACT,
  MCP,
  PERSON_ID,
  SITE_URL,
} from "@/app/_config/site.constants";

export const MCP_API_ID = `${SITE_URL}/#mcp`;

export function buildMcpApiNode() {
  return {
    "@type": "WebAPI",
    "@id": MCP_API_ID,
    name: "Serveur MCP Axel Hamilcaro",
    description: `Serveur MCP public d'Axel Hamilcaro, développeur fullstack et builder, à ${MCP.url}. POST Streamable HTTP, handshake initialize en 2025-03-26. Un agent IA y lit son identité, sa stack, ses projets, ses études de cas et ses services, et peut lancer un audit d'architecture déterministe. Aucun envoi de lead. Contact ${CONTACT.email}.`,
    url: MCP.url,
    documentation: [MCP.aiCatalogUrl, MCP.manifestUrl],
    provider: { "@id": PERSON_ID },
  };
}
