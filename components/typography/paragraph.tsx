import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IParagraphProps {
  children: ReactNode;
}

const paragraphVariants = cva("leading-relaxed text-pretty", {
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

const Paragraph = ({
  children,
  variant,
  size,
  className,
  ...props
}: IParagraphProps &
  ComponentProps<"p"> &
  VariantProps<typeof paragraphVariants>) => {
  return (
    <p
      className={cn(paragraphVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </p>
  );
};

export { Paragraph };
