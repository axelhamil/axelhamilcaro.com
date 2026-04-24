import type { LeadStatus } from "@/src/entities/lead/api";

export const statusConfig: Record<
  LeadStatus,
  { label: string; color: string; bg: string }
> = {
  new: { label: "Nouveau", color: "text-blue-600", bg: "bg-blue-100" },
  contacted: { label: "Contacté", color: "text-amber-600", bg: "bg-amber-100" },
  qualified: {
    label: "Qualifié",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  converted: { label: "Converti", color: "text-green-600", bg: "bg-green-100" },
};
