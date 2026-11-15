import { Lock } from "lucide-react";

export function LoginHeader() {
  return (
    <header className="page-entete flex flex-col items-start gap-5">
      <p className="etiquette etiquette-jaune login-cadenas">
        <Lock className="w-6 h-6" aria-hidden="true" />
      </p>
      <h1 className="heading-display login-h1">Administration</h1>
      <p className="para para-md ink-secondary">
        Cet espace est réservé à mon usage : c'est d'ici que je gère mes
        formulaires, mes leads et mes liens.
      </p>
    </header>
  );
}
