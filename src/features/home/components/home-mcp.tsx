import { Plus } from "lucide-react";
import { MCP_PROMPT, MCP_TOOLS } from "@/app/_config/mcp-clients";
import { MCP } from "@/app/_config/site.constants";
import { TerminalBlock } from "@/src/shared/ui/effects/typewriter";
import { McpConnect } from "@/src/shared/ui/mcp/mcp-connect";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const terminalLines = [
  { prefix: "POST", text: "/mcp" },
  {
    prefix: "→",
    text: `prompt ${MCP_PROMPT}, tools ${MCP_TOOLS.join(" et ")}`,
  },
  { prefix: "GET", text: MCP.manifestPath },
  { prefix: "→", text: "manifeste machine" },
  { prefix: "GET", text: MCP.llmsPath },
  { prefix: "→", text: "catalogue texte" },
];

const steps = [
  {
    title: "Branche",
    text: "Ajoute l'adresse de mon serveur à Claude, ChatGPT, Cursor ou Claude Code. Compte une minute.",
  },
  {
    title: "Raconte",
    text: "Colle la phrase d'amorce, puis réponds aux questions comme tu le ferais avec moi.",
  },
  {
    title: "Décide",
    text: "Tu reçois la fourchette, ses hypothèses et ses questions ouvertes. Si tu veux, ton assistant m'envoie le récap.",
  },
];

export function HomeMcp() {
  return (
    <section id="mcp" className="pleine-largeur" aria-labelledby="mcp-title">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <header className="section-tete">
          <p className="surtitre">Discuter sans créneau</p>
          <Heading2 id="mcp-title" size="xl">
            Estime ton projet <br />{" "}
            <span className="marqueur">comme si tu m'en parlais.</span>
          </Heading2>
          <Paragraph size="lg" className="section-intro">
            <strong>
              Branche mon serveur dans ton assistant et raconte-lui ton projet :
              il te pose mes questions, une à la fois.
            </strong>{" "}
            Tu repars avec une fourchette en jours et en euros HT, calculée avec
            ma grille de prix : les mêmes réponses donnent toujours le même
            chiffre. Ce n'est pas un devis, et rien ne m'est envoyé sans ton
            accord.
          </Paragraph>
        </header>

        <ol className="mcp-etapes min-w-0">
          {steps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p className="ink-secondary">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="min-w-0 lg:col-span-2">
          <McpConnect />
        </div>

        <details className="faq-item min-w-0 lg:col-span-2">
          <summary className="faq-question grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6">
            Pour les curieux et les agents
            <Plus className="faq-signe w-5 h-5" aria-hidden="true" />
          </summary>
          <div className="flex flex-col gap-6 pt-4">
            <TerminalBlock
              lines={terminalLines}
              className="mcp-terminal min-w-0"
            />
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
                Détails techniques
              </TransitionLink>
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
