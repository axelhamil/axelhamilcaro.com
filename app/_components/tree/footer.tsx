"use client";

import {
  Briefcase,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music2,
} from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/axelhamil",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/axelhamilcaro/",
    icon: Linkedin,
  },
  {
    name: "Malt",
    href: "https://www.malt.fr/profile/axelhamilcaro",
    icon: Briefcase,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/axelhmlcr",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@axelhmlcr",
    icon: Music2,
  },
  {
    name: "Email",
    href: "mailto:contact@axelhamilcaro.com",
    icon: Mail,
  },
];

export default function TreeFooter() {
  return (
    <motion.footer
      className="w-full flex flex-col items-center gap-4 pt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={link.name}
            className="p-2.5 rounded-xl bg-primary-background border border-border text-secondary hover:text-accent hover:border-accent transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon className="w-4 h-4" />
          </motion.a>
        ))}
      </div>

      <p className="text-[10px] sm:text-xs text-muted text-center">
        &copy; {new Date().getFullYear()} Axel Hamilcaro • Paris, France
      </p>
    </motion.footer>
  );
}
