"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ComponentProps, type MouseEvent, startTransition } from "react";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  variant?: "default" | "soft";
};

let isTransitioning = false;

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

  const newPath = targetHref.split("#")[0] || "/";
  const normalizedCurrent = currentPath === "" ? "/" : currentPath;
  const normalizedNew = newPath === "" ? "/" : newPath;

  return normalizedCurrent !== normalizedNew;
};

const TransitionLink = ({
  href,
  children,
  onClick,
  variant = "default",
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

      type DocumentWithViewTransition = Document & {
        startViewTransition: (callback: () => void) => void;
      };

      const hasViewTransition =
        typeof document !== "undefined" &&
        "startViewTransition" in document &&
        typeof (document as DocumentWithViewTransition).startViewTransition ===
          "function";

      if (hasViewTransition) {
        (document as DocumentWithViewTransition).startViewTransition(() => {
          startTransition(() => {
            router.push(targetHref);
          });
        });
      } else {
        startTransition(() => {
          router.push(targetHref);
        });
      }

      await sleep(variant === "soft" ? 300 : 700);
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
