"use client";

import ScrollIndicator from "../../shared/effects/scroll-indicator";
import { FloatingCircle, GlowOrb } from "../../shared/effects/geometric-shapes";
import HeroLeft from "./hero-left";
import HeroMotion from "./hero-motion";
import HeroRight from "./hero-right";

const Hero = () => {
  return (
    <section
      id="hero"
      className="
        relative container mx-auto
        min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)]
        py-6 md:py-10

        flex flex-col-reverse
        gap-10

        lg:grid lg:grid-cols-[minmax(0,1fr)_auto]
        lg:gap-12 2xl:gap-20
        lg:items-center
      "
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <FloatingCircle size={250} top="10%" left="-5%" delay={0} duration={10} />
        <FloatingCircle size={180} bottom="20%" right="-3%" delay={3} duration={12} />
        <GlowOrb size={400} position={{ top: "30%", right: "10%" }} intensity="low" />
      </div>

      <HeroMotion>
        <HeroLeft />
      </HeroMotion>

      <HeroRight />

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
