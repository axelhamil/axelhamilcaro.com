import Terminal from "./terminal";
import { Heading1 } from "./ui/heading1";
import { Heading2 } from "./ui/heading2";
import { Paragraphe } from "./ui/paragraphe";

const Hero = () => {
  return (
    <section className="container mx-auto h-[calc(100vh-100px)] flex flex-col md:flex-row md:justify-between items-center gap-10 2xl:gap-30">
      
      <div className="w-full md:max-w-3xl flex flex-col gap-5">
        <Heading1 size={"xl"} className="font-mono">
          &gt; Axel Hamilcaro
        </Heading1>
        <Heading2 size={"lg"} className="font-semibo">
          Full-Stack · TypeScript · Product-Oriented
        </Heading2>

        <Paragraphe size="lg">
          Un produit web qui fonctionne, c’est bien. Un produit qui est utilisé,
          maintenable et rentable, c’est mieux.
        </Paragraphe>

        <Paragraphe size="lg">
          J’accompagne les entreprises et les entrepreneurs dans la conception
          et le développement d’applications web solides, pensées dès le départ
          pour répondre à de vrais enjeux métier.
        </Paragraphe>

        <Paragraphe size="lg">
          Architecture claire, décisions techniques maîtrisées et expérience
          utilisateur fluide : chaque choix est fait pour accélérer la mise en
          production sans compromettre l’avenir du produit.
        </Paragraphe>

        <Paragraphe size="lg" variant="highlight">
          C’est exactement ce que je construis.
        </Paragraphe>
      </div>

      <div className="w-full md:w-1/2 h-6/12 flex justify-center">
        <Terminal className={"glass h-full"} />
      </div>
    </section>
  );
};

export default Hero;
