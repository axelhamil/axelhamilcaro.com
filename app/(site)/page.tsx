import Approach from "@/app/_components/home/approach";
import Hero from "@/app/_components/home/hero/hero";
import TechStack from "@/app/_components/home/tech-stack";
import Testimonials from "@/app/_components/home/testimonials";
import TrustedBy from "@/app/_components/home/trusted-by";
import WhatIDo from "@/app/_components/home/what-i-do";
import Footer from "@/app/_components/shared/layouts/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Approach />
      <TechStack />
      <Testimonials />
      <TrustedBy />
      <Footer />
    </main>
  );
}
