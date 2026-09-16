import { CONTACT, MCP } from "@/app/_config/site.constants";

export function AboutMcp() {
  return (
    <section id="mcp" className="py-12 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Serveur MCP public
        </h2>
        <p className="text-secondary text-lg leading-relaxed mb-4">
          <strong className="text-primary">
            Axel Hamilcaro expose un serveur MCP public à {MCP.url}.
          </strong>{" "}
          Les agents s&apos;y connectent en POST Streamable HTTP. Cursor et
          Claude : handshake <code>initialize</code> en protocolVersion
          2025-03-26, sans header MCP-Protocol-Version. Les clients 2026-07-28
          utilisent <code>server/discover</code>. Ce n&apos;est pas une page à
          ouvrir dans le navigateur.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-4">
          Le serveur publie l&apos;identité, la stack, les case studies et les
          services. Il propose un audit d&apos;architecture déterministe puis
          une proposition non contractuelle. Il n&apos;envoie pas de lead. Pour
          écrire, {CONTACT.email}.
        </p>
        <p className="text-secondary text-lg leading-relaxed">
          Manifeste machine,{" "}
          <a
            href={MCP.manifestUrl}
            className="underline underline-offset-2 text-primary"
          >
            {MCP.manifestUrl}
          </a>
          . Catalogue texte,{" "}
          <a
            href={MCP.llmsUrl}
            className="underline underline-offset-2 text-primary"
          >
            {MCP.llmsUrl}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
