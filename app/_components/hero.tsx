import Terminal from "./terminal";
import { Heading1 } from "./ui/heading1";
import { Heading2 } from "./ui/heading2";

const Hero = () => {
  return (
    <section className="container mx-auto h-[calc(100vh-500px)] flex flex-col md:flex-row md:justify-around items-center gap-5">
      <div className="font-mono w-full md:w-1/2 flex flex-col gap-5">
        <Heading1 size={"lg"}>&gt; Axel Hamilcaro</Heading1>
        <Heading2 size={"lg"}>Développeur Web Full-Stack Freelance</Heading2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quo
          amet incidunt sapiente, tempore quisquam,
        </p>
        <p>
          est dolore cumque suscipit corporis molestias dolores culpa quidem
          eaque dignissimos fugiat rem. Maiores, odit?
        </p>
      </div>

      <div className="w-full md:w-1/2 h-fit flex justify-center">
        <Terminal />
      </div>
    </section>
  );
};

export default Hero;
