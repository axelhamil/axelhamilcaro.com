import { CONTACT, MCP, SITE_URL } from "@/app/_config/site.constants";

export function buildMcpApiSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    "@id": `${SITE_URL}/#mcp`,
    name: "Serveur MCP Axel Hamilcaro",
    description: `Axel Hamilcaro expose un serveur MCP public à ${MCP.url}. POST Streamable HTTP, protocoles 2026-07-28 et 2025-03-26. Identité, stack, case studies, audit d'architecture et proposition non contractuelle. Pas d'envoi de lead. Contact ${CONTACT.email}.`,
    url: MCP.url,
    documentation: MCP.manifestUrl,
    provider: { "@id": `${SITE_URL}/#person` },
  };
}
