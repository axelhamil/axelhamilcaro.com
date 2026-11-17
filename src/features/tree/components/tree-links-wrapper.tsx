"use client";

import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Link as LinkIcon,
  type LucideIcon,
  Mail,
  Music2,
} from "lucide-react";
import { useEffect } from "react";
import type { TreeLink } from "@/drizzle/schema";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { RedditLogo } from "@/src/shared/ui/icons/reddit-logo";
import { XLogo } from "@/src/shared/ui/icons/x-logo";
import { LinkCard } from "@/src/shared/ui/portfolio/link-card";

const iconMap: Record<string, LucideIcon> = {
  link: LinkIcon,
  calendar: Calendar,
  github: Github,
  linkedin: Linkedin,
  x: XLogo,
  reddit: RedditLogo,
  briefcase: Briefcase,
  globe: Globe,
  mail: Mail,
  instagram: Instagram,
  tiktok: Music2,
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
    <section aria-labelledby="tree-liens" className="flex flex-col gap-4">
      <h2 id="tree-liens" className="surtitre">
        Mes liens
      </h2>
      <nav aria-label="Liens sociaux">
        <ul className="tree-pile flex flex-col gap-4 pr-2 pb-2">
          {links.map((link) => {
            const IconComponent = iconMap[link.icon] || LinkIcon;
            const icon = <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />;
            const description = link.description || undefined;
            const variant = link.featured ? "featured" : "default";

            return (
              <li key={link.id} onClickCapture={() => handleClick(link)}>
                {link.url.startsWith("mailto:") ? (
                  <ContactModal>
                    <LinkCard
                      asButton
                      icon={icon}
                      title={link.title}
                      description={description}
                      variant={variant}
                    />
                  </ContactModal>
                ) : (
                  <LinkCard
                    href={link.url}
                    icon={icon}
                    title={link.title}
                    description={description}
                    variant={variant}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </section>
  );
}
