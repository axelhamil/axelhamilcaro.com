import { splitBrands } from "@/src/shared/ui/typography/brands";

export interface BrandTextProps {
  text: string;
}

export function BrandText({ text }: BrandTextProps) {
  return (
    <>
      {splitBrands(text).map((segment) =>
        segment.brand ? (
          <mark
            key={segment.brand.id}
            role="presentation"
            className={`marqueur marque marque-${segment.brand.id}`}
          >
            {segment.text}
          </mark>
        ) : (
          segment.text
        ),
      )}
    </>
  );
}
