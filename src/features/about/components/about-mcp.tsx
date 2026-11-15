import { CONTACT, MCP } from "@/app/_config/site.constants";

export function AboutMcp() {
  return (
    <section
      id="mcp"
      className="bloc-inverse pleine-largeur page-marges py-12 sm:py-16"
    >
      <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Outils pour les agents</p>
          <h2 className="heading-display title-xl">
            Serveur MCP <br /> <span className="marqueur">public.</span>
          </h2>
          <p className="etiquette etiquette-jaune label-mono self-start max-w-full">
            <span className="mcp-adresse">POST {MCP.url}</span>
          </p>
        </header>

        <div className="mesure flex flex-col gap-4">
          <p className="para para-lg">
            <strong>J'expose un serveur MCP public à {MCP.url}.</strong> Les
            agents s&apos;y connectent en POST Streamable HTTP. Cursor et Claude
            : handshake <code>initialize</code> en protocolVersion 2025-03-26.
            Un header MCP-Protocol-Version 2026-07-28 sur initialize est ignoré,
            le serveur négocie 2025-03-26. Les clients 2026-07-28 utilisent{" "}
            <code>server/discover</code>. Ce n&apos;est pas une page à ouvrir
            dans le navigateur.
          </p>
          <p className="para ink-secondary">
            Le serveur publie mon identité, ma stack, mes études de cas et mes
            services. Il propose un audit d&apos;architecture déterministe puis
            une proposition non contractuelle. Il n&apos;envoie pas de lead.
            Pour m&apos;écrire, {CONTACT.email}.
          </p>
          <p className="para ink-secondary">
            Manifeste machine,{" "}
            <a href={MCP.manifestUrl} className="link-underline mcp-adresse">
              {MCP.manifestUrl}
            </a>
            . Catalogue texte,{" "}
            <a href={MCP.llmsUrl} className="link-underline mcp-adresse">
              {MCP.llmsUrl}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
