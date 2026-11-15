import { ArrowRight, Mail } from "lucide-react";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";

export function AboutWorkWithMe() {
  return (
    <section
      id="travailler-avec-moi"
      className="bloc-inverse pleine-largeur page-marges flex flex-col"
    >
      <div className="hachures pleine-largeur" aria-hidden="true" />
      <div className="max-w-5xl w-full mx-auto py-12 sm:py-16 flex flex-col gap-6">
        <p className="surtitre">Travailler avec moi</p>
        <h2 className="heading-display title-xl">
          Un projet ? <br /> <span className="marqueur">Parlons-en.</span>
        </h2>
        <p className="mesure para para-lg">
          Je prends encore des projets clients en freelance, à côté de mon poste
          et de mes builds. Mes offres, mes prix et ma façon de travailler sont
          sur la page services. J'écris aussi sur le prix d'une application, la
          maintenance et le travail avec Claude Code, dans{" "}
          <TransitionLink href="/blog" className="souligne-trace">
            mes articles de blog
          </TransitionLink>
          .
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 pr-2 pb-2">
          <Button href="/services" size="lg">
            Travailler avec moi
            <ArrowRight className="w-5 h-5" />
          </Button>
          <ContactModal>
            <Button type="button" variant="secondary" size="lg">
              <Mail className="w-5 h-5" />
              Me contacter
            </Button>
          </ContactModal>
        </div>
      </div>
    </section>
  );
}
