import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "pricing-table-id": string;
          "publishable-key": string;
          "client-reference-id"?: string;
          "customer-email"?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "pricing-table-id": string;
          "publishable-key": string;
          "client-reference-id"?: string;
          "customer-email"?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};
