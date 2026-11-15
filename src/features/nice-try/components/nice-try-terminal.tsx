import { Terminal } from "lucide-react";

const LIGNES = [
  { commande: true, texte: "ssh root@intruder.local" },
  { commande: false, texte: "Establishing connection..." },
  { commande: false, texte: "Connection established." },
  { commande: true, texte: "cat /var/log/auth.log | grep FAILED" },
  { commande: false, texte: "Récupération de ton adresse IP..." },
  { commande: false, texte: "IP: 192.168.█.███ (redacted)" },
  { commande: true, texte: "whois $(curl -s ifconfig.me)" },
  { commande: false, texte: "Géolocalisation en cours..." },
  { commande: false, texte: "Location: ████████, France" },
  { commande: true, texte: "curl -s api.github.com/user/$ID" },
  { commande: false, texte: "Extraction profil GitHub..." },
  { commande: false, texte: "Username: [CAPTURED]" },
  { commande: false, texte: "Email: [CAPTURED]" },
  { commande: false, texte: "Avatar: [CAPTURED]" },
  { commande: true, texte: "INSERT INTO login_attempts..." },
  { commande: false, texte: "Query OK, 1 row affected" },
  { commande: true, texte: "notify-send 'INTRUDER DETECTED'" },
  { commande: false, texte: "Slack webhook triggered." },
  { commande: true, texte: "rate_limit.apply(exponential=true)" },
  { commande: false, texte: "Ban duration: ∞" },
  { commande: false, texte: "Tu es foutu." },
] as const;

export function NiceTryTerminal() {
  return (
    <section
      aria-label="Journal de sécurité"
      className="terminal nice-try-terminal mr-2"
    >
      <p className="terminal-barre flex items-center justify-between gap-3 px-4 py-2">
        <span className="truncate">
          root@security-daemon ~ INTRUDER_DETECTED
        </span>
        <Terminal className="w-4 h-4 shrink-0" aria-hidden="true" />
      </p>
      <ol className="nice-try-journal flex flex-col gap-1 p-4">
        {LIGNES.map(({ commande, texte }) => (
          <li key={texte} className="terminal-ligne flex gap-2">
            <span className="terminal-prefixe shrink-0">
              {commande ? "$" : ">"}
            </span>
            <span className={commande ? undefined : "nice-try-sortie"}>
              {texte}
            </span>
          </li>
        ))}
        <li
          aria-hidden="true"
          className="terminal-ligne flex items-center gap-2"
        >
          <span className="terminal-prefixe">$</span>
          <span className="terminal-curseur" />
        </li>
      </ol>
    </section>
  );
}
