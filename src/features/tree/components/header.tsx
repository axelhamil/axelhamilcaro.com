import Image from "next/image";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

export default function TreeHeader() {
  return (
    <header className="flex flex-col items-start gap-6">
      <div className="flex items-center gap-5">
        <Image
          src="/axel-hamilcaro-developpeur-fullstack.jpeg"
          alt="Axel Hamilcaro, développeur fullstack freelance"
          width={96}
          height={96}
          className="tree-portrait w-20 h-20 sm:w-24 sm:h-24 object-cover shrink-0"
          preload
          fetchPriority="high"
        />
        <div className="flex flex-col gap-2 min-w-0">
          <h1 className="heading-display tree-h1">Axel Hamilcaro</h1>
          <p className="label-mono ink-secondary">
            Développeur fullstack et builder
          </p>
        </div>
      </div>

      <Paragraph size="lg">
        <strong>
          Je suis Axel Hamilcaro, développeur fullstack et builder basé à Tours.
        </strong>{" "}
        Tous mes liens sont ici. Pour parler d'un projet, écris-moi ou réserve
        un appel. Pour suivre ce que je fabrique, choisis ton réseau.
      </Paragraph>
    </header>
  );
}
