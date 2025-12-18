import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import cn from "../../../lib/cn";

const linkCardVariants = cva(
  "group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 ease-out cursor-pointer border-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-secondary-background/30 border-secondary/20 hover:border-accent/40 hover:bg-secondary-background/50",
        featured:
          "bg-secondary-background/50 border-accent/30 hover:border-accent/60 hover:bg-secondary-background/70 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ILinkCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}

const LinkCard = ({
  href,
  icon,
  title,
  description,
  variant,
  className,
  ...props
}: ILinkCardProps &
  Omit<ComponentProps<"a">, "href"> &
  VariantProps<typeof linkCardVariants>) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(linkCardVariants({ variant, className }))}
      {...props}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-accent-mauve/5 via-accent-blue/5 to-accent-teal/5" />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary-background/60 border border-secondary/30 group-hover:border-accent/40 group-hover:scale-105 transition-all duration-300 shrink-0">
        <span className="text-primary group-hover:text-accent transition-colors duration-300">
          {icon}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-primary group-hover:text-primary-foreground transition-colors duration-300 truncate">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-secondary/80 truncate">
            {description}
          </p>
        )}
      </div>

      {/* Arrow indicator */}
      <div className="relative z-10 text-secondary/50 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
};

export { LinkCard, linkCardVariants };
