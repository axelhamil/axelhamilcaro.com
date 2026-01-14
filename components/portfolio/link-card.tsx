import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import TransitionLink from "@/components/shared/navigation/transition-link";
import { cn } from "@/lib/utils";

const linkCardVariants = cva(
  "group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 ease-out cursor-pointer border active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary-background border-border hover:border-accent hover:shadow-md",
        featured:
          "bg-primary-background border-accent/30 hover:border-accent shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
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
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(linkCardVariants({ variant, className }));

  const content = (
    <>
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-accent-light" />

      <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-secondary-background border border-border group-hover:border-accent group-hover:bg-accent group-hover:scale-105 transition-all duration-300 shrink-0">
        <span className="text-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </span>
      </div>

      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-semibold text-sm sm:text-base text-primary transition-colors duration-300 truncate">
          {title}
        </h3>
        {description && (
          <p className="text-xs sm:text-sm text-secondary truncate">
            {description}
          </p>
        )}
      </div>

      <div className="relative z-10 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={classes} {...props}>
      {content}
    </TransitionLink>
  );
};

export { LinkCard };
