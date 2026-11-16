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
    description: `Serveur MCP public d'Axel Hamilcaro, développeur fullstack et builder, à ${MCP.url}. POST Streamable HTTP, handshake initialize en 2025-03-26. Un agent IA y lit son identité, sa stack, ses projets, ses études de cas et ses services. Le prompt discuss_project mène la découverte d'un projet client, l'outil estimate_project rend une estimation déterministe et non contractuelle en jours et en euros HT, et send_project_brief n'envoie un récap à Axel qu'avec l'accord explicite de la personne et son email. Outils techniques : audit_architecture_brief et list_projects. Contact ${CONTACT.email}.`,
    url: MCP.url,
    documentation: [MCP.aiCatalogUrl, MCP.manifestUrl],
    provider: { "@id": PERSON_ID },
  };
}
