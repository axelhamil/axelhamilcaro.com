import { getPostBySlug } from "@/src/features/blog/lib/blog";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Article de blog — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    eyebrow: "Article",
    title: post?.title ?? "Article de blog",
    subtitle:
      post?.excerpt ?? "Axel Hamilcaro — Développeur Full-Stack Freelance",
  });
}
