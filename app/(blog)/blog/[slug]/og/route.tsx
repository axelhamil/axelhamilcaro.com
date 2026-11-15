import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/src/features/blog/lib/blog";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { renderOgImage } from "@/src/shared/seo/og-image-template";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new NextResponse("Not Found", { status: 404 });

  return renderOgImage({
    eyebrow: `Blog · ${post.category}`,
    title: post.title,
    subtitle: post.subtitle,
    stamp: { top: post.category, bottom: formatLongDate(post.date) },
    ribbon: ["Blog", ...post.tags.slice(0, 3), "axelhamilcaro.com"],
  });
}
