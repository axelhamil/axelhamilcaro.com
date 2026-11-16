import { MCP } from "@/app/_config/site.constants";
import { TerminalBlock } from "@/src/shared/ui/effects/typewriter";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const terminalLines = [
  { prefix: "POST", text: "/mcp" },
  { prefix: "→", text: "identité, stack, études de cas, services" },
  { prefix: "GET", text: MCP.manifestPath },
  { prefix: "→", text: "manifeste machine" },
  { prefix: "GET", text: MCP.llmsPath },
  { prefix: "→", text: "catalogue texte" },
];

export function HomeMcp() {
  return (
    <section id="mcp" className="pleine-largeur" aria-labelledby="mcp-title">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <header className="section-tete">
          <p className="surtitre">Outils pour les agents</p>
          <Heading2 id="mcp-title" size="xl">
            Un serveur MCP <br /> <span className="marqueur">sur ce site.</span>
          </Heading2>
          <Paragraph size="lg" className="section-intro">
            <strong>J'expose un serveur MCP public à {MCP.url}.</strong> Un
            agent IA s'y connecte en POST et lit mon identité, ma stack, mes
            études de cas et mes services, sans passer par une page HTML. Il
            propose aussi un audit d'architecture déterministe. Il peut estimer
            un projet et, si la personne le décide, m'envoyer le récap.
          </Paragraph>
          <Paragraph variant="secondary" className="section-intro">
            C'est le genre de brique que j'aime fabriquer : on la branche, elle
            répond.
          </Paragraph>
          <p className="flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={MCP.manifestPath}
              className="link-underline label-mono cible-tactile"
            >
              Manifeste
            </a>
            <a
              href={MCP.llmsPath}
              className="link-underline label-mono cible-tactile"
            >
              llms.txt
            </a>
            <TransitionLink
              href="/about#mcp"
              className="link-underline label-mono cible-tactile"
            >
              Comment s'y connecter
            </TransitionLink>
          </p>
        </header>

        <TerminalBlock lines={terminalLines} className="mcp-terminal min-w-0" />
      </div>
    </section>
  );
}
