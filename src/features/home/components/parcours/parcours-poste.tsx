import Image from "next/image";
import { Button } from "@/src/shared/ui/portfolio/button";
import type { Mission, Poste } from "./parcours-data";

const OMBRES_RESULTATS = [
  "etiquette etiquette-sm",
  "etiquette etiquette-sm etiquette-gris",
  "etiquette etiquette-sm etiquette-jaune",
] as const;

export interface ParcoursPosteProps {
  poste: Poste;
  missions?: readonly Mission[];
}

export function ParcoursPoste({ poste, missions }: ParcoursPosteProps) {
  const titreId = `poste-${poste.id}-titre`;

  return (
    <article className={`poste poste-${poste.id}`} aria-labelledby={titreId}>
      {poste.affiche ? (
        <Image
          src={poste.affiche.src}
          alt={poste.affiche.alt}
          width={1600}
          height={836}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="poste-affiche"
        />
      ) : null}

      {poste.etabli ? (
        <div className="poste-affiche poste-etabli trame" aria-hidden="true">
          <p className="surtitre">{poste.etabli.surtitre}</p>
          <p className="heading-display poste-etabli-titre">
            {poste.etabli.titre}
            <br />
            <span className="poste-etabli-accent">{poste.etabli.accent}</span>
          </p>
          <ul className="poste-etabli-tags">
            {poste.etabli.tags.map((tag) => (
              <li key={tag} className="etiquette etiquette-sm etiquette-jaune">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="poste-texte">
        <header className="poste-tete">
          {poste.moment ? (
            <p className="poste-moment label-mono">{poste.moment}</p>
          ) : null}
          <h3 id={titreId} className="heading-display poste-nom">
            {poste.entreprise}
          </h3>
          <p className="poste-role">{poste.role}</p>
          <p className="poste-periode label-mono">
            {poste.fin ? (
              <>
                <time dateTime={poste.debut.iso}>{poste.debut.label}</time> à{" "}
                <time dateTime={poste.fin.iso}>{poste.fin.label}</time>
              </>
            ) : (
              <>
                Depuis{" "}
                <time dateTime={poste.debut.iso}>{poste.debut.label}</time>
              </>
            )}
            {poste.contrat ? <span> ■ {poste.contrat}</span> : null}
          </p>
        </header>

        <p className="para poste-contexte">{poste.contexte}</p>

        <div className="poste-bloc">
          <p className="label-mono poste-intertitre">{poste.faitsTitre}</p>
          <ul className="poste-faits">
            {poste.faits.map((fait) => (
              <li key={fait}>{fait}</li>
            ))}
          </ul>
        </div>

        {missions ? (
          <div className="poste-bloc">
            <p className="label-mono poste-intertitre">Missions</p>
            <ul className="missions">
              {missions.map((mission) => (
                <li key={mission.nom} className="mission">
                  <span className="mission-nom">{mission.nom}</span>
                  <span className="mission-periode label-mono">
                    {mission.periode}
                  </span>
                  <span className="mission-texte">{mission.texte}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {poste.resultats.length > 0 ? (
          <ul className="poste-resultats" aria-label="Résultats">
            {poste.resultats.map((resultat, index) => (
              <li
                key={resultat}
                className={OMBRES_RESULTATS[index % OMBRES_RESULTATS.length]}
              >
                {resultat}
              </li>
            ))}
          </ul>
        ) : null}

        {poste.stack.length > 0 ? (
          <ul className="poste-stack label-mono" aria-label="Stack">
            {poste.stack.map((outil) => (
              <li key={outil}>{outil}</li>
            ))}
          </ul>
        ) : null}

        {poste.liens.length > 0 ? (
          <p className="poste-liens">
            {poste.liens.map((lien, index) => (
              <Button
                key={lien.href}
                href={lien.href}
                variant={index === 0 ? "secondary" : "ghost"}
              >
                {lien.label}
              </Button>
            ))}
          </p>
        ) : null}
      </div>
    </article>
  );
}
