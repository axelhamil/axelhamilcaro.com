"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function NiceTryReturnLink() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-lg text-zinc-300 transition-all duration-200 font-mono text-sm group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        <span>Retour au site</span>
      </Link>
    </motion.div>
  );
}
