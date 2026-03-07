import type { Metadata } from "next";
import dynamic from "next/dynamic";

const HomecafeShowcase = dynamic(
  () => import("./_components/homecafe-showcase"),
  { ssr: true },
);

export const metadata: Metadata = {
  title: "HomeCafe - Application de bien-être & productivité",
  description:
    "Mission freelance : conception et développement d'une app web + mobile de bien-être. 78 use cases, 526 tests, 18 domaines DDD, Clean Architecture + CQRS.",
  keywords: [
    "HomeCafe",
    "bien-être",
    "productivité",
    "application mobile",
    "Next.js",
    "Expo",
    "React Native",
    "Clean Architecture",
    "DDD",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/homecafe",
  },
  openGraph: {
    title: "HomeCafe - Application de bien-être & productivité",
    description:
      "Mission freelance : app complète de bien-être personnel. 78 use cases, 18 domaines DDD, 526 tests, Clean Architecture + CQRS.",
    url: "/portfolio/homecafe",
  },
  twitter: {
    card: "summary_large_image",
    title: "HomeCafe - Application de bien-être & productivité",
    description:
      "Mission freelance : app complète de bien-être personnel. 78 use cases, 18 domaines DDD, 526 tests, Clean Architecture + CQRS.",
  },
};

export default function HomecafePage() {
  return (
    <main className="pb-8">
      <HomecafeShowcase />
    </main>
  );
}
