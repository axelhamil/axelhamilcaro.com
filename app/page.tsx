import Approach from "./_components/home/approach";
import Hero from "./_components/home/hero/hero";
import TechStack from "./_components/home/tech-stack";
import WhatIDo from "./_components/home/what-i-do";
import Footer from "./_components/shared/layouts/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <Approach />
      <TechStack />
      <Footer />
    </main>
  );
}
