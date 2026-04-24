"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { CONTACT, EXTERNAL_LINKS } from "@/app/_config/site.constants";
import { MagneticWrapper } from "@/src/shared/ui/effects/magnetic-wrapper";
import { Heading1 } from "@/src/shared/ui/typography/heading1";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

export default function TreeHeader() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 sm:gap-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-2 sm:gap-3">
        <div className="relative">
          <motion.div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-accent shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/profil_pp.jpeg"
              alt="Axel Hamilcaro"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-accent shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </div>

        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Heading1
              size="lg"
              className="text-xl sm:text-2xl md:text-3xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <span className="text-accent">Axel</span> Hamilcaro
            </Heading1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Paragraph variant="secondary" className="text-xs sm:text-sm">
              Full-Stack TypeScript • Freelance
            </Paragraph>
          </motion.div>

          <motion.div
            className="mt-2 sm:mt-3 flex flex-row items-center justify-center gap-2 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MagneticWrapper strength={0.04}>
              <motion.a
                href={CONTACT.mailto}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl card-accent flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-primary hover:text-accent transition-colors duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Email
              </motion.a>
            </MagneticWrapper>

            <MagneticWrapper strength={0.04}>
              <motion.a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Appel découverte
              </motion.a>
            </MagneticWrapper>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
