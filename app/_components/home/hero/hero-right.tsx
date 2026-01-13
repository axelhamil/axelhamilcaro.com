"use client";

import { Code2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroRight = () => {
  return (
    <motion.div
      className="w-full lg:w-auto flex justify-center z-10 p-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="relative">
        <motion.div
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary shadow-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro - Développeur Full-Stack"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </motion.div>

        <motion.div
          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-2 sm:p-2.5 rounded-xl bg-accent shadow-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1 }}
        >
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroRight;
