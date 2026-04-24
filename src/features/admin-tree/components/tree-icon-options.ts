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

export const iconOptions: Array<{
  value: string;
  label: string;
  icon: LucideIcon;
}> = [
  { value: "link", label: "Lien", icon: LinkIcon },
  { value: "calendar", label: "Calendrier", icon: Calendar },
  { value: "github", label: "GitHub", icon: Github },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "briefcase", label: "Travail", icon: Briefcase },
  { value: "globe", label: "Web", icon: Globe },
  { value: "mail", label: "Email", icon: Mail },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "tiktok", label: "TikTok", icon: Music2 },
];

export function getIconComponent(iconName: string): LucideIcon {
  const found = iconOptions.find((opt) => opt.value === iconName);
  return found?.icon || LinkIcon;
}
