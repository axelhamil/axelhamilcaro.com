import type { Metadata } from "next";
import { NiceTryDataPoints } from "@/src/features/nice-try/components/nice-try-data-points";
import { NiceTryHeader } from "@/src/features/nice-try/components/nice-try-header";
import { NiceTryIncidentInfo } from "@/src/features/nice-try/components/nice-try-incident-info";
import { NiceTryReturnLink } from "@/src/features/nice-try/components/nice-try-return-link";
import { NiceTryTerminal } from "@/src/features/nice-try/components/nice-try-terminal";
import { NiceTryWarning } from "@/src/features/nice-try/components/nice-try-warning";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";

const ACCES_REFUSE = [
  "Accès refusé",
  "Zone réservée",
  "Erreur 403",
  "Admin uniquement",
  "Connexion GitHub",
  "Compte non autorisé",
  "Tentative enregistrée",
  "auth.log",
  "login_attempts",
  "Intrus détecté",
  "Profil capturé",
  "Session fermée",
] as const;

export const metadata: Metadata = {
  title: "Accès refusé",
  description: "J'ai détecté une tentative d'accès non autorisée.",
  robots: { index: false, follow: false },
};

export default function NiceTryPage() {
  return (
    <main className="trame min-h-svh flex flex-col">
      <Ribbon items={ACCES_REFUSE} hachures />
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-10">
        <NiceTryHeader />
        <NiceTryTerminal />
        <NiceTryDataPoints />
        <NiceTryWarning />
        <NiceTryReturnLink />
        <NiceTryIncidentInfo />
      </div>
    </main>
  );
}
