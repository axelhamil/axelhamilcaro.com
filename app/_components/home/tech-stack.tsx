import { Cpu } from "lucide-react";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";


const technologies = [
  {
    name: "TypeScript",
    icon: "TS",
    color: "from-blue-500 to-blue-600",
    glow: "group-hover:shadow-blue-500/30",
  },
  {
    name: "React",
    icon: "Re",
    color: "from-cyan-400 to-cyan-500",
    glow: "group-hover:shadow-cyan-400/30",
  },
  {
    name: "Next.js",
    icon: "Nx",
    color: "from-gray-500 to-gray-700",
    glow: "group-hover:shadow-gray-500/30",
  },
  {
    name: "Node.js",
    icon: "No",
    color: "from-green-500 to-green-600",
    glow: "group-hover:shadow-green-500/30",
  },
  {
    name: "PostgreSQL",
    icon: "Pg",
    color: "from-indigo-500 to-indigo-600",
    glow: "group-hover:shadow-indigo-500/30",
  },
  {
    name: "Tailwind",
    icon: "Tw",
    color: "from-teal-400 to-teal-500",
    glow: "group-hover:shadow-teal-400/30",
  },
];

const TechStack = () => {
  return (
    <section id="stack" className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20">

      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
          <Cpu className="w-4 h-4 text-accent-blue" />
          <span className="text-sm font-medium text-primary">Technologies</span>
        </div>
        <Heading2
          size="xl"
          className="text-2xl sm:text-3xl md:text-4xl animate-fade-in"
        >
          Stack technique
        </Heading2>
        <Paragraphe
          variant="secondary"
          className="mt-3 sm:mt-4 max-w-md mx-auto text-sm sm:text-base animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Les outils que j'utilise au quotidien pour construire des produits
          solides
        </Paragraphe>
      </div>


      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
        {technologies.map((tech, index) => (
          <div
            key={tech.name}
            className="group animate-fade-in-up"
            style={{
              animationDelay: `${(index + 1) * 80}ms`,
              animationFillMode: "both",
            }}
          >

            <div
              className={`
                relative flex flex-col items-center gap-3 sm:gap-4
                p-4 sm:p-5 md:p-6 rounded-2xl
                glass-card
                transition-all duration-500
                group-hover:scale-105 group-hover:-translate-y-2
                group-hover:shadow-xl ${tech.glow}
              `}
            >

              <div
                className={`
                  relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl
                  bg-gradient-to-br ${tech.color}
                  flex items-center justify-center
                  shadow-lg group-hover:shadow-xl
                  group-hover:scale-110 group-hover:rotate-6
                  transition-all duration-500
                `}
              >
                <span className="text-white font-bold text-sm sm:text-base font-mono">
                  {tech.icon}
                </span>
              </div>


              <span className="relative z-10 font-medium text-primary text-xs sm:text-sm text-center group-hover:text-primary-foreground transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>


      <div
        className="text-center mt-10 sm:mt-12 animate-fade-in"
        style={{ animationDelay: "600ms" }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <span className="text-xs sm:text-sm text-secondary">
            ...et bien d'autres selon les besoins du projet
          </span>
          <span className="animate-pulse">✨</span>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
