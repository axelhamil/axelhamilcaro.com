"use client";

import { motion } from "framer-motion";
import type { ILink } from "../../_config/tree-links";
import { LinkCard } from "../ui/link-card";

interface TreeLinksProps {
  links: ILink[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function TreeLinks({ links }: TreeLinksProps) {
  return (
    <motion.nav
      className="w-full flex flex-col gap-2.5 sm:gap-3"
      aria-label="Liens sociaux"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {links.map((link, index) => (
        <motion.div
          key={link.url}
          variants={item}
          whileHover={{ scale: 1.02, x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LinkCard
            href={link.url}
            icon={<link.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
            title={link.title}
            description={link.description}
            variant={link.featured ? "featured" : "default"}
          />
        </motion.div>
      ))}
    </motion.nav>
  );
}
