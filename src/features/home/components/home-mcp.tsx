import { MCP } from "@/app/_config/site.constants";

export function HomeMcp() {
  return (
    <p className="mx-auto max-w-4xl px-6 pb-10 -mt-2 text-[11px] leading-relaxed text-muted-foreground">
      Serveur MCP public à {MCP.url} (POST). Manifeste{" "}
      <a
        href={MCP.manifestPath}
        className="underline underline-offset-2 decoration-border hover:text-secondary"
      >
        {MCP.manifestPath}
      </a>
      .
    </p>
  );
}
