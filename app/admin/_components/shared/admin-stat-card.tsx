"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUp, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type StatCardColor =
  | "blue"
  | "green"
  | "purple"
  | "amber"
  | "red"
  | "cyan"
  | "pink";

const colorMap: Record<StatCardColor, { text: string; bg: string }> = {
  blue: { text: "text-blue-500", bg: "bg-blue-500/10" },
  green: { text: "text-green-500", bg: "bg-green-500/10" },
  purple: { text: "text-purple-500", bg: "bg-purple-500/10" },
  amber: { text: "text-amber-500", bg: "bg-amber-500/10" },
  red: { text: "text-red-500", bg: "bg-red-500/10" },
  cyan: { text: "text-cyan-500", bg: "bg-cyan-500/10" },
  pink: { text: "text-pink-500", bg: "bg-pink-500/10" },
};

interface AdminStatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: StatCardColor;
  change?: number;
  suffix?: string;
  tooltip?: string;
  href?: string;
  variants?: Variants;
}

export function AdminStatCard({
  title,
  value,
  icon: Icon,
  color,
  change,
  suffix,
  tooltip,
  href,
  variants,
}: AdminStatCardProps) {
  const colors = colorMap[color];

  const content = (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <p className="text-xs text-[var(--admin-text-muted)] truncate">
            {title}
          </p>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-[var(--admin-text-subtle)] cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <p className={`text-2xl font-bold ${colors.text}`}>
            {value}
            {suffix && (
              <span className="text-sm font-normal ml-0.5">{suffix}</span>
            )}
          </p>
          {change !== undefined && change !== 0 && (
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change > 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
      <div className={`rounded-lg p-2.5 ${colors.bg}`}>
        <Icon className={`h-5 w-5 ${colors.text}`} />
      </div>
    </div>
  );

  const cardClass =
    "rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4 transition-all hover:border-[var(--admin-border-hover)] hover:shadow-sm";

  if (href) {
    return (
      <motion.div variants={variants}>
        <Link href={href} className={`${cardClass} block`}>
          {content}
        </Link>
      </motion.div>
    );
  }

  if (variants) {
    return (
      <motion.div variants={variants} className={cardClass}>
        {content}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cardClass}
    >
      {content}
    </motion.div>
  );
}
