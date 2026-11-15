import { ArrowRight, Mail } from "lucide-react";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

export function BlogPostCta() {
  return (
    <aside
      className="cta-fin bloc-inverse etiquette etiquette-carte etiquette-jaune gap-5"
      aria-label="Travaillons ensemble"
    >
      <p className="surtitre">Travaillons ensemble</p>
      <h2 className="cta-fin-titre heading-display">
        Une mission ou un avis technique <br />
        <span className="marqueur">sur ton projet ?</span>
      </h2>
      <p className="cta-fin-texte">
        Je suis développeur fullstack et builder : 4 ans chez Civitime, de
        développeur à lead technique, puis 20+ projets livrés depuis fin 2024.
        Je prends des projets en freelance : application web, SaaS B2B ou lead
        tech à temps partiel. Devis sous 24h.
      </p>
      <ContactModal>
        <Button type="button" size="lg" className="self-start">
          <Mail className="w-5 h-5" aria-hidden="true" />
          Me contacter
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </ContactModal>
    </aside>
  );
}
