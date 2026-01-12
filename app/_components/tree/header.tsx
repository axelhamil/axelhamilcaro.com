import { Calendar, Mail } from "lucide-react";
import Image from "next/image";
import { Heading1 } from "../ui/heading1";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeHeader() {
  return (
    <div className="flex flex-col items-center gap-5 sm:gap-7">
      <div className="flex flex-col items-center gap-3 sm:gap-4">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary-background border-2 border-primary overflow-hidden group-hover:scale-105 transition-transform duration-300">
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
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Axel Hamilcaro
          </Heading1>

          <Paragraphe variant="secondary" className="mt-1 text-sm sm:text-base">
            Full-Stack TypeScript — produit, perf, et architecture lisible
          </Paragraphe>

          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 w-full">
            <a
              href="mailto:contact@axelhamilcaro.com"
              className="px-4 py-2 rounded-xl card-accent flex items-center justify-center gap-2 text-sm text-primary hover:text-accent transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <a
              href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              Call (15–20 min)
            </a>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-secondary">
        <span className="text-xs sm:text-sm italic">
          "Ship fast. Keep it clean."
        </span>
      </div>
    </div>
  );
}
