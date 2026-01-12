"use client";

import { signOut, useSession } from "@/app/_lib/auth-client";
import { ChevronRight, LogOut, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const routeLabels: Record<string, string> = {
  admin: "Dashboard",
  forms: "Formulaires",
  templates: "Templates",
  leads: "Leads",
  new: "Nouveau",
};

function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string; isLast: boolean }[] = [];

    let currentPath = "";
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isUuid = /^[0-9a-f-]{36}$/i.test(segment);
      const label = isUuid ? "Édition" : routeLabels[segment] || segment;

      crumbs.push({
        label,
        href: currentPath,
        isLast: index === segments.length - 1,
      });
    });

    return crumbs;
  }, [pathname]);

  return (
    <nav className="flex items-center gap-1 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-[var(--admin-text-subtle)]" />
          )}
          {crumb.isLast ? (
            <span className="font-medium text-[var(--admin-text)]">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              className="text-[var(--admin-text-muted)] transition-colors hover:text-[var(--admin-text)]"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}

function SearchButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-elevated)] px-3 py-1.5 text-sm text-[var(--admin-text-muted)] transition-colors hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text)]"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Rechercher...</span>
      <kbd className="ml-2 hidden rounded bg-[var(--admin-bg)] px-1.5 py-0.5 text-xs font-medium text-[var(--admin-text-subtle)] sm:inline">
        ⌘K
      </kbd>
    </button>
  );
}

function UserMenu() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-3">
      {session?.user && (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)] ring-1 ring-[var(--admin-border)]">
            <User className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          <span className="hidden text-sm font-medium text-[var(--admin-text)] sm:inline">
            {session.user.name || session.user.email?.split("@")[0]}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-destructive)]"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Déconnexion</span>
      </button>
    </div>
  );
}

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[var(--admin-border)] bg-[var(--admin-bg)] px-6">
      <Breadcrumbs />
      <div className="flex items-center gap-4">
        <SearchButton />
        <div className="h-6 w-px bg-[var(--admin-border)]" />
        <UserMenu />
      </div>
    </header>
  );
}
