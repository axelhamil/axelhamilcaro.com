import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IParagraphProps {
  children: ReactNode;
}

const paragraphVariants = cva("para", {
  variants: {
    variant: {
      primary: "ink-primary",
      secondary: "ink-secondary",
      muted: "ink-muted",
      highlight: "ink-strong",
    },
    size: {
      sm: "para-sm",
      md: "para-md",
      lg: "para-lg",
      xl: "para-xl",
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
