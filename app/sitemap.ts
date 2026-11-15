import type { MetadataRoute } from "next";
import { getAllPosts } from "@/src/features/blog/lib/blog";
import { PROJECTS } from "./_config/projects";
import { PROFILE_IMAGE, SITE_URL } from "./_config/site.constants";

const REDESIGN_DATE = new Date("2026-11-14");
const LEGAL_NOTICE_DATE = new Date("2026-05-06");
const TERMS_OF_SALE_DATE = new Date("2026-10-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPages = PROJECTS.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: new Date(project.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogIndexDate = new Date(
    Math.max(
      REDESIGN_DATE.getTime(),
      ...blogPosts.map((post) => post.lastModified.getTime()),
    ),
  );

  return [
    {
      url: SITE_URL,
      lastModified: REDESIGN_DATE,
      changeFrequency: "weekly",
      priority: 1,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/tree`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: blogIndexDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [PROFILE_IMAGE],
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/tma`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: LEGAL_NOTICE_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cgv`,
      lastModified: TERMS_OF_SALE_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/services/developpeur-nextjs-freelance`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/developpement-saas`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/lead-tech-fractional`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/creation-application-web`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/portfolio/billetterie`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio/civitime`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portfolio/openup`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/portfolio/scormpilot`,
      lastModified: REDESIGN_DATE,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    },
    ...projectPages,
    ...blogPosts,
  ];
}
