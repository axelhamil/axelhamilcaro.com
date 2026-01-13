"use client";

import type { TreeLink } from "@/app/_lib/db/schema";
import { LinkCard } from "@/components/portfolio";
import { motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Music2,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { MagneticWrapper } from "@/app/_components/shared/effects/magnetic-wrapper";

const iconMap: Record<string, LucideIcon> = {
  link: LinkIcon,
  calendar: Calendar,
  github: Github,
  linkedin: Linkedin,
  briefcase: Briefcase,
  globe: Globe,
  mail: Mail,
  instagram: Instagram,
  tiktok: Music2,
};

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

function getSessionId() {
  if (typeof window === "undefined") return null;
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  };
}

interface TreeLinksWrapperProps {
  links: TreeLink[];
}

export default function TreeLinksWrapper({ links }: TreeLinksWrapperProps) {
  useEffect(() => {
    const utm = getUtmParams();
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "pageview",
        path: "/tree",
        referrer: document.referrer,
        sessionId: getSessionId(),
        ...utm,
      }),
    }).catch(() => {});
  }, []);

  const handleClick = (link: TreeLink) => {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "click",
        linkId: link.id,
        path: "/tree",
        targetUrl: link.url,
        referrer: document.referrer,
        sessionId: getSessionId(),
      }),
    }).catch(() => {});
  };

  return (
    <motion.nav
      className="w-full flex flex-col gap-2 sm:gap-2.5"
      aria-label="Liens sociaux"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {links.map((link) => {
        const IconComponent = iconMap[link.icon] || LinkIcon;
        return (
          <MagneticWrapper key={link.id} strength={0.1}>
            <motion.div
              key={link.id}
              variants={item}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(link)}
            >
              <LinkCard
                href={link.url}
                icon={<IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />}
                title={link.title}
                description={link.description || undefined}
                variant={link.featured ? "featured" : "default"}
              />
            </motion.div>
          </MagneticWrapper>
        );
      })}
    </motion.nav>
  );
}
