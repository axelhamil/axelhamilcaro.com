import type { MetadataRoute } from "next";
import { getAllPosts } from "@/src/features/blog/lib/blog";
import { PROFILE_IMAGE, SITE_URL } from "./_config/site.constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const latestPostDate = new Date(
    Math.max(...blogPosts.map((post) => post.lastModified.getTime())),
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-10-05"),
      changeFrequency: "weekly",
      priority: 1,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/tree`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date("2026-10-05"),
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/tma`,
      lastModified: new Date("2026-09-16"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cgv`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/developpement-saas`,
      lastModified: new Date("2026-08-20"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/lead-tech-fractional`,
      lastModified: new Date("2026-06-19"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/creation-application-web`,
      lastModified: new Date("2026-10-05"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio/billetterie`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio/civitime`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio/openup`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/portfolio/scormpilot`,
      lastModified: new Date("2026-08-29"),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    ...blogPosts,
  ];
}
