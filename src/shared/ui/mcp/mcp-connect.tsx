import { MCP_CLIENTS, MCP_STARTER_PROMPT } from "@/app/_config/mcp-clients";
import { MCP } from "@/app/_config/site.constants";
import { CopyButton } from "@/src/shared/ui/mcp/copy-button";

export function McpConnect() {
  return (
    <div className="mcp-connexion">
      <h3 className="heading-display title-md">Brancher en une minute</h3>

      <div className="mcp-ligne">
        <p className="label-mono">Adresse du serveur</p>
        <code className="mcp-copiable mcp-adresse">{MCP.url}</code>
        <CopyButton text={MCP.url} label="Copier l'adresse" />
      </div>

      <div className="mcp-ligne">
        <p className="label-mono">Phrase d'amorce</p>
        <p className="mcp-copiable">{MCP_STARTER_PROMPT}</p>
        <CopyButton text={MCP_STARTER_PROMPT} label="Copier la phrase" />
      </div>

      <ul className="grille-cartes">
        {MCP_CLIENTS.map((client) => (
          <li key={client.id} className="mcp-client">
            <h3 className="heading-display title-md">{client.name}</h3>
            <ol className="mcp-etapes">
              {client.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {client.code && (
              <>
                <pre className="mcp-code">
                  <code>{client.code}</code>
                </pre>
                <CopyButton text={client.code} label="Copier" />
              </>
            )}
            {client.note && <p className="ink-muted">{client.note}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
