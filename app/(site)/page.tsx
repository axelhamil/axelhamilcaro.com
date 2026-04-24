import dynamic from "next/dynamic";
import Hero from "@/src/features/home/components/hero/hero";
import { HomeFaq } from "@/src/features/home/components/home-faq";
import Footer from "@/src/shared/layouts/footer";

const ExperienceTimeline = dynamic(
  () => import("@/src/features/home/components/experience-timeline"),
);

const WhatIDo = dynamic(
  () => import("@/src/features/home/components/what-i-do"),
);

const CaseStudies = dynamic(
  () => import("@/src/features/home/components/case-studies"),
);

const TechStack = dynamic(
  () => import("@/src/features/home/components/tech-stack"),
);

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <WhatIDo />
      <CaseStudies />
      <TechStack />
      <HomeFaq />
      <Footer />
    </main>
  );
}
