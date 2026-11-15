import {
  Activity,
  CalendarClock,
  FileText,
  MessagesSquare,
} from "lucide-react";
import { TMA_PREMIUM_DELIVERABLES } from "../lib/tma-data";
import { TmaLivrables } from "./tma-livrables";
import { TmaSectionEntete } from "./tma-section-entete";

const ICONS = [Activity, FileText, CalendarClock, MessagesSquare] as const;

export function TmaDeliverables() {
  return (
    <section
      id="premium-details"
      className="svc-section container scroll-mt-24"
    >
      <TmaSectionEntete
        badge={{ label: "Premium uniquement", tone: "premium" }}
        eyebrow="// livrables_premium()"
        title="Ce que tu obtiens en plus, en 10h / mois."
        intro="Quatre livrables récurrents qui n'existent pas en PRO. Setup, rédaction et maintenance compris dans le forfait : tu n'as pas à arbitrer entre « heures de support » et « heures de livrables »."
      />
      <TmaLivrables
        items={TMA_PREMIUM_DELIVERABLES}
        icons={ICONS}
        ombre="jaune"
      />
    </section>
  );
}
