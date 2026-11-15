import path from "node:path";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import sharp from "sharp";

async function readImage(src: string) {
  const image = sharp(path.join(process.cwd(), "public", src));
  const [{ width, height }, { channels }] = await Promise.all([
    image.metadata(),
    image.stats(),
  ]);

  if (!width || !height) {
    throw new Error(`Dimensions illisibles pour l'image ${src}`);
  }

  const means = channels.slice(0, 3).map((channel) => channel.mean);
  const isLightMonochrome =
    Math.max(...means) - Math.min(...means) < 1 && Math.min(...means) > 200;

  return { width, height, isLightMonochrome };
}

async function MdxImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
  if (!src || typeof src !== "string") return null;

  const { width, height, isLightMonochrome } = await readImage(src);

  return (
    <figure
      className={
        isLightMonochrome ? "figure-article figure-document" : "figure-article"
      }
    >
      <span className="figure-cadre">
        <Image
          src={src}
          alt={alt ?? ""}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 680px"
        />
      </span>
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

function MdxLink({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (typeof href === "string" && href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target="_blank"
      rel={isExternal ? "noopener noreferrer" : "noopener"}
      {...props}
    >
      {children}
    </a>
  );
}

function MdxTable({ children, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <section
      className="tableau-article"
      aria-label="Tableau défilant"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: région défilante, le clavier doit pouvoir la faire défiler (WCAG 2.1.1)
      tabIndex={0}
    >
      <table {...props}>{children}</table>
      <span className="tableau-indice" aria-hidden="true" />
    </section>
  );
}

export function useMDXComponents(): MDXComponents {
  return {
    a: MdxLink,
    img: MdxImage,
    table: MdxTable,
  };
}
