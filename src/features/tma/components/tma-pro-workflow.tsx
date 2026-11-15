import { Clock, MessageCircle, MessagesSquare, Video } from "lucide-react";
import { TMA_PRO_WORKFLOW } from "../lib/tma-data";
import { TmaLivrables } from "./tma-livrables";
import { TmaSectionEntete } from "./tma-section-entete";

const ICONS = [MessagesSquare, Clock, MessageCircle, Video] as const;

export function TmaProWorkflow() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        badge={{ label: "PRO", tone: "pro" }}
        eyebrow="// communication_et_suivi_pro()"
        title="Comment ça se passe au quotidien."
        intro="Pas de portail, pas de boîte noire. Le suivi se fait là où tu communiques déjà, avec une transparence totale sur les heures consommées."
      />
      <TmaLivrables items={TMA_PRO_WORKFLOW} icons={ICONS} ombre="gris" />
    </section>
  );
}
