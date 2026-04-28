import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const linkCardVariants = cva(
  "group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-300 ease-out cursor-pointer border active:scale-[0.98] w-full text-left",
  {
    variants: {
      variant: {
        default:
          "bg-primary-background border-border hover:border-accent hover:shadow-md",
        featured:
          "bg-accent/5 border-accent/40 hover:border-accent shadow-md hover:shadow-lg ring-1 ring-accent/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function LinkCardContent({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
}) {
  return (
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
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </>
  );
}

interface ILinkCardCommonProps {
  icon: ReactNode;
  title: string;
  description?: string;
}

interface ILinkCardLinkProps extends ILinkCardCommonProps {
  href: string;
  asButton?: false;
}

interface ILinkCardButtonProps extends ILinkCardCommonProps {
  asButton: true;
  href?: undefined;
}

type LinkCardProps = (ILinkCardLinkProps | ILinkCardButtonProps) &
  VariantProps<typeof linkCardVariants> & {
    className?: string;
  };

type ButtonExtraProps = Omit<
  ComponentProps<"button">,
  keyof ILinkCardButtonProps | "className" | "ref"
>;
type AnchorExtraProps = Omit<
  ComponentProps<"a">,
  keyof ILinkCardLinkProps | "className" | "ref"
>;

const LinkCard = forwardRef<HTMLElement, LinkCardProps & (ButtonExtraProps | AnchorExtraProps)>(
  function LinkCard(props, ref) {
    const classes = cn(
      linkCardVariants({ variant: props.variant, className: props.className }),
    );
    const inner = (
      <LinkCardContent
        icon={props.icon}
        title={props.title}
        description={props.description}
      />
    );

    if (props.asButton) {
      const { icon, title, description, variant, className, asButton, ...rest } =
        props;
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={classes}
          {...(rest as ButtonExtraProps)}
        >
          {inner}
        </button>
      );
    }

    const { icon, title, description, variant, className, href, ...rest } =
      props;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as AnchorExtraProps)}
        >
          {inner}
        </a>
      );
    }

    return (
      <TransitionLink href={href} className={classes}>
        {inner}
      </TransitionLink>
    );
  },
);

export { LinkCard };
