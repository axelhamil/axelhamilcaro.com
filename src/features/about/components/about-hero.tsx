import Image from "next/image";

const kpis = [
  { value: "5 ans", label: "de freelance" },
  { value: "10+", label: "projets livrés en autonomie" },
  { value: "100%", label: "remote France" },
] as const;

export function AboutHero() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
          <Image
            src="/profil_pp.jpeg"
            alt="Axel Hamilcaro, développeur full-stack freelance"
            width={200}
            height={200}
            className="rounded-full object-cover shrink-0"
            priority
          />
          <div>
            <p className="text-accent font-medium uppercase tracking-wider text-sm mb-4">
              Développeur Full-Stack Freelance
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Je conçois des produits web qui servent ton business.
            </h1>
            <p className="text-secondary text-lg leading-relaxed">
              Depuis 2021, j'aide startups, PME et équipes produit à livrer des
              applications web et SaaS robustes, scalables, et alignées sur
              leurs objectifs métier.
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
