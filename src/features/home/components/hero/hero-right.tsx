import Image from "next/image";

const HeroRight = () => {
  return (
    <div className="relative justify-self-start lg:justify-self-end mr-4">
      <div className="hero-portrait relative w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
        <Image
          src="/axel-hamilcaro-developpeur-fullstack.jpeg"
          alt="Axel Hamilcaro, développeur fullstack et builder"
          fill
          className="object-cover"
          preload
          fetchPriority="high"
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, (max-width: 1280px) 320px, 384px"
        />
      </div>

      <p
        aria-hidden="true"
        className="tampon tampon-droite absolute -top-5 -right-6"
      >
        <span className="tampon-haut">Build log</span>{" "}
        <span className="tampon-bas">N° 001</span>
      </p>
    </div>
  );
};

export default HeroRight;
