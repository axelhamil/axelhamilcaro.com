import { ANNEES, PISTES } from "./parcours-data";

export function ParcoursPistes() {
  return (
    <fieldset className="pistes trame">
      <legend className="pistes-legende">
        Choisis une étape du parcours pour ouvrir sa fiche
      </legend>

      <div className="pistes-echelle" aria-hidden="true">
        {ANNEES.map((annee) => (
          <span key={annee}>{annee}</span>
        ))}
      </div>

      {PISTES.map((piste, index) => (
        <label
          key={piste.id}
          className={`piste piste-${piste.id}`}
          data-chapitre={piste.chapitre}
        >
          <input
            type="radio"
            name="parcours"
            id={`parcours-${piste.id}`}
            className="piste-choix"
            defaultChecked={index === 0}
          />
          <span className="piste-tete">
            <span className="piste-nom">{piste.entreprise}</span>
            <span className="piste-repere">{piste.repere}</span>
            <span className="piste-periode">{piste.periode}</span>
          </span>
          <span className="piste-voie" aria-hidden="true">
            <span
              className={
                piste.enCours
                  ? "piste-barre piste-barre-en-cours"
                  : "piste-barre"
              }
            />
          </span>
        </label>
      ))}
    </fieldset>
  );
}
