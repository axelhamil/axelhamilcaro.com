"use client";

import { Code2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroRight = () => {
  return (
    <motion.div
      className="w-full lg:w-auto flex justify-center z-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="relative group">
        <motion.div
          className="absolute -inset-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 blur-xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary shadow-xl"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro - Développeur Full-Stack"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 p-2.5 sm:p-3 rounded-xl bg-accent shadow-lg"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.15, rotate: 10 }}
        >
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroRight;
