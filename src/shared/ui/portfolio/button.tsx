"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.08em] transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer rounded-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-info/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-info border-info text-info-foreground shadow-cta hover:bg-info-hover hover:border-info-hover",
        secondary:
          "bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-background",
        ghost:
          "bg-transparent border-transparent text-primary underline-offset-[0.3em] decoration-1 hover:underline",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface IButtonProps {
  children: ReactNode;
  href?: string;
  external?: boolean;
}

const Button = ({
  children,
  href,
  external = false,
  variant,
  size,
  className,
  ...props
}: IButtonProps &
  Omit<ComponentProps<"button">, "href"> &
  VariantProps<typeof buttonVariants>) => {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <TransitionLink href={href} className={classes}>
        {children}
      </TransitionLink>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export { Button };
