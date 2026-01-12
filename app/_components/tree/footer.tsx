"use client";

import { Coffee, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeFooter() {
  return (
    <motion.footer
      className="mt-2 sm:mt-4 text-center flex flex-col gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="px-4 py-2 rounded-xl bg-secondary-background/50 border border-border inline-flex items-center justify-center gap-2 mx-auto"
      >
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </motion.span>
        <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
          Disponible pour des missions orientées produit, refonte, ou scale.
        </Paragraphe>
      </motion.div>

      <Paragraphe
        variant="muted"
        size="sm"
        className="opacity-60 text-xs sm:text-sm flex items-center justify-center gap-1.5"
      >
        &copy; {new Date().getFullYear()} Axel Hamilcaro •{" "}
        <motion.span
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
        </motion.span>{" "}
        TypeScript
      </Paragraphe>
    </motion.footer>
  );
}
