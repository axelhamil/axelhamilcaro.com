import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

function MdxImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt ?? ""}
        width={800}
        height={500}
        sizes="(max-width: 768px) 100vw, 800px"
        className="rounded-lg border border-border"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function MdxBlockquote({
  children,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="bg-accent-light border-l-4 border-accent rounded-r-xl px-5 py-4 my-6 not-italic [&>p]:m-0"
      {...props}
    >
      {children}
    </blockquote>
  );
}

function MdxTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto my-6 border border-border rounded-xl">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  );
}

function MdxThead({ children, ...props }: ComponentPropsWithoutRef<"thead">) {
  return (
    <thead className="bg-secondary-background" {...props}>
      {children}
    </thead>
  );
}

function MdxTh({ children, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th className="text-left font-semibold px-4 py-3" {...props}>
      {children}
    </th>
  );
}

function MdxTd({ children, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td className="px-4 py-3 border-t border-border" {...props}>
      {children}
    </td>
  );
}

export function useMDXComponents(): MDXComponents {
  return {
    img: MdxImage,
    blockquote: MdxBlockquote,
    table: MdxTable,
    thead: MdxThead,
    th: MdxTh,
    td: MdxTd,
  };
}
