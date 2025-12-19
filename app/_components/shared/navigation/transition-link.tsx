"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type MouseEvent, startTransition } from "react";

type TransitionLinkProps = ComponentProps<typeof Link>;

let isTransitioning = false;

const createScanLineOverlay = (): void => {
  const existingOverlay = document.querySelector(".transition-scan-overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const overlay = document.createElement("div");
  overlay.className = "transition-scan-overlay";
  overlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(overlay);

  const particles = document.createElement("div");
  particles.className = "transition-particles";
  overlay.appendChild(particles);

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 0.3}s`;
    particles.appendChild(particle);
  }

  requestAnimationFrame(() => {
    overlay.classList.add("active");
  });

  setTimeout(() => {
    overlay.classList.remove("active");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.remove();
      }
    }, 600);
  }, 300);
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isInternalPageChange = (
  currentPath: string,
  targetHref: string,
): boolean => {
  if (!targetHref) return false;
  if (targetHref.startsWith("http")) return false;
  if (targetHref.startsWith("mailto:")) return false;
  if (targetHref.startsWith("tel:")) return false;
  if (targetHref.startsWith("#")) return false;
  if (targetHref.startsWith("/#")) return false;

  const newPath = targetHref.split("#")[0] || "/";
  const normalizedCurrent = currentPath === "" ? "/" : currentPath;
  const normalizedNew = newPath === "" ? "/" : newPath;

  return normalizedCurrent !== normalizedNew;
};

const TransitionLink = ({
  href,
  children,
  onClick,
  ...props
}: TransitionLinkProps) => {
  const router = useRouter();

  const handleClick = async (
    e: MouseEvent<HTMLAnchorElement>,
  ): Promise<void> => {
    const targetHref = typeof href === "string" ? href : href?.toString() || "";
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";

    if (!isInternalPageChange(currentPath, targetHref)) {
      if (onClick) onClick(e);
      return;
    }

    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    isTransitioning = true;

    try {
      if (onClick) {
        onClick(e);
      }

      createScanLineOverlay();

      await sleep(50);

      const hasViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof (document as any).startViewTransition === "function";

      if (hasViewTransition) {
        (document as any).startViewTransition(() => {
          startTransition(() => {
            router.push(targetHref);
          });
        });
      } else {
        startTransition(() => {
          router.push(targetHref);
        });
      }

      await sleep(700);
    } finally {
      isTransitioning = false;
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
