import { MCP } from "@/app/_config/site.constants";

export function HomeMcp() {
  return (
    <p className="px-6 pt-6 text-sm text-secondary">
      Serveur MCP public : {MCP.url} (POST). Manifeste :{" "}
      <a
        href={MCP.manifestPath}
        className="underline underline-offset-2 text-primary"
      >
        {MCP.manifestPath}
      </a>
      .
    </p>
  );
}
