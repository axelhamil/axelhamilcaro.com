"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function NiceTryIncidentInfo() {
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [incidentId, setIncidentId] = useState<string | null>(null);

  useEffect(() => {
    setTimestamp(new Date().toISOString());
    setIncidentId(Math.random().toString(36).slice(2, 10));
  }, []);

  return (
    <motion.div
      className="absolute bottom-4 left-0 right-0 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5 }}
    >
      <p className="text-zinc-700 text-xs font-mono">
        {incidentId && timestamp && (
          <>
            incident_id: {incidentId} • {timestamp}
          </>
        )}
      </p>
    </motion.div>
  );
}
