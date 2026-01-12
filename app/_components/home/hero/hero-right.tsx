import { Code2 } from "lucide-react";
import Image from "next/image";

const HeroRight = () => {
  return (
    <div
      className="w-full lg:w-auto flex justify-center animate-fade-in z-10"
      style={{ animationDelay: "200ms" }}
    >
      <div className="relative group">
        <div className="absolute -inset-2 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-primary shadow-xl group-hover:scale-105 transition-transform duration-500">
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro - Développeur Full-Stack"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </div>

        <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2 sm:p-3 rounded-xl bg-primary-background border-2 border-primary shadow-lg group-hover:bg-accent group-hover:border-accent transition-all duration-300">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
