import Image from "next/image";
import { getFreelanceYears } from "@/app/_config/site.constants";

export function AboutHero() {
  const kpis = [
    { value: "4 ans", label: "chez Civitime, de dev à lead tech" },
    {
      value: `${getFreelanceYears()} ans`,
      label: "en freelance, 10+ projets livrés",
    },
    { value: "100%", label: "remote France" },
  ] as const;

  return (
    <section className="py-12 sm:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro, développeur web fullstack freelance"
            width={200}
            height={200}
            className="rounded-full object-cover shrink-0"
            priority
          />
          <div>
            <p className="text-accent font-medium uppercase tracking-wider text-sm mb-4">
              Développeur Web Fullstack | Next.js | React | Node
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Je conçois des produits web qui servent ton business.
            </h1>
            <p className="text-secondary text-lg leading-relaxed">
              <strong className="text-primary">
                Axel Hamilcaro, développeur web fullstack (Next.js, React,
                Node), freelance basé en Touraine, 100% remote sur la France.
              </strong>{" "}
              Formé à la Wild Code School en 2020, j'ai passé 4 ans chez
              Civitime, de développeur à lead technique, avant de me lancer en
              freelance en 2024. J'aide startups, PME et équipes produit, en
              freelance comme en interne, à livrer des applications web et des
              SaaS B2B robustes, scalables et alignés sur leurs objectifs
              métier.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center px-6 py-5 rounded-xl card-accent text-center"
            >
              <span className="text-3xl font-bold text-accent mb-1">
                {value}
              </span>
              <span className="text-sm text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
