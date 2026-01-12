"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BarChart3,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Link2,
  Mail,
  Package,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Formulaires", href: "/admin/forms", icon: FileText },
  { name: "Liens Tree", href: "/admin/tree", icon: Link2 },
  { name: "Templates", href: "/admin/templates", icon: Package },
  { name: "Leads", href: "/admin/leads", icon: Mail },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-bg)]">
      <div className="flex h-16 items-center gap-2 border-b border-[var(--admin-border)] px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--admin-accent)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <Link
          href="/admin"
          className="text-lg font-semibold text-[var(--admin-text)]"
        >
          Admin
        </Link>
      </div>

      <motion.nav
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 space-y-1 p-3"
      >
        {navigation.map((navItem) => {
          const isActive =
            pathname === navItem.href ||
            (navItem.href !== "/admin" && pathname.startsWith(navItem.href));

          return (
            <motion.div key={navItem.name} variants={item}>
              <Link
                href={navItem.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--admin-accent-muted)] text-[var(--admin-accent)]"
                    : "text-[var(--admin-text-muted)] hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-text)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[var(--admin-accent)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <navItem.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-[var(--admin-accent)]"
                      : "text-[var(--admin-text-subtle)] group-hover:text-[var(--admin-text)]"
                  )}
                />
                {navItem.name}
              </Link>
            </motion.div>
          );
        })}
      </motion.nav>

      <div className="border-t border-[var(--admin-border)] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-text)]"
        >
          <ExternalLink className="h-4 w-4" />
          Voir le site
        </Link>
      </div>
    </aside>
  );
}
