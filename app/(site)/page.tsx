import dynamic from "next/dynamic";
import ExperienceTimeline from "@/app/_components/home/experience-timeline";
import Footer from "@/app/_components/home/footer";
import Hero from "@/app/_components/home/hero/hero";
import WhatIDo from "@/app/_components/home/what-i-do";

const CaseStudies = dynamic(
  () => import("@/app/_components/home/case-studies"),
  { ssr: true },
);

const TechStack = dynamic(() => import("@/app/_components/home/tech-stack"), {
  ssr: true,
});

const Testimonials = dynamic(
  () => import("@/app/_components/home/testimonials"),
  { ssr: true },
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
