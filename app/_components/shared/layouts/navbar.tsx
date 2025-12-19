"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import cn from "../../../_lib/cn";
import { heading1Variants } from "../../ui/heading1";
import TransitionLink from "../navigation/transition-link";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approche" },
  { href: "/#stack", label: "Stack" },
  { href: "/tree", label: "Liens" },
];

const DESKTOP_SECTIONS = ["services", "approach", "stack"] as const;

const Navbar = () => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      let currentSection = "";
      for (const section of DESKTOP_SECTIONS) {
        const el = document.getElementById(section);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) currentSection = section;
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  // Bonus UX : lock scroll derrière le menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

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
        "transition-all duration-500",
        isScrolled
          ? "glass-nav border-b border-secondary/20"
          : "bg-transparent",
      ),
    [isScrolled],
  );

  const underlineMotion = prefersReducedMotion
    ? {}
    : {
        layoutId: "nav-underline",
        transition: { duration: 0.25, ease: "easeOut" },
      };

  return (
    <motion.header
      className={headerClassName}
      // micro polish : un léger “settle” quand l’état scrolled change
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

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <div key={link.href} className="relative">
                <TransitionLink
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg",
                    "transition-all duration-300",
                    "hover:bg-secondary-background/50",
                    active ? "text-accent" : "text-primary hover:text-accent",
                  )}
                >
                  {link.label}

                  {/* underline premium : motion shared layout */}
                  {active ? (
                    <motion.span
                      {...underlineMotion}
                      className={cn(
                        "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full",
                        "bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal",
                        "w-6 opacity-100",
                      )}
                    />
                  ) : (
                    <span
                      className={cn(
                        "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full",
                        "bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal",
                        "transition-all duration-300 ease-out w-0 opacity-0",
                      )}
                    />
                  )}
                </TransitionLink>
              </div>
            );
          })}

          <a
            href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "ml-3 px-4 py-2 text-sm font-medium rounded-lg",
              "bg-accent text-primary-background",
              "hover:scale-105 hover:shadow-lg hover:shadow-accent/25",
              "transition-all duration-300",
              "flex items-center gap-2",
              "shimmer",
            )}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">Contact</span>
          </a>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className={cn(
            "md:hidden p-2 rounded-lg",
            "text-primary hover:text-accent",
            "hover:bg-secondary-background/50",
            "transition-all duration-300",
          )}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <div className="relative w-6 h-6">
            <Menu
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50",
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu + backdrop (AnimatePresence) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="md:hidden fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
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
              <div className="flex flex-col gap-2 pb-4 glass-card rounded-xl p-4">
                {navLinks.map((link, index) => {
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
                          "hover:bg-secondary-background/50",
                          active
                            ? "text-accent bg-accent/10"
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
                    delay: prefersReducedMotion ? 0 : navLinks.length * 0.04,
                  }}
                >
                  <a
                    href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-2 px-4 py-3 text-base font-medium rounded-lg",
                      "bg-accent text-primary-background",
                      "hover:bg-accent/90",
                      "transition-all duration-300",
                      "flex items-center justify-center gap-2",
                    )}
                  >
                    <Calendar className="w-5 h-5" />
                    Prendre rendez-vous
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll progress : motion width (plus fluide) */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/10">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal"
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
