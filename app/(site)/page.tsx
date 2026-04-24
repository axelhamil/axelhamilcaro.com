import dynamic from "next/dynamic";
import Footer from "@/src/features/home/components/footer";
import Hero from "@/src/features/home/components/hero/hero";

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

const Testimonials = dynamic(
  () => import("@/src/features/home/components/testimonials"),
);

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <WhatIDo />
      <CaseStudies />
      <TechStack />
      <Testimonials />
      <Footer />
    </main>
  );
}
