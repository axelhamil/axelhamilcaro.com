import { type ReactNode, ViewTransition } from "react";

export interface SharedElementProps {
  name: string;
  children: ReactNode;
}

export const projectTransitionName = (slug: string) => `projet-${slug}`;

export const articleTransitionName = (slug: string) => `article-${slug}`;

export function SharedElement({ name, children }: SharedElementProps) {
  return (
    <ViewTransition name={name} share="vt-partage" default="none">
      {children}
    </ViewTransition>
  );
}
