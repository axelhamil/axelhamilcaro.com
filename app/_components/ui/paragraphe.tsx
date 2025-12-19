import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import cn from "../../_lib/cn";

interface IParagrapheProps {
  children: ReactNode;
}

const paragrapheVariants = cva("leading-relaxed text-pretty", {
  variants: {
    variant: {
      primary: "text-primary/90",
      secondary: "text-secondary/80",
      muted: "text-primary/60",
      highlight: "text-primary font-medium",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const Paragraphe = ({
  children,
  variant,
  size,
  className,
  ...props
}: IParagrapheProps &
  ComponentProps<"p"> &
  VariantProps<typeof paragrapheVariants>) => {
  return (
    <p
      className={cn(paragrapheVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </p>
  );
};

export { Paragraphe };
