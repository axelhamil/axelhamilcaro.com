import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IHeading2Props {
  children: ReactNode;
}

const heading2Variants = cva("scroll-m-20 heading-display", {
  variants: {
    variant: {
      primary: "ink-primary",
      secondary: "ink-secondary",
      highlight: "ink-primary",
    },
    size: {
      xs: "title-xs",
      sm: "title-sm",
      md: "title-md",
      lg: "title-lg",
      xl: "title-xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const Heading2 = ({
  children,
  variant,
  size,
  className,
  ...props
}: IHeading2Props &
  ComponentProps<"h2"> &
  VariantProps<typeof heading2Variants>) => {
  return (
    <h2
      className={cn(heading2Variants({ variant, size }), className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export { Heading2 };
