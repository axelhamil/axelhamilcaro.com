import CaseStudies from "@/app/_components/home/case-studies";
import ExperienceTimeline from "@/app/_components/home/experience-timeline";
import Hero from "@/app/_components/home/hero/hero";
import TechStack from "@/app/_components/home/tech-stack";
import Testimonials from "@/app/_components/home/testimonials";
import WhatIDo from "@/app/_components/home/what-i-do";
import Footer from "@/app/_components/shared/layouts/footer";

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
