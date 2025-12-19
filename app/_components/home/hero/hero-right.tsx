import { Code2, Rocket, Zap } from "lucide-react";
import Image from "next/image";

const HeroRight = () => {
  return (
    <div
      className="w-full lg:w-auto flex justify-center animate-fade-in z-10"
      style={{ animationDelay: "200ms" }}
    >
      <div className="relative group">
        <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-linear-to-r from-accent-mauve via-accent-blue to-accent-teal opacity-30 blur-2xl animate-pulse-glow group-hover:opacity-50 transition-opacity duration-500" />

        <div className="absolute -inset-1 sm:-inset-2 rounded-full bg-linear-to-r from-accent-blue via-accent-teal to-accent-mauve opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300" />

        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-secondary-background/50 shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro - Développeur Full-Stack"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </div>

        <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-blue/30 shadow-lg animate-float">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-blue" />
        </div>

        <div
          className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-mauve/30 shadow-lg animate-float"
          style={{ animationDelay: "2s" }}
        >
          <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-accent-mauve" />
        </div>

        <div
          className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 p-2 sm:p-3 rounded-xl bg-secondary-background/90 border border-accent-teal/30 shadow-lg animate-float hidden sm:block"
          style={{ animationDelay: "4s" }}
        >
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent-teal" />
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
