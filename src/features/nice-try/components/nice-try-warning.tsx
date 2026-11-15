import { AlertTriangle } from "lucide-react";

export function NiceTryWarning() {
  return (
    <aside
      aria-labelledby="nice-try-avertissement"
      className="etiquette etiquette-fond-jaune nice-try-avertissement items-start gap-3 mr-2"
    >
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <h2 id="nice-try-avertissement" className="label-mono">
          Avertissement
        </h2>
        <p>
          Chaque nouvelle tentative de connexion augmente ton temps de
          bannissement de manière exponentielle. Je garde désormais ton compte
          GitHub à l'œil.
        </p>
      </div>
    </aside>
  );
}
