import Footer from "./_components/shared/layouts/footer";
import Hero from "./_components/home/hero";
import TechStack from "./_components/home/tech-stack";
import WhatIDo from "./_components/home/what-i-do";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <TechStack />
      <Footer />
    </main>
  );
}
