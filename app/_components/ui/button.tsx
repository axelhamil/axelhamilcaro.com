"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import cn from "../../_lib/cn";
import TransitionLink from "../shared/navigation/transition-link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out cursor-pointer rounded-lg border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-background disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-accent/90 border-accent text-primary-background hover:bg-accent hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]",
        secondary:
          "bg-secondary-background/50 border-secondary/30 text-primary hover:border-accent/40 hover:bg-secondary-background/70 hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "bg-transparent border-transparent text-primary hover:bg-secondary-background/30 hover:border-secondary/20 active:scale-[0.98]",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-7 py-3 text-lg",
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
