import {
  type McpServer,
  ResourceNotFoundError,
} from "@modelcontextprotocol/server";
import {
  type CatalogSectionId,
  getCatalogSection,
  renderMarkdown,
} from "./mcp.catalog";

export type ResourceFormat = "json" | "md";

export type SiteResourceRef = {
  id: CatalogSectionId;
  format: ResourceFormat;
};

export const SITE_RESOURCE_IDS = [
  "whoami",
  "architecture-manifesto",
  "live-status",
  "stack-matrix",
  "case-studies",
  "services",
  "contact",
] as const satisfies readonly CatalogSectionId[];

export const RESOURCE_CACHE_HINT = {
  ttlMs: 3_600_000,
  cacheScope: "public",
} as const;

const RESOURCE_TITLES: Record<CatalogSectionId, string> = {
  whoami: "Who am I",
  "architecture-manifesto": "Architecture manifesto",
  "live-status": "Live status",
  "stack-matrix": "Stack matrix",
  "case-studies": "Case studies",
  services: "Services",
  contact: "Contact",
};

const SITE_RESOURCE_URI = /^site:\/\/([a-z0-9-]+)\.(json|md)$/;

function isCatalogSectionId(value: string): value is CatalogSectionId {
  return (SITE_RESOURCE_IDS as readonly string[]).includes(value);
}

export function parseSiteResourceUri(uri: string): SiteResourceRef | null {
  const match = SITE_RESOURCE_URI.exec(uri);
  if (!match) return null;

  const id = match[1];
  const format = match[2];
  if (!id || !format || !isCatalogSectionId(id)) return null;
  if (format !== "json" && format !== "md") return null;

  return { id, format };
}

export function buildResourceBody(
  id: CatalogSectionId,
  format: ResourceFormat,
) {
  if (format === "json")
    return {
      mimeType: "application/json",
      text: JSON.stringify(getCatalogSection(id)),
    };

  return {
    mimeType: "text/markdown",
    text: renderMarkdown(id),
  };
}

export function readSiteResource(uri: string) {
  const parsed = parseSiteResourceUri(uri);
  if (!parsed) throw new ResourceNotFoundError(uri);

  const body = buildResourceBody(parsed.id, parsed.format);

  return {
    contents: [
      {
        uri,
        mimeType: body.mimeType,
        text: body.text,
      },
    ],
  };
}

export function registerMcpResources(server: McpServer) {
  for (const id of SITE_RESOURCE_IDS) {
    for (const format of ["json", "md"] as const) {
      const uri = `site://${id}.${format}`;
      const mimeType = format === "json" ? "application/json" : "text/markdown";

      server.registerResource(
        `${id}.${format}`,
        uri,
        {
          title: `${RESOURCE_TITLES[id]} (${format})`,
          mimeType,
          cacheHint: RESOURCE_CACHE_HINT,
        },
        async (resourceUri) => readSiteResource(resourceUri.href),
      );
    }
  }
}
