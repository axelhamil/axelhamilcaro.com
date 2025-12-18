import Footer from "./_components/footer";
import Hero from "./_components/hero";
import TechStack from "./_components/tech-stack";
import WhatIDo from "./_components/what-i-do";

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
