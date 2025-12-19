import { Coffee, Sparkles } from "lucide-react";
import Image from "next/image";
import { Heading1 } from "../ui/heading1";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeHeader() {
  return (
    <div className="flex flex-col items-center gap-6 sm:gap-8">
      <div className="flex flex-col items-center gap-3 sm:gap-4 animate-fade-in">
        <div className="relative group">
          <div className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-linear-to-r from-accent-mauve via-accent-blue to-accent-teal opacity-50 blur-md group-hover:opacity-75 group-hover:blur-lg transition-all duration-500" />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary-background border-2 border-secondary/30 overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/profil_pp.jpeg"
              alt="Axel Hamilcaro"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          <div className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-lg sm:text-xl animate-bounce">
            <span role="img" aria-label="wave">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-accent-peach" />
            </span>
          </div>
        </div>

        <div className="text-center">
          <Heading1
            size="lg"
            className="font-mono text-2xl sm:text-3xl md:text-4xl"
          >
            Axel Hamilcaro
          </Heading1>
          <Paragraphe variant="secondary" className="mt-1 text-sm sm:text-base">
            Full-Stack Developer · TypeScript
          </Paragraphe>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 mt-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/30">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-accent-teal" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-accent-teal">
              Disponible
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-2 text-secondary/70 animate-fade-in"
        style={{ animationDelay: "150ms" }}
      >
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-mauve" />
        <span className="text-xs sm:text-sm italic">
          Building products, not just features
        </span>
        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-mauve" />
      </div>
    </div>
  );
}
