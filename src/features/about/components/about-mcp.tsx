import { CONTACT, MCP } from "@/app/_config/site.constants";
import { McpConnect } from "@/src/shared/ui/mcp/mcp-connect";

export function AboutMcp() {
  return (
    <section
      id="mcp"
      className="bloc-inverse pleine-largeur page-marges py-12 sm:py-16"
      aria-labelledby="mcp-title"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-14">
          <header className="flex flex-col gap-5">
            <p className="surtitre">Discuter avec moi</p>
            <h2 id="mcp-title" className="heading-display title-xl">
              Parle-moi de ton projet <br />{" "}
              <span className="marqueur">via ton assistant.</span>
            </h2>
            <p className="etiquette etiquette-jaune label-mono self-start max-w-full">
              <span className="mcp-adresse">{MCP.url}</span>
            </p>
          </header>

          <div className="mesure flex flex-col gap-4">
            <p className="para para-lg">
              <strong>Mon serveur MCP public est à {MCP.url}.</strong>{" "}
              Branche-le dans ton assistant et raconte ton projet : il mène la
              discussion comme je le ferais et te rend une fourchette calculée
              avec ma grille. Rien ne m&apos;est envoyé sans ton accord
              explicite et ton email.
            </p>
            <p className="para ink-secondary">
              Détail technique : les agents s&apos;y connectent en POST
              Streamable HTTP. Cursor et Claude : handshake{" "}
              <code>initialize</code> en protocolVersion 2025-03-26. Un header
              MCP-Protocol-Version 2026-07-28 sur initialize est ignoré, le
              serveur négocie 2025-03-26. Les clients 2026-07-28 utilisent{" "}
              <code>server/discover</code>. Ce n&apos;est pas une page à ouvrir
              dans le navigateur.
            </p>
            <p className="para ink-secondary">
              Il expose aussi mon identité, ma stack, mes études de cas et mes
              services, et un audit d&apos;architecture déterministe. Pour
              m&apos;écrire directement, {CONTACT.email}.
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

        <McpConnect />
      </div>
    </section>
  );
}
