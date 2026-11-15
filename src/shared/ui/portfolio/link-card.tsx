import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const linkCardVariants = cva("group link-card", {
  variants: {
    variant: {
      default: "",
      featured: "link-card-featured",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

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
      <span className="link-card-icon">{icon}</span>

      <span className="flex-1 min-w-0">
        <span className="link-card-title truncate">{title}</span>
        {description && (
          <span className="link-card-desc truncate">{description}</span>
        )}
      </span>

      <svg
        className="link-card-arrow w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path strokeLinecap="square" d="M9 5l7 7-7 7" />
      </svg>
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

const LinkCard = forwardRef<
  HTMLElement,
  LinkCardProps & (ButtonExtraProps | AnchorExtraProps)
>(function LinkCard(props, ref) {
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
    // biome-ignore lint/correctness/noUnusedVariables: strip consumed props before rest spread
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

  // biome-ignore lint/correctness/noUnusedVariables: strip consumed props before rest spread
  const { icon, title, description, variant, className, href, ...rest } = props;
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
});

export { LinkCard };
