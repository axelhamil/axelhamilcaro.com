import {
  type McpServer,
  ResourceNotFoundError,
} from "@modelcontextprotocol/server";
import {
  CATALOG_SECTION_IDS,
  type CatalogSectionId,
  getCatalogSection,
  isCatalogSectionId,
  renderMarkdown,
} from "./mcp.catalog";

export type ResourceFormat = "json" | "md";

export type SiteResourceRef = {
  id: CatalogSectionId;
  format: ResourceFormat;
};

export const SITE_RESOURCE_IDS = CATALOG_SECTION_IDS;

export const RESOURCE_CACHE_HINT = {
  ttlMs: 3_600_000,
  cacheScope: "public",
} as const;

const RESOURCE_TITLES: Record<CatalogSectionId, string> = {
  whoami: "Who am I",
  "architecture-manifesto": "Architecture manifesto",
  "live-status": "Live status",
  "stack-matrix": "Stack matrix",
  projects: "Projects",
  "case-studies": "Case studies",
  services: "Services",
  contact: "Contact",
  method: "Method",
  "estimation-grid": "Estimation grid",
  references: "Reference projects",
};

export const RESOURCE_DESCRIPTIONS: Record<CatalogSectionId, string> = {
  whoami:
    "Read first to know who Axel is, what he builds and his current roles.",
  "architecture-manifesto":
    "Read to understand the engineering principles and architecture choices Axel applies.",
  "live-status":
    "Read to check whether Axel is available, when he can start and how fast he quotes.",
  "stack-matrix":
    "Read to compare a project's stack with the technologies Axel masters and his level on each.",
  projects:
    "Read to see the products and open source tools Axel builds and publishes.",
  "case-studies":
    "Read for detailed client projects with metrics, stack and Axel's role on each.",
  services:
    "Read to know which services Axel offers and their daily or monthly rates.",
  contact:
    "Read when the visitor wants to reach Axel by email, LinkedIn, X, Reddit, Malt or a call.",
  method:
    "Read before scoping a project to know how Axel works, what he does not take and how he estimates.",
  "estimation-grid":
    "Read to see the draft grid of working days per feature and size behind every estimate.",
  references:
    "Read to compare a project with delivered projects and their real durations.",
};

const SITE_RESOURCE_URI = /^site:\/\/([a-z0-9-]+)\.(json|md)$/;

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
          description: RESOURCE_DESCRIPTIONS[id],
          mimeType,
          cacheHint: RESOURCE_CACHE_HINT,
        },
        async (resourceUri) => readSiteResource(resourceUri.href),
      );
    }
  }
}
