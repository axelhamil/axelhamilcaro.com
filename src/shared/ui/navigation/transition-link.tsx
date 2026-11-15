import Link from "next/link";
import type { ComponentProps } from "react";

export default function TransitionLink(props: ComponentProps<typeof Link>) {
  return <Link {...props} />;
}
