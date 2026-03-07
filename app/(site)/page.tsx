import dynamic from "next/dynamic";
import Footer from "@/app/_components/home/footer";
import Hero from "@/app/_components/home/hero/hero";

const ExperienceTimeline = dynamic(
  () => import("@/app/_components/home/experience-timeline"),
);

const WhatIDo = dynamic(() => import("@/app/_components/home/what-i-do"));

const CaseStudies = dynamic(
  () => import("@/app/_components/home/case-studies"),
);

const TechStack = dynamic(() => import("@/app/_components/home/tech-stack"));

const Testimonials = dynamic(
  () => import("@/app/_components/home/testimonials"),
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
