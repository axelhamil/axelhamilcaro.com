"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music2,
} from "lucide-react";
import { EXTERNAL_LINKS, SOCIAL_LINKS } from "@/app/_config/site.constants";
import { ContactModal } from "@/src/features/contact/components/contact-modal";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const socialLinks = [
  {
    name: "GitHub",
    href: EXTERNAL_LINKS.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: EXTERNAL_LINKS.linkedin,
    icon: Linkedin,
  },
  {
    name: "Malt",
    href: EXTERNAL_LINKS.malt,
    icon: Briefcase,
  },
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    icon: Music2,
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
            target="_blank"
            rel="noopener noreferrer"
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

        <ContactModal>
          <motion.button
            type="button"
            aria-label="Contact"
            className="p-2.5 rounded-xl bg-primary-background border border-border text-secondary hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + socialLinks.length * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
          </motion.button>
        </ContactModal>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <TransitionLink
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-secondary hover:text-accent transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voir mon portfolio
        </TransitionLink>
      </motion.div>

      <p className="text-[10px] sm:text-xs text-muted text-center">
        &copy; {new Date().getFullYear()} Axel Hamilcaro • Touraine, France
      </p>
    </motion.footer>
  );
}
