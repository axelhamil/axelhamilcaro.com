import { Calendar, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { Heading1 } from "../ui/heading1";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeHeader() {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-7">
      <div className="flex flex-col items-center gap-3 sm:gap-4">
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
        </div>

        <div className="text-center">
          <Heading1
            size="lg"
            className="font-mono text-2xl sm:text-3xl md:text-4xl"
          >
            Axel Hamilcaro
          </Heading1>

          <Paragraphe variant="secondary" className="mt-1 text-sm sm:text-base">
            Full-Stack TypeScript — produit, perf, et architecture lisible
          </Paragraphe>

          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full">
            <a
              href="mailto:contact@axelhamilcaro.com"
              className="px-4 py-2 rounded-xl glass-card border border-secondary/20 hover:border-accent/40 hover:bg-secondary-background/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm text-primary hover:text-accent"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-accent text-primary-background hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm shimmer"
            >
              <Calendar className="w-4 h-4" />
              Call (15–20 min)
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-secondary/70">
        <Sparkles className="w-3.5 h-3.5 text-accent-mauve" />
        <span className="text-xs sm:text-sm italic">
          “Ship fast. Keep it clean.”
        </span>
        <Sparkles className="w-3.5 h-3.5 text-accent-mauve" />
      </div>
    </div>
  );
}
