import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      "on-accent": "btn-on-accent",
      ghost: "btn-ghost",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      icon: "btn-icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

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
