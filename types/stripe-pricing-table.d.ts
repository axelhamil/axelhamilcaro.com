import type { DetailedHTMLProps, HTMLAttributes } from "react";

type StripePricingTableElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    "pricing-table-id": string;
    "publishable-key": string;
    "client-reference-id"?: string;
    "customer-email"?: string;
    "customer-session-client-secret"?: string;
  },
  HTMLElement
>;

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableElement;
    }
  }
}

declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableElement;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": StripePricingTableElement;
    }
  }
}

export {};
