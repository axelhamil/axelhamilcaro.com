"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar } from "lucide-react";
import cn from "../../lib/cn";
import TransitionLink from "./transition-link";
import { heading1Variants } from "./ui/heading1";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#stack", label: "Stack" },
  { href: "/tree", label: "Liens" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Only track sections on home page
      if (pathname !== "/") {
        setActiveSection("");
        return;
      }

      // Update active section based on scroll position
      // Check sections in reverse order so later sections take priority
      const sections = ["services", "stack"];
      let currentSection = "";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Section is active if its top has scrolled past 200px from viewport top
          if (rect.top <= 200) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle navigation click
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    // If it's a hash link and we're on home page, scroll smoothly
    if (href.startsWith("/#") && pathname === "/") {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Otherwise, navigate normally (TransitionLink will handle it)
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return activeSection === href.replace("/#", "");
    }
    return pathname === href;
  };

  return (
    <header
      className={cn(
        "px-4 sm:px-6 md:px-10 py-3 sm:py-4 w-full",
        "fixed top-0 left-0 z-50",
        "transition-all duration-500",
        isScrolled
          ? "glass-nav border-b border-secondary/20"
          : "bg-transparent"
      )}
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <TransitionLink
          href="/"
          className="group flex items-center gap-2"
          aria-label="Accueil - Axel Hamilcaro"
        >
          <span
            className={cn(
              heading1Variants({ size: "sm" }),
              "font-mono transition-colors duration-300 group-hover:text-accent"
            )}
          >
            axel_hamilcaro()
          </span>
        </TransitionLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg",
                "transition-all duration-300",
                "hover:bg-secondary-background/50",
                isActive(link.href)
                  ? "text-accent"
                  : "text-primary hover:text-accent"
              )}
            >
              {link.label}
              {/* Active indicator line */}
              <span
                className={cn(
                  "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full",
                  "bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal",
                  "transition-all duration-300 ease-out",
                  isActive(link.href) ? "w-6 opacity-100" : "w-0 opacity-0"
                )}
              />
            </TransitionLink>
          ))}

          {/* CTA Button */}
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
              "shimmer"
            )}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:inline">Contact</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "md:hidden p-2 rounded-lg",
            "text-primary hover:text-accent",
            "hover:bg-secondary-background/50",
            "transition-all duration-300"
          )}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className="relative w-6 h-6">
            <Menu
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={cn(
                "absolute inset-0 transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              )}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out",
          isMobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-2 pb-4 glass-card rounded-xl p-4">
          {navLinks.map((link, index) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-lg",
                "transition-all duration-300",
                "hover:bg-secondary-background/50",
                isActive(link.href)
                  ? "text-accent bg-accent/10"
                  : "text-primary hover:text-accent"
              )}
              style={{
                animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </TransitionLink>
          ))}

          {/* Mobile CTA */}
          <a
            href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-2 px-4 py-3 text-base font-medium rounded-lg",
              "bg-accent text-primary-background",
              "hover:bg-accent/90",
              "transition-all duration-300",
              "flex items-center justify-center gap-2"
            )}
          >
            <Calendar className="w-5 h-5" />
            Prendre rendez-vous
          </a>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/10">
        <div
          className="h-full bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

export default Navbar;
