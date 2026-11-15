import { Home } from "lucide-react";
import { Button } from "@/src/shared/ui/portfolio/button";

export function NotFoundLabel() {
  return (
    <section className="page-entete relative flex flex-col gap-6 min-w-0">
      <p className="surtitre">Erreur 404 · Colis introuvable</p>

      <div className="etiquette etiquette-carte bordereau relative mr-2">
        <h1 className="heading-display bordereau-code">404</h1>
        <p aria-hidden="true" className="tampon bordereau-tampon">
          <span className="tampon-haut">Retour à</span>{" "}
          <span className="tampon-bas">l'expéditeur</span>
        </p>
        <p className="label-mono ink-muted">
          CODE_ERREUR : PAGE_INTROUVABLE | STATUT : RETOUR À L'EXPÉDITEUR
        </p>
      </div>

      <div className="mesure flex flex-col gap-4">
        <h2 className="title-lg">Ce colis s'est perdu en route.</h2>
        <p className="para para-lg ink-secondary">
          Je n'ai aucune page à cette adresse. Le lien est peut-être ancien, ou
          une lettre s'est glissée de travers dans l'URL.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 pr-2 pb-2">
        <Button href="/" size="lg">
          <Home className="w-5 h-5" aria-hidden="true" />
          Retour à l'accueil
        </Button>
      </div>
    </section>
  );
}
