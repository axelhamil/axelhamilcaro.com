import ScrollIndicator from "../../shared/effects/scroll-indicator";
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
      <HeroMotion>
        <HeroLeft />
      </HeroMotion>

      <HeroRight />

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
