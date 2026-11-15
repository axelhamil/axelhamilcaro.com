import {
  AlertTriangle,
  Bell,
  Camera,
  Clock,
  Database,
  MapPin,
  ShieldAlert,
  Wifi,
} from "lucide-react";

const GROUPES = [
  {
    titre: "Données capturées",
    icone: ShieldAlert,
    ombre: "",
    points: [
      { icone: Camera, label: "Profil GitHub enregistré" },
      { icone: Database, label: "Tentative logguée en DB" },
      { icone: Wifi, label: "Adresse IP capturée" },
    ],
  },
  {
    titre: "Actions en cours",
    icone: AlertTriangle,
    ombre: "etiquette-jaune",
    points: [
      { icone: MapPin, label: "Géolocalisation active" },
      { icone: Clock, label: "Rate limiting appliqué" },
      { icone: Bell, label: "Je suis notifié" },
    ],
  },
] as const;

export function NiceTryDataPoints() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 pr-2 pb-2">
      {GROUPES.map(({ titre, icone: Icone, ombre, points }) => (
        <section
          key={titre}
          aria-label={titre}
          className={`etiquette etiquette-carte ${ombre} gap-4`}
        >
          <h2 className="label-mono flex items-center gap-2">
            <Icone className="w-4 h-4" aria-hidden="true" />
            {titre}
          </h2>
          <ul className="flex flex-col gap-3">
            {points.map(({ icone: Point, label }) => (
              <li
                key={label}
                className="nice-try-point flex items-center gap-3"
              >
                <Point className="w-4 h-4 shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
