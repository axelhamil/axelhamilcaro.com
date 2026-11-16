import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { ABOUT_STEPS } from "./about-story-data";

export function AboutStory() {
  return (
    <section id="parcours" className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Parcours</p>
          <h2 className="heading-display title-xl">
            Mon parcours, <br />
            <span className="marqueur">de Civitime à mes builds.</span>
          </h2>
        </header>

        <ol className="parcours flex flex-col">
          {ABOUT_STEPS.map(({ statut, quand, titre, texte }, index) => (
            <li
              key={titre}
              className="parcours-etape grid gap-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
            >
              <p
                className={`tampon ${index % 2 === 1 ? "tampon-droite" : ""} self-start justify-self-start`}
              >
                <span className="tampon-haut">{statut}</span>{" "}
                <span className="tampon-bas">{quand}</span>
              </p>
              <div className="mesure flex flex-col gap-2">
                <h3 className="heading-display title-md">{titre}</h3>
                <p className="para ink-secondary">
                  <BrandText text={texte} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
