"use client";

import { Calendar, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heading1 } from "../ui/heading1";
import { Paragraphe } from "../ui/paragraphe";

const floatingEmojis = ["🚀", "💻", "⚡", "🔥", "✨"];

export default function TreeHeader() {
  return (
    <motion.div
      className="flex flex-col items-center gap-5 sm:gap-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="relative">
          {floatingEmojis.map((emoji, i) => (
            <motion.span
              key={i}
              className="absolute text-lg pointer-events-none select-none"
              style={{
                left: `${50 + 45 * Math.cos((i * 2 * Math.PI) / floatingEmojis.length)}%`,
                top: `${50 + 45 * Math.sin((i * 2 * Math.PI) / floatingEmojis.length)}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1, 0.8],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              {emoji}
            </motion.span>
          ))}

          <motion.div
            className="absolute -inset-3 rounded-full bg-gradient-to-r from-accent/30 via-purple-500/20 to-accent/30 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-secondary-background border-3 border-accent overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Image
              src="/profil_pp.jpeg"
              alt="Axel Hamilcaro"
              width={112}
              height={112}
              className="object-cover w-full h-full"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-accent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <motion.span
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.span>
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
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <motion.span
                className="inline-block"
                animate={{ color: ["#0a0a0a", "#ff4d00", "#0a0a0a"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                Axel
              </motion.span>{" "}
              Hamilcaro
            </Heading1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Paragraphe variant="secondary" className="mt-1 text-sm sm:text-base">
              Full-Stack TypeScript — produit, perf, et architecture lisible
            </Paragraphe>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="mailto:contact@axelhamilcaro.com"
              className="px-4 py-2.5 rounded-xl card-accent flex items-center justify-center gap-2 text-sm text-primary hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Mail className="w-4 h-4" />
              </motion.span>
              Email
            </motion.a>

            <motion.a
              href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium shadow-lg shadow-accent/25"
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 30px rgba(255, 77, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Calendar className="w-4 h-4" />
              </motion.span>
              Call (15–20 min)
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex items-center gap-2 text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.span
          className="text-xs sm:text-sm italic px-3 py-1.5 rounded-full bg-secondary-background border border-border"
          whileHover={{ scale: 1.05 }}
        >
          "Ship fast. Keep it clean." 🚀
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
