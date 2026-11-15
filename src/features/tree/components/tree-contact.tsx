import { Calendar, Mail } from "lucide-react";
import { EXTERNAL_LINKS } from "@/app/_config/site.constants";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

export default function TreeContact() {
  return (
    <section aria-labelledby="tree-contact" className="flex flex-col gap-4">
      <h2 id="tree-contact" className="surtitre">
        Discuter d'un projet
      </h2>
      <div className="grid grid-cols-2 gap-4 pr-2 pb-2">
        <ContactModal>
          <Button type="button" variant="secondary">
            <Mail className="w-4 h-4" />
            Contact
          </Button>
        </ContactModal>
        <Button href={EXTERNAL_LINKS.calendly}>
          <Calendar className="w-4 h-4" />
          Appel découverte
        </Button>
      </div>
    </section>
  );
}
