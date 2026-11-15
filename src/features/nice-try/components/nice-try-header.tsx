import { Eye } from "lucide-react";

export function NiceTryHeader() {
  return (
    <header className="page-entete relative flex flex-col items-start gap-5">
      <p className="surtitre">Erreur 403 · Connexion refusée</p>
      <h1 className="heading-display nice-try-h1">
        Nice <br /> <span className="marqueur">try</span>
      </h1>
      <p aria-hidden="true" className="tampon tampon-droite nice-try-tampon">
        <span className="tampon-haut">Intrus</span>{" "}
        <span className="tampon-bas">Repéré</span>
      </p>
      <p className="para para-lg ink-secondary flex items-center gap-3">
        <Eye className="w-5 h-5 shrink-0" aria-hidden="true" />
        Tu pensais vraiment que ça allait marcher ?
      </p>
    </header>
  );
}
