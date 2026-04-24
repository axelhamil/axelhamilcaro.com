"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  Clock,
  Database,
  MapPin,
  ShieldAlert,
  Terminal,
  Wifi,
} from "lucide-react";

function DataPoint({
  icon: Icon,
  label,
  delay,
}: {
  icon: typeof Camera;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 text-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-red-400" />
      </div>
      <span className="text-zinc-400 font-mono text-xs sm:text-sm">
        {label}
      </span>
    </motion.div>
  );
}

export function NiceTryDataPoints() {
  return (
    <motion.div
      className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-red-400 mb-3">
          <ShieldAlert className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            Données capturées
          </span>
        </div>
        <DataPoint icon={Camera} label="Profil GitHub enregistré" delay={1.1} />
        <DataPoint
          icon={Database}
          label="Tentative logguée en DB"
          delay={1.2}
        />
        <DataPoint icon={Wifi} label="Adresse IP capturée" delay={1.3} />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3">
        <div className="flex items-center gap-2 text-red-400 mb-3">
          <AlertTriangle className="w-4 h-4" />
          <span className="font-mono text-xs uppercase tracking-wider">
            Actions en cours
          </span>
        </div>
        <DataPoint icon={MapPin} label="Géolocalisation active" delay={1.4} />
        <DataPoint icon={Clock} label="Rate limiting appliqué" delay={1.5} />
        <DataPoint icon={Terminal} label="Admin notifié" delay={1.6} />
      </div>
    </motion.div>
  );
}
