import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import cn from "../../_lib/cn";

interface IHeading2Props {
  children: ReactNode;
}

const heading2Variants = cva("scroll-m-20 font-semibold tracking-tight ", {
  variants: {
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      highlight: "text-primary font-bold",
    },
    size: {
      xs: "text-base",
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
      xl: "text-3xl",
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

export { Heading2, heading2Variants };
