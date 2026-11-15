"use client";

import { useEffect, useState } from "react";

interface Incident {
  id: string;
  horodatage: string;
}

export function NiceTryIncidentInfo() {
  const [incident, setIncident] = useState<Incident | null>(null);

  useEffect(() => {
    setIncident({
      id: Math.random().toString(36).slice(2, 10),
      horodatage: new Date().toISOString(),
    });
  }, []);

  return (
    <p className="label-mono ink-muted nice-try-incident">
      {incident ? `incident_id: ${incident.id} • ${incident.horodatage}` : null}
    </p>
  );
}
