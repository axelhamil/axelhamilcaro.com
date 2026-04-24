import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IHeading1Props {
  children: ReactNode;
}

const heading1Variants = cva("scroll-m-20 font-bold tracking-tight", {
  variants: {
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      highlight: "text-primary font-extrabold",
    },
    size: {
      sm: "text-xl",
      md: "text-3xl",
      lg: "text-2xl sm:text-3xl lg:text-4xl",
      xl: "text-3xl sm:text-4xl lg:text-5xl",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const Heading1 = ({
  children,
  variant,
  size,
  className,
  ...props
}: IHeading1Props &
  ComponentProps<"h1"> &
  VariantProps<typeof heading1Variants>) => {
  return (
    <h1
      className={cn(heading1Variants({ variant, size, className }))}
      {...props}
    >
      {children}
    </h1>
  );
};

export { Heading1, heading1Variants };
