import { ArrowRight, Mail } from "lucide-react";
import { ContactModal } from "@/src/features/contact/components/contact-modal";

export function BlogPostCta() {
  return (
    <aside
      className="mt-12 sm:mt-16 mx-auto max-w-3xl"
      aria-label="Travaillons ensemble"
    >
      <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/5 to-transparent p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Travaillons ensemble
        </p>
        <h2
          className="text-2xl sm:text-3xl font-bold text-primary mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Une mission ou un avis technique sur ton projet ?
        </h2>
        <p className="text-secondary text-sm sm:text-base leading-relaxed mb-6">
          Lead tech 4 ans, 10+ projets livrés en autonomie. Disponible pour
          mission Next.js, SaaS B2B ou lead tech temps partiel. Devis sous 24h.
        </p>
        <ContactModal>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold bg-accent text-white hover:bg-accent-hover transition-all hover:shadow-lg hover:scale-[1.02] group cursor-pointer w-full sm:w-auto justify-center"
          >
            <Mail className="w-5 h-5" />
            Me contacter
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </ContactModal>
      </div>
    </aside>
  );
}
