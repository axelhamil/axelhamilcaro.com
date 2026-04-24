"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  CALENDLY_URL,
  DESKTOP_SECTIONS,
  NAV_LINKS,
} from "@/app/_config/navigation";
import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/src/shared/hooks/use-mobile-menu";
import { useScrollProgress } from "@/src/shared/hooks/use-scroll-progress";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { heading1Variants } from "@/src/shared/ui/typography/heading1";

const Navbar = () => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const mobileMenu = useMobileMenu();
  const { isScrolled, activeSection, scrollProgress } = useScrollProgress({
    sections: DESKTOP_SECTIONS,
    pathname,
  });

  const handleNavClick = (href: string) => {
    mobileMenu.close();

    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return activeSection === href.replace("/#", "");
    }
    return pathname === href;
  };

  const headerClassName = useMemo(
    () =>
      cn(
        "px-4 sm:px-6 md:px-10 py-3 sm:py-4 w-full",
        "fixed top-0 left-0 z-50",
        "transition-all duration-300",
        isScrolled ? "nav-clean nav-scrolled" : "bg-transparent",
      ),
    [isScrolled],
  );

  const underlineMotion = prefersReducedMotion
    ? {}
    : {
        layoutId: "nav-underline",
        transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
      };

  return (
    <motion.header
      className={headerClassName}
      animate={prefersReducedMotion ? undefined : { y: 0 }}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between"
        aria-label="Navigation principale"
      >
        <TransitionLink
          href="/"
          className="group flex items-center gap-2"
          aria-label="Accueil - Axel Hamilcaro"
        >
          <span
            className={cn(
              heading1Variants({ size: "sm" }),
              "font-mono transition-colors duration-300 group-hover:text-accent",
            )}
          >
            axel_hamilcaro()
          </span>
        </TransitionLink>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);

            return (
              <div key={link.href} className="relative">
                <TransitionLink
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg",
                    "transition-all duration-300",
                    "hover:bg-secondary-background",
                    active ? "text-accent" : "text-primary hover:text-accent",
                  )}
                >
                  {link.label}

                  {active ? (
                    <motion.span
                      {...underlineMotion}
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-accent"
                    />
                  ) : (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-accent transition-all duration-300 ease-out w-0 opacity-0" />
                  )}
                </TransitionLink>
              </div>
            );
          })}

          <TransitionLink
            href="/blog"
            className={cn(
              "ml-1 px-4 py-2 text-sm font-medium rounded-lg",
              "transition-all duration-300",
              "hover:bg-secondary-background",
              pathname.startsWith("/blog")
                ? "text-accent"
                : "text-primary hover:text-accent",
            )}
          >
            Blog
          </TransitionLink>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "ml-1 px-4 py-2 text-sm font-medium rounded-lg",
              "bg-accent text-white",
              "hover:bg-accent-hover hover:scale-[1.02]",
              "transition-all duration-300",
              "flex items-center gap-2",
            )}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">Contact</span>
          </a>
        </div>

        <button
          type="button"
          onClick={mobileMenu.toggle}
          className={cn(
            "md:hidden p-2 rounded-lg",
            "text-primary hover:text-accent",
            "hover:bg-secondary-background",
            "transition-all duration-300",
          )}
          aria-label={mobileMenu.isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenu.isOpen}
          aria-controls="mobile-nav"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={cn(
                "absolute inset-0 transition-all duration-300",
                mobileMenu.isOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 transition-all duration-300",
                mobileMenu.isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50",
              )}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenu.isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 z-40 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={mobileMenu.close}
              aria-hidden="true"
            />

            <motion.div
              key="panel"
              id="mobile-nav"
              className="md:hidden relative z-50 mt-4"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              exit={
                prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }
              }
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex flex-col gap-2 pb-4 card rounded-xl p-4">
                {NAV_LINKS.map((link, index) => {
                  const active = isActive(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 6 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                      }
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                        delay: prefersReducedMotion ? 0 : index * 0.04,
                      }}
                    >
                      <TransitionLink
                        href={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-lg",
                          "transition-all duration-300",
                          "hover:bg-secondary-background",
                          active
                            ? "text-accent bg-accent-light"
                            : "text-primary hover:text-accent",
                        )}
                      >
                        {link.label}
                      </TransitionLink>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: prefersReducedMotion ? 0 : NAV_LINKS.length * 0.04,
                  }}
                >
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-2 px-4 py-3 text-base font-medium rounded-lg",
                      "bg-accent text-white",
                      "hover:bg-accent-hover",
                      "transition-all duration-300",
                      "flex items-center justify-center gap-2",
                    )}
                  >
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                  </a>
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: prefersReducedMotion
                      ? 0
                      : (NAV_LINKS.length + 1) * 0.04,
                  }}
                >
                  <TransitionLink
                    href="/blog"
                    onClick={mobileMenu.close}
                    className={cn(
                      "px-4 py-3 text-base font-medium rounded-lg",
                      "transition-all duration-300",
                      "hover:bg-secondary-background",
                      pathname.startsWith("/blog")
                        ? "text-accent bg-accent-light"
                        : "text-primary hover:text-accent",
                    )}
                  >
                    Blog
                  </TransitionLink>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-border">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${scrollProgress}%` }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.18, ease: "easeOut" }
          }
        />
      </div>
    </motion.header>
  );
};

export default Navbar;
