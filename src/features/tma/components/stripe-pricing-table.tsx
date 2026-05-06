"use client";

import Script from "next/script";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
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

interface StripePricingTableProps {
  pricingTableId: string;
  publishableKey: string;
  clientReferenceId?: string;
  customerEmail?: string;
}

export function StripePricingTable({
  pricingTableId,
  publishableKey,
  clientReferenceId,
  customerEmail,
}: StripePricingTableProps) {
  return (
    <>
      <Script
        src="https://js.stripe.com/v3/pricing-table.js"
        strategy="lazyOnload"
      />
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        client-reference-id={clientReferenceId}
        customer-email={customerEmail}
      />
    </>
  );
}
