import { NiceTryBackdrop } from "@/src/features/nice-try/components/nice-try-backdrop";
import { NiceTryDataPoints } from "@/src/features/nice-try/components/nice-try-data-points";
import { NiceTryHeader } from "@/src/features/nice-try/components/nice-try-header";
import { NiceTryIncidentInfo } from "@/src/features/nice-try/components/nice-try-incident-info";
import { NiceTryReturnLink } from "@/src/features/nice-try/components/nice-try-return-link";
import { NiceTryTerminal } from "@/src/features/nice-try/components/nice-try-terminal";
import { NiceTryWarning } from "@/src/features/nice-try/components/nice-try-warning";

export default function NiceTryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden selection:bg-red-500/30">
      <NiceTryBackdrop />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <NiceTryHeader />
        <NiceTryTerminal />
        <NiceTryDataPoints />
        <NiceTryWarning />
        <NiceTryReturnLink />
        <NiceTryIncidentInfo />
      </div>
    </div>
  );
}
