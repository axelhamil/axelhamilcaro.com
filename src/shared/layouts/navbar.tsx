"use client";

import { Mail, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { DESKTOP_SECTIONS, NAV_LINKS } from "@/app/_config/navigation";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/src/shared/hooks/use-mobile-menu";
import { useScrollProgress } from "@/src/shared/hooks/use-scroll-progress";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { ThemeToggle } from "@/src/shared/ui/theme/theme-toggle";

const Navbar = () => {
  const pathname = usePathname();
  const mobileMenu = useMobileMenu();
  const { isScrolled, activeSection } = useScrollProgress({
    sections: DESKTOP_SECTIONS,
    pathname,
  });

  const handleNavClick = (href: string) => {
    mobileMenu.close();

    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.replace("/#", "");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "site-nav fixed top-0 left-0 z-50 w-full",
        isScrolled && "nav-scrolled",
      )}
    >
      <nav
        className="container h-[var(--nav-h)] px-4 sm:px-6 md:px-10 flex items-center justify-between gap-3 sm:gap-6"
        aria-label="Navigation principale"
      >
        <TransitionLink
          href="/"
          className="brand"
          aria-label="axel_hamilcaro(), retour a l'accueil"
        >
          axel_hamilcaro()
        </TransitionLink>

        <div className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="nav-link py-2.5"
                data-active={active}
              >
                {link.label}
                {active && <span className="nav-trait" aria-hidden="true" />}
              </TransitionLink>
            );
          })}

          <ThemeToggle />

          <ContactModal>
            <Button type="button" size="sm">
              <Mail className="w-4 h-4" />
              Me contacter
            </Button>
          </ContactModal>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />

          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={mobileMenu.toggle}
            aria-label={mobileMenu.isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileMenu.isOpen}
            aria-controls={mobileMenu.isOpen ? "mobile-nav" : undefined}
          >
            {mobileMenu.isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      {mobileMenu.isOpen && (
        <div
          id="mobile-nav"
          className="menu-mobile trame page-marges xl:hidden fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto py-8 flex flex-col gap-10"
        >
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "menu-mobile-link py-1",
                  isActive(link.href) && "marqueur",
                )}
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          <ContactModal>
            <Button type="button" size="lg" className="self-start">
              <Mail className="w-5 h-5" />
              Me contacter
            </Button>
          </ContactModal>
        </div>
      )}

      <div className="site-nav-progress absolute -bottom-0.5 left-0 w-full" />
    </header>
  );
};

export default Navbar;
