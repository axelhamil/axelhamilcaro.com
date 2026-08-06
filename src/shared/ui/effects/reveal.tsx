import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function RevealContainer(props: ComponentProps<"div">) {
  return <div {...props} />;
}

type RevealDirection = "up" | "left" | "right" | "scale";

interface RevealItemProps extends ComponentProps<"div"> {
  direction?: RevealDirection;
}

const directionClassName: Record<RevealDirection, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function RevealItem({
  direction = "up",
  className,
  ...props
}: RevealItemProps) {
  return (
    <div className={cn(directionClassName[direction], className)} {...props} />
  );
}
