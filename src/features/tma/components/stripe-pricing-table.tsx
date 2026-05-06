"use client";

import Script from "next/script";

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
        strategy="afterInteractive"
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
