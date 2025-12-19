import Approach from "./_components/home/approach";
import Hero from "./_components/home/hero/hero";
import TechStack from "./_components/home/tech-stack";
import Testimonials from "./_components/home/testimonials";
import TrustedBy from "./_components/home/trusted-by";
import WhatIDo from "./_components/home/what-i-do";
import Footer from "./_components/shared/layouts/footer";

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
